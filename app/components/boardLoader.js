import React from 'react';
import Loader from './loader';
import Board from './board';

export default (props) => (
  <Loader scrollUp><Board {...props} /></Loader>
)
