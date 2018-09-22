const Promise = require('bluebird');
const _ = require('lodash');
const { plural } = require('pluralize');
const { Joi } = require('jsonapi-server');
const { get404ResourceNotFound } = require('../util/errorHelpers');

const { models } = require('../db');

class SequelizeStore {
    constructor (model, options = {}) {
        this.model = model;
        this.ready = false;
        this.type = plural(model.getTableName());
        this.resourceConfig;
    }

    _getError(err, options = {}) {
        const defaultError = {
            code: 'UNKNOWN',
            detail: 'unknown jsonapi server error',
            status: 403,
            title: 'Request validation failed'
        }

        const newError = _.defaults(err, {
            code: err.name,
            detail: err.message,
            status: 403,
            title: 'Request validation failed'
        }, defaultError);

        return _.assign(newError, options);
    }

    _getAttrs(data) {
        const resourceAttrs = _.keys(this.resourceConfig.attributes);
        const validAttrs = _.pick(data, resourceAttrs);

        return _.assign(validAttrs, { type: this.type });
    }

    _formatResponse(data) {
        if (_.isArray(data)) data = data.map(d => this._getAttrs(d));
        else data = this._getAttrs(data);

        return data;
    }

    initialise(resourceConfig) {
        this.ready = true;
        this.resourceConfig = resourceConfig;
    }

    search(request, cb) {
        const { offset, limit } = _.get(request, 'params.page');

        Promise.resolve()
            .then(() => this.model.findAndCountAll({ offset, limit }))
            .then(data => cb(null, this._formatResponse(data.rows), data.count))
            .catch(err => cb(err));
    }

    find(request, cb) {
        const { id, type } = _.get(request, 'params');
        const error = get404ResourceNotFound({ id, type });

        Promise.resolve()
            .then(() => this.model.findOne({ where: { id } }))
            .tap(data => data || Promise.reject(error))
            .then(data => cb(null, this._formatResponse(data), 1))
            .catch(err => cb(this._getError(err)));
    }

    create(request, newResource, cb) {

        Promise.resolve()
            .then(() => this.model.create(newResource))
            .then(data => cb(null, this._getAttrs(data)))
            .catch(err => cb(this._getError(err)));

    }

    delete(request, cb) {
        const { id } = _.get(request, 'params');

        Promise.resolve()
            .then(() => this.model.destroy({ where: { id } }))
            .then(() => cb())
            .catch(err => cb(this._getError(err)));
    }

    update(request, cb) {
        debugger;
    }
}

module.exports = SequelizeStore;