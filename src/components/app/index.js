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
		this.props.store.setupDevice(this.props.mac);
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