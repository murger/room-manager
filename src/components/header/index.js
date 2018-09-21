import React from 'react';
import './index.scss';

class Header extends React.Component {
	toggleOptions (state) {
		this.props.toggleOptions(state);
	}

	renderBookingControls () {
		return (this.props.isOptsVisible)
			? <button
				className="cancel"
				onClick={() => this.toggleOptions(false)}>Go back</button>
			: <button
				className="book"
				onClick={() => this.toggleOptions(true)}>Start a meeting</button>;
	}

	render () {
		let option;

		if (this.props.current) {
			option = <p>{ this.props.current.contact || this.props.title }</p>;
		} else if (this.props.hasError && !this.props.isOptsVisible) {
			option = <p>&nbsp;</p>;
		} else if (this.props.isLoading) {
			option = <p>&nbsp;</p>;
		} else {
			option = this.renderBookingControls();
		}

		return (
			<header>
				<div className="logo" />
				<span className="connection" data-status={this.props.isConnected} />
				<div className="option">{ option }</div>
			</header>
		);
	}
};

export default Header;