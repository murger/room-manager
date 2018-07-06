import React from 'react';
import Header from '../header';
import Status from '../status';
import Ticker from '../ticker';
import injectServices from '../../services/inject';
import './index.scss';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
        	schedule: null,
            current: null,
            next: null,
            isBooking: false
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
        this.interval = setInterval(() => getCurrentEvent(), this.props.refresh);
	}

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    setBooking (state) {
        this.setState({ isBooking: state });
    }

    render () {
    	let room = this.props.room,
            schedule = this.state.schedule,
    		current = this.state.current,
            next = this.state.next,
            isBooking = this.state.isBooking;

		return (!schedule) ? null : (
			<main className={(current ? 'busy' : '')}>
				<Header
                    room={room}
                    current={current}
                    isBooking={isBooking}
                    setBooking={this.setBooking.bind(this)} />
				<Status
                    next={next}
                    current={current}
                    isBooking={isBooking}
                    setBooking={this.setBooking.bind(this)} />
				<Ticker schedule={schedule} />
			</main>
		);
	}
};

export default injectServices(App);