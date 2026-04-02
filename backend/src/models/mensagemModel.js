const db = require("../config/db");

exports.create = (nome, email, mensagem) => {
  const sql = `
    INSERT INTO mensagens (nome, email, mensagem)
    VALUES (?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.run(sql, [nome, email, mensagem], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    //  db.all(
    //  `
    //   SELECT id, nome, email, mensagem, data_envio as data
    //   FROM mensagens
    //   ORDER BY data_envio DESC
    //  `,
    //  [],
    //  (err, rows) => {
    //     if (err) reject(err);
    //     else resolve(rows);
    //   }
    // );
    db.all(
  "SELECT * FROM mensagens ORDER BY id DESC",
  [],
  (err, rows) => {
    if (err) {
      console.error("ERRO SQL:", err.message);
      reject(err);
    } else {
      resolve(rows);
    }
  }
);
  });
}

exports.deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM mensagens WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
};
