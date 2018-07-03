import React from 'react';
import './index.scss';

export class Header extends React.Component {
    render () {
		return (
			<header>
				<div className="logo" />
				<div className="option">
				{(this.props.current)
					? <div className="contact">{ this.props.current.contact }</div>
					: <button className="book">Book this room</button>
				}
				</div>
			</header>
		);
	}
};