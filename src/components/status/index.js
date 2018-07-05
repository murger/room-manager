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
				: (next) ? next.until : -1,
			showHrs = (remainder > 120),
			total = (showHrs) ? Math.round(remainder / 60) : remainder,
			label = (showHrs) ? 'hr' : 'min';

		if (remainder < 0) {
			return null;
		}

		return [total, label + (total > 1 ? 's' : '')].join(' ');
	}

	render () {
		let current = this.props.current;

		return (
			<article>
				<h1 className="current">
					{ (current) ? current.title : 'Available' }
				</h1>
				<time className="remainder">
					{ this.renderRemainder(current) }
				</time>
			</article>
		);
	}
};

export default injectServices(Status);