exports.up = knex => knex.schema.createTable("movieTags", table => {
    table.increments("id");
    table.integer("movieNotes_id").references("id").inTable("movieNotes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.text("name").notNullable();    
});

exports.down = knex => knex.schema.dropTable("movieTags");