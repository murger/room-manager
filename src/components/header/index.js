import React from 'react';
import './index.scss';

export class Header extends React.Component {
    render () {
		return (
			<header>
				<div className="logo" />
				<div className="option">
				{(this.props.contact)
					? <div className="contact">{ this.props.contact }</div>
					: <button className="book">Book Now</button>
				}
				</div>
			</header>
		);
	}
};