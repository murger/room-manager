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
			<li key={i} data-id={hour} />
		);
	}

	renderSchedule () {
		return this.props.schedule.map((event, i) => {
			let start = event.start,
				end = event.end,
				xO = this.state.range[0],
				xH = this.state.hourWidth,
				left = ((start.getHours() - xO) * xH) + ((start.getMinutes() * xH) / 60),
				width = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60)) * (90 / 60);

			return (
				<li key={i} style={{ left, width }}><span /></li>
			);
		});
	}

	render () {
		let now = new Date(),
			xO = this.state.range[0],
			xH = this.state.hourWidth,
			xHand = ((now.getHours() - xO) * xH) + ((now.getMinutes() * xH) / 60);

		// TODO: limit marker movement
		return (
			<section>
				<em className="marker" style={{ left: xHand }} />
				<ol className="range">{ this.renderTicks(this.state.range) }</ol>
				<ol className="schedule">{ this.renderSchedule() }</ol>
			</section>
		);
	}
};