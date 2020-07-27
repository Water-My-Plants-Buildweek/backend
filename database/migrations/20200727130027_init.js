exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments();

      users.string("username", 255).notNullable().unique();

      users.string("password", 255).notNullable();

      users.string("phone-number", 10).unique();
    })

    .createTable("plants", (plants) => {
      plants.increments();

      plants.string("nickname", 255).notNullable();

      plants.string("species", 255).notNullable();

      plants.integer("water-frequency", 10).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("plants");
};
