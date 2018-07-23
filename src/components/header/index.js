import React from 'react';
import './index.scss';

class Header extends React.Component {
	setBooking (state) {
		this.props.setBooking(state);
	}

	renderBookingControls () {
		return (this.props.isBooking)
			? <button
				className="cancel"
				onClick={() => this.setBooking(false)}>Go back</button>
			: <button
				className="book"
				onClick={() => this.setBooking(true)}>Start a meeting</button>;
	}

    render () {
    	let option;

    	if (this.props.isPosting) {
    		option = <p className="detail">Sending&hellip;</p>;
    	} else if (this.props.current) {
    		option = <p className="detail">{ this.props.title }</p>;
    	} else {
    		option = this.renderBookingControls();
    	}

		return (
			<header>
				<div className="logo" />
				<div className="logo--white" />
				<div className="option">{ option }</div>
			</header>
		);
	}
};

export default Header;