import React from 'react';
import { inject, observer } from 'mobx-react';
import Header from '../header';
import Status from '../status';
import Timeline from '../timeline';
import './index.scss';

@inject('store')
@observer
class App extends React.Component {
	constructor (props) {
		super(props);
	}

	componentWillUnmount () {
		clearInterval(this.timer);
	}

	componentDidMount () {
		let mac = this.props.mac;

		if (!mac) {
			this.isUnknown = true;
		} else {
			this.props.store.setupDevice(mac);
		}
	}

	render () {
		let state = (this.props.store.current ? 'occupied' : '');

		return (
			<main className={state}>
				<Header />
				<Status />
				<Timeline />
			</main>
		);
	}
};

export default App;