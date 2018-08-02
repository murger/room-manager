import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
	<App
		id={1}
		title="Saturn"
		refresh={1000}
		timeout={15000} />,
	document.getElementById('app')
);