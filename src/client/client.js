import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

ReactDOM.hydrate(
  <BrowserRouter>
    <div>{renderRoutes(Routes)}</div>
  </BrowserRouter>,
  document.querySelector('#root')
);
