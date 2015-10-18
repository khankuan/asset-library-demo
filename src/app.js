import AppRouter from './routes';
import React from 'react';
import { Resolver } from 'react-resolver';
import withAlt from './decorators/withAlt';
import AppAlt from './core/AppAlt';
import Api from './api';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Client ready');
  const api = new Api();
  const alt = new AppAlt(api);
  alt.bootstrap(window.__INITIAL_DATA__);
  const Root = withAlt(alt)(AppRouter);

  Resolver.render(() => {
    console.log('Client rendering');
    return (
      <Root />
    );
  }, document.getElementById('app'));
});
