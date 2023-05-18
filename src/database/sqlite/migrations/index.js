const { error } = require("console");
const sqliteConnection = require("../../sqlite");
const createUsers = require('../../../database/knex/migrations/20230511164432_createUsers');

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.log(error));
}

module.exports = migrationsRun;