import React from 'react';
import './index.scss';

export class Ticker extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            schedule: null
        };
    }

    render () {
		return (
			<section>
				<span className="mark" style={{ left: 90 * 2.2 }} />
				{this.props.hours.map((hour, index) =>
					<div className="tick" key={index} data-id={hour} />
				)}
				<div className="schedule">
					<span style={{ left: 0, width: 90 * 2 }} />
					<span style={{ left: 90 * 2.5, width: 90 * 1.5 }} />
					<span style={{ left: 90 * 4.5, width: 90 * 1.5 }} />
					<span style={{ left: 90 * 6, width: 90 * 1 }} />
					<span style={{ left: 90 * 7.5, width: 90 * 2 }} />
				</div>
			</section>
		);
	}
};