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
            current: null
        };
    }

    componentWillMount () {
    	let services = this.props.services,
    		room = this.props.room,
            delay = this.props.refresh,
            setCurrentEvent = () => {
                services.schedule.getCurrentEvent(room).then((event) => {
                    this.setState({ current: event });
                });
            }

        // Fetch schedule
        services.schedule.getEvents(room).then((schedule) => {
            this.setState({ schedule: schedule });
            setCurrentEvent();
        });

        // Refresh at an interval
        this.interval = setInterval(() => setCurrentEvent(), delay);
	}

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    render () {
    	let schedule = this.state.schedule,
    		current = this.state.current;

		return (!schedule) ? null : (
			<main className={(current ? 'busy' : '')}>
				<Header current={current} />
				<Status current={current} room={this.props.room} />
				<Ticker schedule={schedule} />
			</main>
		);
	}
};

export default injectServices(App);