import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import store from './stores';
import App from './components/app';

let params = new URLSearchParams(window.location.search);

ReactDOM.render(
    <Provider store={store}>
		<App mac={params.get('mac')} />
	</Provider>,
	document.getElementById('app')
);