import React from 'react';
import { inject, observer } from 'mobx-react';
import users from '../../users.json';
import './index.scss';

@inject('store')
@observer
class Status extends React.Component {
	calcRemainder () {
		let current = this.props.store.current,
			next = this.props.store.next;

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
		if (this.isOptionViable(mins) && !this.props.store.isLoading) {
			this.props.store.sendBookingRequest(mins);
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
		let current = this.props.store.current;

		return (
			<article>
				<h1 className="current">
					{ (current)
						? current.title || 'Occupied'
						: 'Available' }
				</h1>
				<time className="remainder">
					{ this.renderRemainder() }
				</time>
			</article>
		);
	}

	renderUsers () {
		return (
			<article>
				<ul className="users">
					{ users.map((user, idx) => {
                		return <li key={idx}>{ user.name }</li>;
                	})}
				</ul>
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
		let error = this.props.store.hasError;

		if (error) {
			return this.renderError(error);
		} else if (this.props.store.isLoading) {
			return this.renderLoading();
		} else if (this.props.store.isServing) {
			return this.renderOptions();
		} else {
			return this.renderCurrent();
		}
	}
};

export default Status;