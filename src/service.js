import React from 'react';
import mockup from '../data';
import services from './services';

const injectServices = (Component) => {
	return class ServicedComponent extends React.Component {
		render () {
			return <Component {...this.props}
				services={(process.env.mockup) ? mockup : services} />;
		}
	}
};

export default injectServices;