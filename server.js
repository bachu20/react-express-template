const bodyParser = require('body-parser');
const _ = require('lodash');
const express = require('express');
const app = express();

const { 
  util: { logger: getLogger, jsonApi: { getJsonApi } },
  middleware,
  routes,
  db: { models, sequelize },
  config
} = require('./src');

// configure jsonapi
const jsonApiRouter = new express.Router();
const jsonApi = getJsonApi(models, { router: jsonApiRouter });

const logger = getLogger(__filename);

// setup cors header
app.use(middleware.setCorsHeader);

// add sequelize client to req
app.use(middleware.setSequelize(sequelize));

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup custom resource routes
logger.info({ routes: _.keys(routes) }, 'setting up all custom routes');
_.keys(routes).forEach(route => app.use(`/${config.apiPrefix}/${route}`, routes[route]));

// setup jsonapi resource routes;
app.use('/', jsonApiRouter);

// error handling middleware
app.use(middleware.errorHandler);

const port = config.apiPort;
sequelize
  .sync()
  .then(() => jsonApi.start())
  .then(() => app.listen(port, () => logger.info({ port }, 'server listening')));
