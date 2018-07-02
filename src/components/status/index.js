import React from 'react';
import './index.scss';

export class Status extends React.Component {
    render () {
		return (
			<article>
				<div className="current">{ this.props.event || 'Available' }</div>
				<div className="remainder">17 mins</div>
			</article>
		);
	}
};