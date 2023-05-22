const knex = require("../database/knex")

class MovieNotesController{
    async create(request, response){
        const { title, description, rating, movieTags } = request.body;
        const { user_id } = request.params;

        const [movieNotes_id] = await knex("movieNotes").insert({
            title,
            description,
            rating,
            user_id
        });

        const movieTagsInsert = movieTags.map( name => {
            return {
                movieNotes_id,
                name,
                user_id
            }
        });

        await knex("movieTags").insert(movieTagsInsert);

        response.json();
    }

    async show(request, response){
        const { id } = request.params;

        const note = await knex("movieNotes").where({ id }).first();
        const tags = await knex("movieTags").where({ movieNotes_id: id }).orderBy("name");

        return response.json({
            ...note,
            tags
        });
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("movieNotes").where({ id }).delete();

        return response.json();
    }

    async index(request, response){
        const { title, user_id, movieTags } = request.query;

        let movieNotes;

        if (movieTags){
            const filterTags = movieTags.split(',').map(tag => tag.trim());

            notes = await knex("movieTags")
            .select([
                "movieNotes.id",
                "movieNotes.title",
                "movieNotes.user_id",
            ])
            .where("movieNotes.user_id", user_id)
            .whereLike("movieNotes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("movieNotes", "movieNotes.id", "movieTags.movieNotes_id")
            .orderBy("movieNotes.title");
        } else {
            movieNotes = await knex("movieNotes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        const userTags = await knex("movieTags").where({ user_id });
        const notesWithTags = movieNotes.map(note => {
            const noteTags = userTags.filter(tag => tag.movieNotes_id === note.id);

            return {
                ...note,
                movieTags: noteTags
            }
        });

        return response.json(notesWithTags);
    }
}

module.exports = MovieNotesController;