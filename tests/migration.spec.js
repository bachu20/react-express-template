const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');
const execFile = Promise.promisify(require('child_process').execFile);
const expect = require('chai').expect;

const { config, db: { sequelize } } = require('../src')
const sequelizeConfig = config.sequelizeConfig.development;

describe('testing sequelize migration scripts', function () {
    const dbScript = path.resolve('bin', 'db.sh');
    const syncFile = path.resolve('tests', 'migration.sync.dump.sql');
    const dumpFile = path.resolve('tests', 'migration.actual.dump.sql');

    const writeFile = (sql, output) => new Promise((resolve, reject) => {
        fs.writeFile(output, sql, err => err ? reject(err) : resolve(true));
    });

    let sync, dump;
    it('pg_dump', function () {
        return Promise.resolve()
            // sync sequelize models and get dump
            .then(() => sequelize.sync({ force: true, logging: false }))
            .then(() => execFile(dbScript, [ 'db:dump', '--dbname', sequelizeConfig.database ]))
            .then(syncDump => writeFile(syncDump, syncFile))

            // undo changes
            .then(() => execFile(dbScript, [ 'db:reset' ]))

            // run sequelize migrations and get dump
            .then(() => execFile(dbScript, [ 'db:migrate' ]))
            .then(() => execFile(dbScript, [ 'db:dump', '--dbname', sequelizeConfig.database ]))
            .then(actualDump => writeFile(actualDump, dumpFile))
            .then(result => expect(result).to.be.true)

            // // undo changes
            .then(() => execFile(dbScript, [ 'db:reset' ]))

            // catch all errors
            .catch(err => { debugger; })
    });
});
