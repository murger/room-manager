import React from 'react';
import './index.scss';

export class Ticker extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			hourWidth: 90,
			range: [...Array(11).keys()].map((x) => {
				return (x + 9 > 12) ? x - 3 : x + 9;
			})
		}
	}

    renderTicks (range) {
		return range.map((hour, i) =>
			<div className="tick" key={i} data-id={hour} />
		);
    }

    renderSchedule () {
		return this.props.schedule.map((event, i) => {
			let start = event.start,
				end = event.end,
				xH = this.state.hourWidth,
				xO = this.state.range[0],
				left = ((start.getHours() - xO) * xH) + ((start.getMinutes() * xH) / 60),
				width = ((end.getTime() - start.getTime()) / (1000 * 60)) * (90 / 60);

			return (
				<span key={i} style={{ left, width }} />
			);
		});
    }

    render () {
    	let now = new Date(),
    		xH = this.state.hourWidth,
			xO = this.state.range[0],
    		xM = ((now.getHours() - xO) * xH) + ((now.getMinutes() * xH) / 60);

		return (
			<section>
				<span className="mark" style={{ left: xM }} />
				{ this.renderTicks(this.state.range) }
				<div className="schedule">{ this.renderSchedule() }</div>
			</section>
		);
	}
};