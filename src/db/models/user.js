const _ = require('lodash');

const { commonColumns } = require('../../util')

const userRoles = [ 'ADMIN', 'FAMILY', 'NANNY' ];

module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define('user', {
        id: commonColumns.id(sequelize, DataTypes),
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            jsonApi: jsonApi => jsonApi.Joi.string().email().required()
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            jsonApi: jsonApi => jsonApi.Joi.string().required()
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            jsonApi: jsonApi => jsonApi.Joi.string().required()
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            jsonApi: jsonApi => jsonApi.Joi.string().required()
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            jsonApi: jsonApi => jsonApi.Joi.bool()
        },
        role: {
            type: DataTypes.ENUM(...userRoles),
            allowNull: false,
            jsonApi: jsonApi => jsonApi.Joi.string().valid(...userRoles)
        },
        questions: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            jsonApi: jsonApi => jsonApi.Joi.object()
        },
        created_at: commonColumns.created_at(sequelize, DataTypes),
        updated_at: commonColumns.updated_at(sequelize, DataTypes)
    }, {
        tableName: 'user',
        underscored: true,
        indexes: [ { fields: [ 'id' ] } ],

        hooks: {}
    });

    /*
     * Instance Methods
     */
    _(Model.prototype).assign({

    }).value();

    /*
     * Class Methods
     */
    _(Model).assign({
        associate: function (models) {

        }
    }).value();

    return Model;
};
