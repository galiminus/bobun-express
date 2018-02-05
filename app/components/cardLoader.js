import React from 'react';
import Loader from './loader';
import Card from './card';

export default (props) => (
  <Loader scrollUp><Card {...props} /></Loader>
)
