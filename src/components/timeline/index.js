import React from 'react';
import './index.scss';

class Timeline extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			widthPerHour: (57 * 2) + 2,
			timespan: [...Array(11).keys()].map((x) => {
				return (x + 9 > 12) ? x - 3 : x + 9;
			})
		}
	}

	renderTicks () {
		return this.state.timespan.map((hour, i) =>
			<li key={i} data-id={hour} />
		);
	}

	renderSchedule () {
		let hourFirst = this.state.timespan[0],
			xHour = this.state.widthPerHour;

		return this.props.events.map((event, i) => {
			let start = event.start,
				end = event.end,
				left = ((start.getHours() - hourFirst) * xHour) +
					((start.getMinutes() * xHour) / 60),
				width = Math.ceil((end.getTime() - start.getTime()) /
					(1000 * 60)) * (xHour / 60);

			return (
				<li key={i} style={{ left, width }}><span /></li>
			);
		});
	}

	calcHandStyle () {
		let now = new Date(),
			hourNow = now.getHours(),
			hourFirst = this.state.timespan[0],
			hourLast = this.state.timespan.slice(-1)[0] + 12,
			xHour = this.state.widthPerHour,
			xHand = ((hourNow - hourFirst) * xHour) +
				((now.getMinutes() * xHour) / 60);

		return {
			left: xHand,
			opacity: +(hourNow >= hourFirst && hourNow < hourLast)
		};
	}

	render () {
		return (
			<section>
				<em className="hand" style={this.calcHandStyle()} />
				<ol className="range">{ this.renderTicks() }</ol>
				<ol className="schedule">{ this.renderSchedule() }</ol>
			</section>
		);
	}
};

export default Timeline;