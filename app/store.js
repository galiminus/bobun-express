import reducers from "./reducers";
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import persistState from 'redux-localstorage';
import createSagaMiddleware from 'redux-saga';

import { Route } from 'react-router'

import { routerMiddleware } from 'react-router-redux';
import history from "./history";
import boardSaga from './sagas/board';

const historyMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(logger),
  applyMiddleware(historyMiddleware),
  persistState(['configuration', 'router'])
)

let store = createStore(
  reducers,
  enhancer
);

sagaMiddleware.run(boardSaga)

export default store;
