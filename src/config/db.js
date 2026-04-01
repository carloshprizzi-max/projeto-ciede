const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.sqlite", (err) => {
  if (err) console.error(err);
});

module.exports = db;
