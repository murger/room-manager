import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
	<App room={5} refresh={1000} />,
	document.getElementById('app')
);