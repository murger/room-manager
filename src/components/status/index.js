import React from 'react';
import injectServices from '../../services/inject';
import './index.scss';

class Status extends React.Component {
	calcRemainder () {
		let current = this.props.current,
			next = this.props.next;

		return (current)
			? current.remainder
			: (next) ? next.until : -1;
	}

	renderRemainder () {
		let rem = this.calcRemainder(),
			showHrs = (rem > 120),
			total = (showHrs) ? Math.round(rem / 60) : rem,
			label = (showHrs) ? 'hr' : 'min';

		return (rem < 0)
			? null
			: [total, label + (total > 1 ? 's' : '')].join(' ');
	}

	renderBooking () {
		let rem = this.calcRemainder();

		return (
			<article>
				<ul className="options">
				{[15, 30, 60].map((dur, i) =>
					<li key={i}
						className={(!rem || rem <= dur) ? 'is-disabled' : ''}>
						{ dur }
						<span>mins</span>
					</li>
				)}
				</ul>
			</article>
		);
	}

	render () {
		let current = this.props.current,
			isBooking = this.props.isBooking;

		return (isBooking)
			? this.renderBooking()
			: <article>
				<h1 className="current">
					{ (current) ? (current.title || 'Occupied') : 'Available' }
				</h1>
				<time className="remainder">
					{ this.renderRemainder() }
				</time>
			</article>;
	}
};

export default injectServices(Status);