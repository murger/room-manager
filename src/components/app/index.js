import React from 'react';
import { inject, observer } from 'mobx-react';
import Header from '../header';
import Status from '../status';
import Timeline from '../timeline';
import './index.scss';

@inject('store')
@observer
class App extends React.Component {
	componentDidMount () {
		this.props.store.setupDevice();
	}

	render () {
		let mode = (this.props.store.current ? 'occupied' : '');

		return (
			<main className={mode}>
				<Header />
				<Status />
				<Timeline />
			</main>
		);
	}
};

export default App;