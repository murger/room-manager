import React from 'react';
import './index.scss';

export class Main extends React.Component {
    render () {
		return (
			<main>
				<div className="current">HR & Technical Interview</div>
				<div className="remainder">47 mins</div>
			</main>
		);
	}
};