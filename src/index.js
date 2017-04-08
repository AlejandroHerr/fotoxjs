/* global document,__DEV__ */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './js/Root';

render(<Root />,
  document.getElementById('root'),
);
