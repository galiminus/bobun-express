import React from 'react';
import Loader from './loader';
import Attachment from './attachment';

export default (props) => (
  <Loader><Attachment {...props} /></Loader>
)
