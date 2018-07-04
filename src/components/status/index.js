import React from 'react';
import injectServices from '../../services/inject';
import './index.scss';

class Status extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			next: null
		};
	}

	componentWillMount () {
		let services = this.props.services,
			room = this.props.room;

		services.schedule.getNextEvent(room).then((event) => {
			this.setState({ next: event });
		});
	}

	renderRemainder (current) {
		let next = this.state.next,
			remainder = (current)
				? current.remainder
				: (next) ? next.until : -1

		if (remainder < 0) {
			return null;
		}

		return (remainder < 120)
			? [remainder, 'mins'].join(' ')
			: [Math.round(remainder / 60), 'hrs'].join(' ');
	}

	render () {
		let current = this.props.current;

		return (
			<article>
				<div className="current">
					{ (current) ? current.title : 'Available' }
				</div>
				<div className="remainder">
					{ this.renderRemainder(current) }
				</div>
			</article>
		);
	}
};

export default injectServices(Status);