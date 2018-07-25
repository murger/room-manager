import 'core-js/es6/map';
import 'core-js/es6/set';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.render(
	<App
		id={1}
		title="Jupiter"
		refresh={1000}
		timeout={15000} />,
	document.getElementById('app')
);