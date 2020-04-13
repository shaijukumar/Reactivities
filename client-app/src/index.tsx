import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import 'react-toastify/dist/ReactToastify.min.css';

import { Router } from 'react-router-dom';
import './app/layouts/styles.css';
import App from './app/layouts/App'; 
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './app/layouts/ScrollToTop';


export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
      
  </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
