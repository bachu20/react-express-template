const app = require('express')();
const bodyParser = require('body-parser');
const _ = require('lodash');

const { config } = require('./config');
const logger = require('./helpers/logger')(__filename);
// const middleware = require('./middleware');
const apiRoutes = require('./routes');

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// test message for home route
app.get('/', (req, res) => res.send('Hello from code-connect server'));

// map all routes to proper route files
const routes = _.keys(apiRoutes);
logger.info({ routes }, 'setting up all api routes');

routes.forEach(route => app.use(`/api/${route}`, apiRoutes[route]));

// error handling middleware
// app.use(middleware.errorHandler);

const port = config.apiPort;
app.listen(port, () => logger.info({ port }, 'server listening'));