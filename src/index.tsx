import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import store from '@src/redux/store';
import HttpApi from '@src/utils/https';
import './index.less';

switch (process.env.REACT_APP_ENV) {
  case 'local':
    HttpApi.baseURL = 'http://vifunapi-test.baiweietech.com';
    break;
  case 'dev':
    HttpApi.baseURL = 'http://vifunapi-test.baiweietech.com';
    break;
  case 'test':
    HttpApi.baseURL = 'http://vifunapi-test.baiweietech.com';
    break;
  case 'prod':
    HttpApi.baseURL = 'http://vifunapi-test.baiweietech.com';
    break;
  default:
    break;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
