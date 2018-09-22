'use strict';

const Promise = require('bluebird');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const { sequelize } = queryInterface;

        return Promise.resolve()
            .then(() => sequelize.query(``));
    },
    down: (queryInterface, Sequelize) => {
        const { sequelize } = queryInterface;

        return Promise.resolve()
            .then(() => sequelize.query(``));
    }
};
