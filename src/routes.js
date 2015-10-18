import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

import HomePage from './views/HomePage';
import App from './views/App';

import './sass/index.scss';

const router = (
  <Router
    history={typeof window === 'undefined' ? createMemoryHistory() : createBrowserHistory()}
    location="history">
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
    </Route>
  </Router>
);

module.exports = router;
