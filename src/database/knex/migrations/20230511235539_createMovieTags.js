exports.up = knex => knex.schema.createTable("movieTags", table => {
    table.increments("id");
    table.integer("movieNotes_id").references("id").inTable("movieNotes").onDelete("CASCADE");
    table.integer("createUser_id").references("id").inTable("user");
    table.text("name");    
});

exports.down = knex => knex.schema.dropTable("movieTags");