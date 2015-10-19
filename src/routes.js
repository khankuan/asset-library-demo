import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

import HomePage from './views/HomePage';
import App from './views/App';
import CategoryPage from './views/CategoryPage';
import AssetPage from './views/AssetPage';

import './sass/index.scss';

const router = (
  <Router
    history={typeof window === 'undefined' ? createMemoryHistory() : createBrowserHistory()}
    location="history">
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="category/:category">
        <IndexRoute component={CategoryPage} />
      </Route>
      <Route path="assets/:assetId">
        <IndexRoute component={AssetPage} />
      </Route>
    </Route>
  </Router>
);

module.exports = router;
