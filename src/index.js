import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import './static/css/common.css'
import './static/remResize'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

//创建Redux的store对象
const store = configureStore()

ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();
