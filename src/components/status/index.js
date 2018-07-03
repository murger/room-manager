import React from 'react';
import './index.scss';

export class Status extends React.Component {
    render () {
    	let remainder = this.props.remainder || this.props.current.remainder;

		return (
			<article>
				<div className="current">
				{(this.props.current)
					? this.props.current.title
					: 'Available'
				}
				</div>
				<div className="remainder">
				{(remainder < 60)
					? [remainder, 'mins'].join(' ')
					: [Math.round(remainder / 60), 'hrs'].join(' ')
				}
				</div>
			</article>
		);
	}
};