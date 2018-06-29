import React from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { Ticker } from '../ticker';
import './index.scss';

export class App extends React.Component {
    render () {
		return (
			<section>
				<Header />
				<Main />
				<Ticker />
			</section>
		);
	}
};