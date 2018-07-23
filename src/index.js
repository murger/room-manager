import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
	<App room={1} refresh={5000} timeout={15000} />,
	document.getElementById('app')
);