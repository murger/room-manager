import React from 'react';
import { inject, observer } from 'mobx-react';
import titleize from 'titleize';
import './index.scss';

@inject('store')
@observer
class Header extends React.Component {
	toggleOptions (state) {
		this.props.store.toggleOptions(state);
	}

	renderBookingControls () {
		return (this.props.store.isServing)
			? <button
				className="cancel"
				onClick={() => this.toggleOptions(false)}>Go back</button>
			: <button
				className="book"
				onClick={() => this.toggleOptions(true)}>Start a meeting</button>;
	}

	render () {
		let option,
			current = this.props.store.current,
			room = this.props.store.room;

		if (current) {
			option = <p>{ current.contact || titleize(room.title) }</p>;
		} else if (this.props.store.isLoading || !this.props.store.isActive) {
			option = <p>&nbsp;</p>;
		} else {
			option = this.renderBookingControls();
		}

		return (
			<header>
				<div className="logo" />
				<span className="connection"
					data-status={this.props.store.isConnected} />
				<div className="option">{ option }</div>
			</header>
		);
	}
};

export default Header;