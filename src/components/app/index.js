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
        	events: [],
            current: null,
            next: null,
            isOptsVisible: false,
            isLoading: true,
            hasError: false,
            hasConnection: true
        };
    }

    componentWillUnmount () {
        clearInterval(this.timer);
    }

    componentDidMount () {
        this.getSchedule(() => this.setState({ isLoading: false }));
        this.timer = setInterval(() => this.getSchedule(), this.props.refresh);
	}

    getSchedule (callback) {
        let id = this.props.id,
            schedule = this.props.services.schedule,
            update = (connection, events) => {
                let current = schedule.getCurrentEvent(),
                    next = schedule.getNextEvent();

                this.setState({
                    next: next,
                    current: current,
                    events: (events) ? events : this.state.events,
                    isOptsVisible: (current) ? false : this.state.isOptsVisible,
                    hasConnection: connection
                });

                (callback instanceof Function) && callback();
            };

        schedule.getToday(id)
            .then((events) => update(true, events))
            .catch((err) => update(false, null));
    }

    toggleOptions (state) {
        this.setState({ isOptsVisible: state });

        // Hide options on a timeout
        if (state === true) {
            this.reset = setTimeout(() => this.setState({
                isOptsVisible: false,
                hasError: false
            }), this.props.reset);
        } else if (this.reset) {
            clearTimeout(this.reset);
            this.setState({ hasError: false });
        }
    }

    sendBookingRequest (mins) {
        let id = this.props.id,
            schedule = this.props.services.schedule;

        this.setState({ isLoading: true });

        schedule.sendBookingRequest(id, mins).then((data) => {
            if (data) {
                this.toggleOptions(false);
                this.setState({
                    isLoading: false,
                    current: schedule.setCurrentEvent(data)
                });
            } else {
                this.setState({
                    isLoading: false,
                    hasError: 'Room unavailable.'
                });
            }
        }).catch((err) => {
            this.setState({
                isLoading: false,
                hasError: 'Network unreachable.'
            });
        });
    }

    render () {
    	return (
			<main className={(this.state.current ? 'busy' : '')}>
				<Header
                    current={this.state.current}
                    title={this.props.title}
                    isOptsVisible={this.state.isOptsVisible}
                    isLoading={this.state.isLoading}
                    hasConnection={this.state.hasConnection}
                    toggleOptions={this.toggleOptions.bind(this)} />
				<Status
                    next={this.state.next}
                    current={this.state.current}
                    title={this.props.title}
                    isOptsVisible={this.state.isOptsVisible}
                    isLoading={this.state.isLoading}
                    hasError={this.state.hasError}
                    sendBookingRequest={this.sendBookingRequest.bind(this)} />
				<Timeline events={this.state.events} />
			</main>
		);
	}
};

export default injectServices(App);