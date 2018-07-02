import React from 'react';
import { Header } from '../header';
import { Status } from '../status';
import { Ticker } from '../ticker';
import './index.scss';

export class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
        	occupied: true,
            current: {
            	title: 'HR & Technical Interview',
	            contact: 'John Everton Doe'
	        }
        };
    }

    render () {
    	let isOccupied = this.state.occupied,
    		current = this.state.current;

		return (
			<main className={(isOccupied ? 'occupied' : '')}>
				<Header contact={(isOccupied) ? current.contact : null} />
				<Status event={(isOccupied) ? current.title : null} />
				<Ticker hours={[...Array(11).keys()].map((x) =>
					(x + 9 > 12) ? x - 3 : x + 9
				)} />
			</main>
		);
	}
};