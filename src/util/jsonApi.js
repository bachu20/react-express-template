const _ = require('lodash');
const jsonApi = require('jsonapi-server');
const pluralize = require('pluralize');
const { apiPort, apiPrefix } = require('../config');
const { SequelizeStore } = require('../stores');
const { logger: getLogger } = require('../util')

const logger = getLogger(__filename);

exports.getJsonApiAttributes = function(model) {
    return _.mapValues(model.attributes, (attr, key) => {
        if (!attr.jsonApi) {
            const { Joi } = jsonApi;
            const isIdField = /\_id\b/.test(key.toString());

            logger.info({ model, column: attr }, 'jsonApi attribute missing on column');
            return isIdField ? Joi.string().guid().allow(null) : Joi.string();
        }

        return attr.jsonApi(jsonApi);
    });
}

exports.getJsonApi = function(models, options = {}) {
    // config jsonApi
    options = _.assign({
        port: apiPort,
        base: apiPrefix,
        graphiql: false,
        meta: {
            copyright: 'Tembii Inc.'
        }
    }, options);

    jsonApi.setConfig(options);

    // define resource for all models
    _(models).forEach(model => {
        logger.info({ model }, 'defining jsonapi resource');

        return jsonApi.define({
            resource: pluralize.plural(model.getTableName()),
            handlers: new SequelizeStore(model),
            attributes: exports.getJsonApiAttributes(model)
        });
    });

    return jsonApi;
}