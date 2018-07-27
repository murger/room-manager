import React from 'react';
import mockups from '../../mockups';
import services from './';

const injectServices = (Component) => {
    return class ServicedComponent extends React.Component {
        render () {
            return <Component {...this.props}
            	services={(process.env.mockups) ? mockups : services} />;
        }
    }
};

export default injectServices;