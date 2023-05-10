const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function sqlConnection(){
    const database = await sqlite.open({
        //filename: path.resolve(__dirname, "..", "database.db") 
    })
}
