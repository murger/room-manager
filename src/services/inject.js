import React from 'react';
import index from './';
import mocks from './mocks';

let isDev = (process.env.NODE_ENV === 'development'),
	services = (isDev) ? mocks : index;

const injectServices = (Component) => {
    return class ServicedComponent extends React.Component {
        render () {
            return <Component {...this.props} services={services} />
        }
    }
};

export default injectServices;