import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, HashLocation } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import createHistory from 'history/lib/createHashHistory';
import promiseMiddleware from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './components/App.jsx';
import { Home } from './components/pages';

const history = createHistory();

let routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);

let store = compose(
  applyMiddleware(promiseMiddleware)
)(createStore)(combineReducers(reducers));

syncReduxAndRouter(history, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
, document.getElementById('app'));