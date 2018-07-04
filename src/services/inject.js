import React from 'react';
import index from './';
import mockup from './mockup';

let services = (process.env.mockup) ? mockup : index;

const injectServices = (Component) => {
    return class ServicedComponent extends React.Component {
        render () {
            return <Component {...this.props} services={services} />
        }
    }
};

export default injectServices;