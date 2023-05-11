const sqliteConnection = require("../database/sqlite");

class UserController {
    async create(request, response){
        const { name, email, password } = request.body

        const database = await sqliteConnection();

        await database.run(
            "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
            [name, email, password]);

    return response.json();
            
    }
}

module.exports = UserController