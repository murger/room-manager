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
		if (this.isOptionViable(mins) && !this.props.isLoading) {
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
			: '';
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
			remainder = (
				<time className="remainder">
					{ this.renderRemainder() }
				</time>
			);

		return (
			<article>
				<h1 className="current">
					{ (current)
						? (current.title || 'Occupied')
						: 'Available' }
				</h1>
				{ remainder }
			</article>
		);
	}

	renderLoading () {
		return (
			<article>
				<span className="loading" />
			</article>
		);
	}

	renderError (text) {
		return (
			<article>
				<p className="error">{ text }</p>
			</article>
		);
	}

	render () {
		let error = this.props.hasError,
			isOptsVisible = this.props.isOptsVisible,
			isLoading = this.props.isLoading;

		if (error) {
			return this.renderError(error);
		} else if (isLoading) {
			return this.renderLoading();
		}

		return (isOptsVisible)
			? this.renderOptions()
			: this.renderCurrent();
	}
};

export default Status;