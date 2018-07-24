import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
	<App room={1}
		title="Jupiter"
		refresh={1000}
		timeout={15000} />,
	document.getElementById('app')
);