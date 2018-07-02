import React from 'react';
import { Header } from '../header';
import { Status } from '../status';
import { Ticker } from '../ticker';
import './index.scss';

export class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            occupied: null
        };
    }

    render () {
		return (
			<main className="occupiedx">
				<Header />
				<Status />
				<Ticker hours={[...Array(11).keys()].map((x) =>
					(x + 9 > 12) ? x - 3 : x + 9
				)} />
			</main>
		);
	}
};