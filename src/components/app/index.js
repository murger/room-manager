import React from 'react';
import { Header } from '../header';
import { Status } from '../status';
import { Ticker } from '../ticker';
import './index.scss';

export class App extends React.Component {
    constructor (props) {
        super(props);

        console.log(process.env.NODE_ENV);

        this.state = {
            current: {
            	title: 'HR & Technical Interview',
	            contact: 'John Everton Doe',
	            start: '2018-07-03T10:00:00.000Z',
	            end: '2018-07-03T13:00:00.000Z'
	        }
        };
    }

    render () {
    	let current = null && this.state.current;

		return (
			<main className={(current ? 'busy' : '')}>
				<Header current={current} />
				<Status current={current} until="2018-07-03T12:00:00.000Z" />
				<Ticker range={[...Array(11).keys()].map((x) =>
					(x + 9 > 12) ? x - 3 : x + 9
				)} />
			</main>
		);
	}
};