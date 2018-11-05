import React from 'react';
import { inject, observer } from 'mobx-react';
import './index.scss';

@inject('store')
@observer
class Timeline extends React.Component {
	constructor (props) {
		super(props);

		let body = getComputedStyle(document.body),
			tickSpace = parseInt(body.getPropertyValue('--tick-space')),
			tickWidth = parseInt(body.getPropertyValue('--tick-width'));

		this.hourWidth = (tickSpace * 2) + tickWidth;
		this.timespan = [...Array(11).keys()]
			.map(x => (x + 9 > 12) ? x - 3 : x + 9);
	}

	renderTicks () {
		return this.timespan.map((hour, i) =>
			<li key={i} data-id={hour} />
		);
	}

	renderSchedule () {
		let events = this.props.store.events,
			hFirst = this.timespan[0],
			current = this.props.store.current;

		return events.map((event, i) => {
			let start = event.start,
				end = event.end,
				xHour = (start.getHours() - hFirst) * this.hourWidth,
				left = xHour + ((start.getMinutes() * this.hourWidth) / 60),
				diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60)),
				width = diff * (this.hourWidth / 60),
				isActive = (current && event.id === current.id);

			return (
				<li key={i}
					className={(isActive || !current) ? 'is-active' : ''}
					style={{ left, width }}><span /></li>
			);
		});
	}

	calcHandStyle () {
		let now = new Date(),
			hour = now.getHours(),
			hFirst = this.timespan[0],
			hLast = this.timespan.slice(-1)[0] + 12,
			xHand = ((hour - hFirst) * this.hourWidth) +
				((now.getMinutes() * this.hourWidth) / 60),
			isWithinBounds = (hour >= hFirst && hour < hLast);

		return {
			left: xHand,
			opacity: +(isWithinBounds)
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
