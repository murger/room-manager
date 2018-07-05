import React from 'react';
import './index.scss';

export class Header extends React.Component {
    render () {
    	let current = this.props.current;

		return (
			<header>
				<div className="logo" />
				<div className="logo--alt" />
				<div className="option">
					{ (current)
						? <p className="contact">{ current.contact }</p>
						: <button className="book">Book this room</button> }
				</div>
			</header>
		);
	}
};