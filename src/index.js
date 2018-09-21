import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

let params = new URLSearchParams(window.location.search);

ReactDOM.render(
	<App mac={params.get('mac')}
		refresh={1000}
		timeout={15000} />,
	document.getElementById('app')
);