/**
 *  Default database configuration file
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 *
 *  docs: https://github.com/biggora/caminte/wiki/Connecting-to-DB#connecting
 **/

module.exports.production = {
    driver     : 'postgres',
    host       : 'localhost',
    port       : '5432',
    username   : 'test',
    password   : 'test',
    database   : 'test',
    autoReconnect : true
};

module.exports.development = {
    driver     : 'postgres',
    host       : 'localhost',
    port       : '5432',
    username   : 'test',
    password   : 'test',
    database   : 'test',
    autoReconnect : true
};

module.exports.test = {
    driver     : 'postgres',
    host       : 'localhost',
    port       : '5432',
    username   : 'test',
    password   : 'test',
    database   : 'test',
    autoReconnect : true
};

module.exports.dev = module.exports.development;