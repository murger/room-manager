import React from 'react';
import './index.scss';

class Timeline extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			widthPerHour: 90,
			timeSpan: [...Array(11).keys()].map((x) => {
				return (x + 9 > 12) ? x - 3 : x + 9;
			})
		}
	}

	renderTicks () {
		return this.state.timeSpan.map((hour, i) =>
			<li key={i} data-id={hour} />
		);
	}

	renderSchedule () {
		let hourFirst = this.state.timeSpan[0],
			xHour = this.state.widthPerHour;

		return this.props.events.map((event, i) => {
			let start = event.start,
				end = event.end,
				left = ((start.getHours() - hourFirst) * xHour) +
					((start.getMinutes() * xHour) / 60),
				width = Math.ceil((end.getTime() - start.getTime()) /
					(1000 * 60)) * (90 / 60);

			return (
				<li key={i} style={{ left, width }}><span /></li>
			);
		});
	}

	calcHandStyles () {
		let now = new Date(),
			hourNow = now.getHours(),
			hourFirst = this.state.timeSpan[0],
			hourLast = this.state.timeSpan.slice(-1)[0] + 12,
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
				<em className="marker" style={this.calcHandStyles()} />
				<ol className="range">{ this.renderTicks() }</ol>
				<ol className="schedule">{ this.renderSchedule() }</ol>
			</section>
		);
	}
};

export default Timeline;