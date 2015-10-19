/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';

import routes from './routes';
import AppAlt from './core/AppAlt';
import { match, RoutingContext } from 'react-router';
import withAlt from './decorators/withAlt';
import { Resolver } from 'react-resolver';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import backend from './backend';
import bodyParser from 'body-parser';

import Api from './api';

const server = global.server = express();

server.use(bodyParser.json({limit: '50mb'}));
backend(server).then(() => {
  server.set('port', (process.env.PORT || 3000));
  server.use(express.static(path.join(__dirname, 'public')));

  //
  // Register API middleware
  // -----------------------------------------------------------------------------

  //  EJS
  server.set('view engine', 'ejs');
  server.set('views', __dirname + '/content');

  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', async (req, res, next) => {
    if (req.path.indexOf('/api') === 0 ||
        req.path.indexOf('/assets') === 0 ||
        req.path === 'app.js') next();

    if (req.path === '/__webpack_hmr') return;

    console.log('=== Received request', req.path);

    const api = new Api(req);
    const alt = new AppAlt(api);
    return new Promise((resolve) => {
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          resolve(renderProps);
        } else {
          res.status(404).send('Not found');
        }
      });
    }).then(renderProps => {
      console.log('Server resolving');
      const Component = withAlt(alt)(RoutingContext);
      return Resolver
        .resolve(() => {
          return (
            <Component {...renderProps} />
          );
        });
    }).then(resolve => {
      console.log('Server rendering');
      const html = ReactDOMServer.renderToString(<resolve.Resolved />);
      const store = alt.takeSnapshot();
      res.render('app', { html, store });
    }).catch(err => {
      next(err);
    });
  });

  server.get('*', (req, res, next) => {
    if (req.path.indexOf('/api') === 0 ||
        req.path.indexOf('/assets') === 0 ||
        req.path === 'app.js') next();

    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });

  //
  // Launch the server
  // -----------------------------------------------------------------------------

  server.listen(server.get('port'), () => {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + server.get('port'));
    if (process.send) {
      process.send('online');
    }
  });
});
