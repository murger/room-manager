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
            isOptionsVisible: false,
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
            let current = schedule.getCurrentEvent(),
                next = schedule.getNextEvent();

            this.setState({
                events: events,
                current: current,
                next: next,
                isOptionsVisible: (current) ? false : this.state.isOptionsVisible
            });

            if (callback && callback instanceof Function) {
                callback();
            }
        });
    }

    showOptions (state) {
        this.setState({ isOptionsVisible: state });

        if (state === true) {
            this.timeout = setTimeout(() =>
                this.setState({ isOptionsVisible: false }), this.props.timeout);
        } else if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    setLoading (state) {
        this.setState({ isLoading: state });
    }

    postBooking (mins) {
        let id = this.props.id,
            schedule = this.props.services.schedule;

        this.setLoading(true);

        schedule.sendBookingRequest(id, mins).then((success) => {
            if (!success) {
                return this.setLoading(false);
            }

            this.getSchedule(() => {
                this.showOptions(false);
                this.setLoading(false);
            });
        });
    }

    render () {
    	return (!this.state.events) ? null : (
			<main className={(this.state.current ? 'busy' : '')}>
				<Header
                    title={this.props.title}
                    current={this.state.current}
                    isOptionsVisible={this.state.isOptionsVisible}
                    isLoading={this.state.isLoading}
                    showOptions={this.showOptions.bind(this)} />
				<Status
                    title={this.props.title}
                    next={this.state.next}
                    current={this.state.current}
                    isOptionsVisible={this.state.isOptionsVisible}
                    isLoading={this.state.isLoading}
                    postBooking={this.postBooking.bind(this)} />
				<Timeline events={this.state.events} />
			</main>
		);
	}
};

export default injectServices(App);