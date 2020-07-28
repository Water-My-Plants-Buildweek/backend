const cleaner = require("knex-cleaner")

function cleanTables(knex) {
  return cleaner
    .clean(knex, {
      mode: "truncate",
      restartIdentity: true,
      ignoreTables: ["knex_migrations", "knex_migrations"],
    })
    .then(() =>
      console.log("<--- all tables truncated, ready for seeding --->")
    )
}

exports.seed = function (knex) {
  // Deletes ALL existing entries

  if (knex.client.config.client === "sqlite3") {
    return knex.raw("PRAGMA foreign_keys = OFF;I just ").then(() => cleanTables(knex))
  } else {
    return cleanTables(knex)
  }

  // return knex('table_name').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('table_name').insert([
  //       {id: 1, colName: 'rowValue1'},
  //       {id: 2, colName: 'rowValue2'},
  //       {id: 3, colName: 'rowValue3'}
  //     ]);
  //   });
}
