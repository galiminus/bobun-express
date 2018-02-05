import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import "moment";
import "moment/locale/fr";

import Main from './components/main';
import { Provider } from 'react-redux';
import { updateConfiguration } from './actions/configuration';
import { loadBoard } from './actions/board';

import { ConnectedRouter } from 'react-router-redux'

import store from "./store";
import history from "./history";

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main />
    </ConnectedRouter>
  </Provider>
);

document.addEventListener("DOMContentLoaded", e => {
  store.dispatch(updateConfiguration({
    board: "4Q4Qm2NT",
    ...(store.getState().configuration || {})
  }));

  ReactDOM.render(
    <App />, document.body.appendChild(document.createElement('div'))
  );

  // reload the board every 5 minutes
  setTimeout(() => {
    store.dispatch(loadBoard(store.getState().configuration.board))
  }, 60 * 10);
})
