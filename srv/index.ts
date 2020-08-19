// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import bodyParser from 'body-parser';
// import socketIO from "socket.io";
import main from './routes';
import apiV1 from './routes/api/v1';
import master from './routes/api/master/v1';

import { httpLogger } from './modules/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (app: any) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(httpLogger);

  app.use('/', main);
  app.use('/api/v1/', apiV1);
  app.use('/api/master/v1/', master);
};
