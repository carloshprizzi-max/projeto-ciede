const db = require('../database/database');

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM eventos ORDER BY data_evento ASC", [], (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  });
};

exports.create = (nome, data, local) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO eventos (nome, data_evento, local) VALUES (?, ?, ?)", [nome, data, local], function (err) {
      if (err) reject(err); else resolve(this.lastID);
    });
  });
};

exports.deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM eventos WHERE id = ?", [id], function (err) {
      if (err) reject(err); else resolve(this.changes);
    });
  });
};