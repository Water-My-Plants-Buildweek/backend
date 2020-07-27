const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  const users = [
    {
      username: "Liam",
      password: bcrypt.hashSync("thisIsOurSecret", 10),
    },
    {
      username: "Andrew",
      password: bcrypt.hashSync("thisIsOurSecret", 10),
    },
    {
      username: "Admin",
      password: bcrypt.hashSync("thisIsOurSecret", 10),
    },
  ];
  return knex("users").insert(users);
};
