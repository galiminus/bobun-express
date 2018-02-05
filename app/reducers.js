import configuration from "./reducers/configuration";
import board from "./reducers/board";
import error from "./reducers/error";
import listsDrawer from "./reducers/listsDrawer";

import { routerReducer } from 'react-router-redux';

import { combineReducers } from "redux";
import { reducer as formReducer, actionTypes as formActionTypes } from 'redux-form';

export default combineReducers({
  configuration,
  board,
  error,
  listsDrawer,
  form: formReducer,
  router: routerReducer
})
