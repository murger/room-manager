import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

let params = new URLSearchParams(window.location.search);

ReactDOM.render(
	<App
		id={params.get('id') || 0}
		title={params.get('title') || "Room"}
		refresh={1000}
		timeout={15000} />,
	document.getElementById('app')
);