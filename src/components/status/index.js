import React from 'react';
import injectServices from '../../services/inject';
import './index.scss';

class Status extends React.Component {
	sendRequest (mins) {
		this.props.sendRequest(mins);
	}

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

	renderOptions () {
		let rem = this.calcRemainder();

		return (
			<article>
				<ul className="options">
				{[15, 30, 60].map((mins, i) =>
					<li key={i}
						onClick={() => this.sendRequest(mins)}
						className={(rem > 0 && rem <= mins) ? 'is-disabled' : ''}>
						{ mins }
						<span>mins</span>
					</li>
				)}
				</ul>
			</article>
		);
	}

	renderCurrent () {
		let current = this.props.current;

		return (
			<article>
				<h1 className="current">
					{ (current) ? (current.title || 'Occupied') : 'Available' }
				</h1>
				<time className="remainder">
					{ this.renderRemainder() }
				</time>
			</article>
		);
	}

	render () {
		if (this.props.isPosting) {
			return (
				<article>
					<i class="loading" />
				</article>
			);
		}

		return (this.props.isBooking)
			? this.renderOptions()
			: this.renderCurrent();
	}
};

export default injectServices(Status);