import React from 'react';
import { inject, observer } from 'mobx-react';
import './index.scss';

@inject('store')
@observer
class Timeline extends React.Component {
	constructor (props) {
		super(props);
		this.widthPerHour = (56 * 2) + 2;
		this.timespan = [...Array(11).keys()].map(x =>
			(x + 9 > 12) ? x - 3 : x + 9);
	}

	renderTicks () {
		return this.timespan.map((hour, i) =>
			<li key={i} data-id={hour} />
		);
	}

	renderSchedule () {
		let events = this.props.store.events,
			hourFirst = this.timespan[0],
			xHour = this.widthPerHour;

		return events.map((event, i) => {
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
			hNow = now.getHours(),
			hFirst = this.timespan[0],
			hLast = this.timespan.slice(-1)[0] + 12,
			xHour = this.widthPerHour,
			xHand = ((hNow - hFirst) * xHour) +
				((now.getMinutes() * xHour) / 60);

		return {
			left: xHand,
			opacity: +(hNow >= hFirst && hNow < hLast)
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