import React from 'react';
import './index.scss';

export class Ticker extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            hours: [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7]
        };
    }

    render () {
    	console.log(this.state.hours);
		return (
			<footer>
				{this.state.hours.map((hour, index) =>
					<div className="hour" key={index}>{ hour }</div>
				)}
			</footer>
		);
	}
};