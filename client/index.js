import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { routes } from 'routes';
import configureStore from 'config/store';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

/* Images
 * This space is reserved for images that are required by server rendering,
 * e.g. the favicon and any other images that need to be in the base HTML file.
 */
import '../common/assets/images/favicon.png';

/* Stylesheets
 * Main.scss should @import all the other stylesheets that you need. If you want
 * to use LESS or another preprocessor, you can include it here and update your
 * webpack configure to use the appropriate loader.
 */
import '../common/assets/stylesheets/main.scss';

// The root element of your app
const rootElement = document.getElementById('app');

// Creates the Redux store based on the initial state passed down by the server
// rendering.
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

// Render the app!
ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  rootElement
);
