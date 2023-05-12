const sqliteConnection = require("../database/sqlite");

class UserController {
    async create(request, response){
        const { name, email, password } = request.body

        const database = await sqliteConnection();
        const checkUserExist = await database.get("SELECT * FROM user WHERE email = (?)", [email]);

        if(checkUserExist){
            throw new AppError("E-mail cadastrado");
        }
        
        await database.run(
            "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
            [name, email, password]);

    return response.status(201).json();
            
    }
}

module.exports = UserController