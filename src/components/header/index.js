import React from 'react';
import './index.scss';

export class Header extends React.Component {
    render () {
    	let current = this.props.current;

		return (
			<header>
				<div className="logo" />
				<div className="option">
					{ (current)
						? <div className="contact">{ current.contact }</div>
						: <button className="book">Book this room</button> }
				</div>
			</header>
		);
	}
};