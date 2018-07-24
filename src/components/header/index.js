import React from 'react';
import './index.scss';

class Header extends React.Component {
	showOptions (state) {
		this.props.showOptions(state);
	}

	renderBookingControls () {
		return (this.props.isOptsVisible)
			? <button
				className="cancel"
				onClick={() => this.showOptions(false)}>Go back</button>
			: <button
				className="book"
				onClick={() => this.showOptions(true)}>Start a meeting</button>;
	}

    render () {
    	let option;

    	if (this.props.isLoading) {
    		option = <p className="action">Loading&hellip;</p>;
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