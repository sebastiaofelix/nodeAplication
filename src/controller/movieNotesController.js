const knex = require("../database/knex")

class MovieNotesController{
    async create(request, response){
        const { title, description, rating } = request.body;
        const { user_id } = request.params;

        
    }
}