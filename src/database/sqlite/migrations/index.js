const { error } = require('console');
const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUser');

async function migrationsRun(){
     const schemas = [
        createUsers
     ].join('');

     sqliteConnection()
     .then(db => db.exec(schemas))
     .catch(error => console.log(error));
}

module.exports = migrationsRun;