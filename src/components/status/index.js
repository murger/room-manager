import React from 'react';
import './index.scss';

class Status extends React.Component {
	calcRemainder () {
		let current = this.props.current,
			next = this.props.next;

		return (current)
			? -current.remainder
			: (next)
				? next.until
				: Infinity;
	}

	isOptionViable (mins) {
		let remainder = this.calcRemainder();

		return (mins < remainder);
	}

	sendBookingRequest (mins) {
		if (this.isOptionViable(mins)) {
			this.props.sendBookingRequest(mins);
		}
	}

	renderRemainder () {
		let remainder = Math.abs(this.calcRemainder()),
			showHrs = (remainder > 120),
			total = (showHrs) ? Math.round(remainder / 60) : remainder,
			label = (showHrs) ? 'hr' : 'min',
			suffix = (total > 1) ? 's' : '';

		return (isFinite(remainder))
			? [total, label + suffix].join(' ')
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
		let current = this.props.current;

		return (
			<article>
				<h1 className="current">
					{ (current)
						? (current.title || 'Occupied')
						: this.props.title }
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
					<span className="loading" />
				</article>
			);
		}

		return (this.props.isOptsVisible)
			? this.renderOptions()
			: this.renderCurrent();
	}
};

export default Status;