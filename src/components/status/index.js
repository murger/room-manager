import React from 'react';
import './index.scss';

export class Status extends React.Component {
    render () {
		return (
			<article>
				<div className="current">Available</div>
				<div className="remainder">47 mins</div>
			</article>
		);
	}
};