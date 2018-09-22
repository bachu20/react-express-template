const _ = require('lodash');
const uuid = require('uuid/v4');

exports.id = function (sequelize, DataTypes, overrides = {}) {
  return _({
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      allowNull: false,
      primaryKey: true
  }).assign(overrides).value();
};

exports.created_at = function (sequelize, DataTypes, overrides = {}) {
  return _({
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
      allowNull: false,
      jsonApi: jsonApi => jsonApi.Joi.date().iso().meta('readonly')
  }).assign(overrides).value();
};

exports.updated_at = function (sequelize, DataTypes, overrides = {}) {
  return _({
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
      allowNull: false,
      jsonApi: jsonApi => jsonApi.Joi.date().iso().meta('readonly')
  }).assign(overrides).value();
};
