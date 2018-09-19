import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

let params = new URLSearchParams(window.location.search);

ReactDOM.render(
	<App
		id={params.get('id') || 1}
		title={params.get('title') || "Meeting Room"}
		refresh={1000}
		timeout={15000} />,
	document.getElementById('app')
);