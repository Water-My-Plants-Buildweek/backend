const knex = require("knex");
const environment = process.env.DB_ENV || "development";
const knexfile = require("../knexfile");
module.exports = knex(knexfile[environment]);
