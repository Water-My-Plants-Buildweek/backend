const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update,
};

function find() {
  return db("users as u").where("u.username").orderBy("u.id");
}

function findBy(filter) {
  console.log("filter", filter);
  return db("users as u").where(filter);
}

async function add(users) {
  try {
    const [id] = await db("users").insert(users, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}

function remove(id) {
  return db("users").where({ id }).del();
}

// function update(requirements) {
//   return Boolean(requirements.username && requirements.password);
// }

function update(id, { username, password, phone }) {
  return db("users").where({ id }).update({ username, password, phone });
}

//testing
