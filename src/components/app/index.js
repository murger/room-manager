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
        	schedule: null,
            current: null,
            next: null,
            isBooking: false,
            isPosting: false
        };
    }

    componentWillMount () {
    	let room = this.props.room,
            schedule = this.props.services.schedule,
            getCurrentEvent = () => {
                schedule.getCurrentEvent(room).then((event) => {
                    this.setState({
                        current: event,
                        isBooking: (event) ? false : this.state.isBooking
                    });
                });
            },
            getNextEvent = () => {
                schedule.getNextEvent(room).then((event) => {
                    this.setState({ next: event });
                });
            };

        // Fetch schedule
        schedule.getEvents(room).then((schedule) => {
            this.setState({ schedule: schedule });
            getCurrentEvent();
            getNextEvent();
        });

        // Refresh at an interval
        this.interval = setInterval(() =>
            getCurrentEvent(), this.props.refresh);
	}

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    setBooking (state) {
        this.setState({ isBooking: state });

        if (state) {
            this.timeout = setTimeout(() =>
                this.setState({ isBooking: false }), this.props.timeout);
        } else if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    setPosting (state) {
        this.setState({ isPosting: state });
    }

    sendRequest (mins) {
        let room = this.props.room,
            schedule = this.props.services.schedule;

        this.setPosting(true);

        schedule.sendBookingRequest(room, mins).then((success) => {
            schedule.getEvents(room).then((schedule) => {
                this.setState({ schedule: schedule });
            });

            this.setPosting(false);
        });
    }

    render () {
    	let room = this.props.room,
            schedule = this.state.schedule,
    		current = this.state.current,
            next = this.state.next,
            isBooking = this.state.isBooking,
            isPosting = this.state.isPosting;

		return (!schedule) ? null : (
			<main className={(current ? 'busy' : '')}>
				<Header
                    room={room}
                    current={current}
                    isBooking={isBooking}
                    isPosting={isPosting}
                    setBooking={this.setBooking.bind(this)} />
				<Status
                    next={next}
                    current={current}
                    isBooking={isBooking}
                    isPosting={isPosting}
                    setBooking={this.setBooking.bind(this)}
                    sendRequest={this.sendRequest.bind(this)} />
				<Timeline schedule={schedule} />
			</main>
		);
	}
};

export default injectServices(App);