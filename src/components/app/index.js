import React from 'react';
import Header from '../header';
import Status from '../status';
import Timeline from '../timeline';
import injectServices from '../../services/inject';
import './index.scss';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
        	events: null,
            current: null,
            next: null,
            isOptsVisible: false,
            isLoading: true
        };
    }

    componentWillUnmount () {
        clearInterval(this.timer);
    }

    componentDidMount () {
        this.getSchedule(() => this.setLoading(false));
        this.timer = setInterval(() => this.getSchedule(), this.props.refresh);
	}

    getSchedule (callback) {
        let id = this.props.id,
            schedule = this.props.services.schedule;

        schedule.getToday(id).then((events) => {
            let current = schedule.getCurrentEvent();

            this.setState({
                events: events,
                current: current,
                next: schedule.getNextEvent(),
                isOptsVisible: (current) ? false : this.state.isOptsVisible
            });

            if (callback && callback instanceof Function) {
                callback();
            }
        }).catch(err => console.log(err));
    }

    showOptions (state) {
        this.setState({ isOptsVisible: state });

        // Hide options on a timeout
        if (state === true) {
            this.timeout = setTimeout(() =>
                this.setState({ isOptsVisible: false }), this.props.timeout);
        } else if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    setLoading (state) {
        this.setState({ isLoading: state });
    }

    sendBookingRequest (mins) {
        let id = this.props.id,
            schedule = this.props.services.schedule;

        this.setLoading(true);

        schedule.sendBookingRequest(id, mins).then((data) => {
            // Set as current
            (data) && this.setState({
                current: schedule.setCurrentEvent(data)
            });

            this.showOptions(false);
            this.setLoading(false);
        }).catch(err => console.log(err));
    }

    render () {
    	return (!this.state.events) ? null : (
			<main className={(this.state.current ? 'busy' : '')}>
				<Header
                    current={this.state.current}
                    title={this.props.title}
                    isOptsVisible={this.state.isOptsVisible}
                    isLoading={this.state.isLoading}
                    showOptions={this.showOptions.bind(this)} />
				<Status
                    next={this.state.next}
                    current={this.state.current}
                    title={this.props.title}
                    isOptsVisible={this.state.isOptsVisible}
                    isLoading={this.state.isLoading}
                    sendBookingRequest={this.sendBookingRequest.bind(this)} />
				<Timeline events={this.state.events} />
			</main>
		);
	}
};

export default injectServices(App);