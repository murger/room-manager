import React from 'react';
import './index.scss';

class Header extends React.Component {
	setBooking (state) {
		this.props.setBooking(state);
	}

	renderBookingControls () {
		let isBooking = this.props.isBooking;

		return (isBooking)
			? <button
				className="cancel"
				onClick={() => this.setBooking(false)}>Cancel</button>
			: <button
				className="book"
				onClick={() => this.setBooking(true)}>Book this room</button>;
	}

    render () {
    	let current = this.props.current;

		return (
			<header>
				<div className="logo" />
				<div className="logo--white" />
				<div className="option">
					{ (current)
						? <p className="contact">{ current.contact }</p>
						: this.renderBookingControls() }
				</div>
			</header>
		);
	}
};

export default Header;