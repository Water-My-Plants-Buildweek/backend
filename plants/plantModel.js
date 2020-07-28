const db = require("../database/dbConfig")

module.exports = {
  findById,
  add,
  update,
  remove,
  find,
}

function find() {
  return db('plants')
}
function findById(id) {
  return db("plants").where({ id }).first()
}

function add(plant) {
  return db("plants").insert(plant)
}
function update(change, id) {
  return db("plants").where({ id }).update(change)
}
function remove(id) {
  return db("plants").where({ id }).del()
}
