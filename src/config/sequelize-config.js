module.exports = {
    development: {
        logging: false,
        username: 'admin',
        password: 'admin',
        database: 'tembii',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
        operatorAliases: false,
        pool: {
            max: 10,
            min: 0
        }
    },
    test: {},
    production: {}
}
