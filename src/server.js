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

server.use(bodyParser.json());
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
    if (req.path.indexOf('/api') === 0) next();

    const api = new Api(req);
    const alt = new AppAlt(api);
    return new Promise((resolve) => {
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.send(500, error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          resolve(renderProps);
        } else {
          res.send(404, 'Not found');
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
      res.render('app', { html });
    }).catch(err => {
      next(err);
    });
  });

  server.get('*', (req, res, next) => {
    if (req.path.indexOf('/api') === 0) next();

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
