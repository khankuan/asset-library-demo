import AppRouter from './routes';
import React from 'react';
import ReactDOM from 'react-dom';
import { Resolver } from 'react-resolver';
import withAlt from './decorators/withAlt';
import AppAlt from './core/AppAlt';
import Api from './api';

import './sass/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Client ready');
  const api = new Api();
  const alt = new AppAlt(api);
  alt.bootstrap(window.__INITIAL_DATA__);
  const Root = withAlt(alt)(AppRouter);

  ReactDOM.render(<Root />, document.getElementById('app'));

  //  This method works but doesn't have any difference to the react dom render
  // Resolver.render(() => {
  //   console.log('Client rendering');
  //   return (
  //     <Root />
  //   );
  // }, document.getElementById('app'));
});
