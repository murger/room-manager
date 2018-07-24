import React from 'react';
import injectServices from '../../services/inject';
import './index.scss';

class Status extends React.Component {
	calcRemainder () {
		let current = this.props.current,
			next = this.props.next;

		return (current)
			? current.remainder * -1
			: (next)
				? next.until
				: Infinity;
	}

	isOptionViable (mins) {
		let rem = this.calcRemainder();

		return (rem > mins);
	}

	sendBookingRequest (mins) {
		if (this.isOptionViable(mins)) {
			this.props.sendBookingRequest(mins);
		}
	}

	renderRemainder () {
		let rem = Math.abs(this.calcRemainder()),
			showHrs = (rem > 120),
			total = (showHrs) ? Math.round(rem / 60) : rem,
			label = (showHrs) ? 'hr' : 'min';

		return (isFinite(rem))
			? [total, label + (total > 1 ? 's' : '')].join(' ')
			: null;
	}

	renderOptions () {
		return (
			<article>
				<ul className="options">
				{[15, 30, 60].map((mins, i) =>
					<li key={i}
						onClick={() => this.sendBookingRequest(mins)}
						className={!this.isOptionViable(mins) ? 'is-disabled' : ''}>
						{ mins }
						<span>mins</span>
					</li>
				)}
				</ul>
			</article>
		);
	}

	renderCurrent () {
		let current = this.props.current,
			title = this.props.title;

		return (
			<article>
				<h1 className="current">
					{ (current) ? (current.title || 'Occupied') : title }
				</h1>
				<time className="remainder">
					{ this.renderRemainder() }
				</time>
			</article>
		);
	}

	render () {
		if (this.props.isLoading) {
			return (
				<article>
					<i className="loading" />
				</article>
			);
		}

		return (this.props.isOptsVisible)
			? this.renderOptions()
			: this.renderCurrent();
	}
};

export default injectServices(Status);