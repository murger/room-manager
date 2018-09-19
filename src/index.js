import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
	<App
		id={process.env.id || 1}
		title={process.env.title || "Meeting Room"}
		refresh={1000}
		timeout={15000} />,
	document.getElementById('app')
);