import React from 'react';
import { Header } from '../header';
import { Status } from '../status';
import { Ticker } from '../ticker';
import './index.scss';

export class App extends React.Component {
    render () {
		return (
			<main className="occupiedx">
				<Header />
				<Status />
				<Ticker />
			</main>
		);
	}
};