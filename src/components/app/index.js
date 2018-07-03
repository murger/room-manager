import React from 'react';
import { Header } from '../header';
import Status from '../status';
import { Ticker } from '../ticker';
import injectServices from '../../services/inject';
import './index.scss';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
        	schedule: null,
            current: null,
            time: Date.now()
        };
    }

    componentDidMount () {
    	let services = this.props.services,
    		room = this.props.room;

        // Fetch schedule
        services.schedule.getEvents(room).then((schedule) => {
            this.setState({ schedule: schedule });

	        services.schedule.getCurrentEvent(room).then((event) => {
	            this.setState({ current: event });
	        });
        });

        // Set refresh interval
        this.interval = setInterval(() => {
            this.setState({ time: Date.now() })
        }, this.props.refresh);
	}

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
    	let schedule = this.state.schedule,
    		current = this.state.current,
            time = this.state.time;

		return (!schedule) ? null : (
			<main className={(current ? 'busy' : '')} data-time={time}>
				<Header current={current} />
				<Status current={current} room={this.props.room} />
				<Ticker schedule={schedule} />
			</main>
		);
	}
};

export default injectServices(App);