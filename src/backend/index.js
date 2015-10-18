import cookieParser from 'cookie-parser';

import api from './api';
import db from './models';

module.exports = (server) => {
  server.use(cookieParser());

  //  Set db module for each request
  server.use((req, res, next) => {
    req.models = db.models;
    next();
  });

  //  Set routes
  api(server);

  //  Error
  server.use((err, req, res, next) => {
    res.status(500).send({ error: err });
    next(err);
  });

  //  Sync db
  return db.sync();
};
