import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/common.css'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
