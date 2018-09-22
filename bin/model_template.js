const _ = require('lodash');

const { commonColumns } = require('../../util')

module.exports = function (sequelize, DataTypes) {
    const Model = sequelize.define('<<<name>>>', {
        id: commonColumns.id(sequelize, DataTypes),

        example: {
            type: DataTypes.TEXT,
            jsonApi: jsonApi => jsonApi.Joi.string()
        },

        created_at: commonColumns.created_at(sequelize, DataTypes),
        updated_at: commonColumns.updated_at(sequelize, DataTypes)
    }, {
        tableName: '<<<name>>>',
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