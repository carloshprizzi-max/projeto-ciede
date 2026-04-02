const db = require('../database/database');

exports.getAll = () => {
  return new Promise((resolve, reject) => {
     db.all(
     `
      SELECT id, nome, email, mensagem, data
      FROM mensagens
      ORDER BY data DESC
     `,
     [],
     (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

exports.deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM mensagens WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
};

exports.create = (nome, email, mensagem) => {
  return new Promise((resolve, reject) => {
    // Insere os dados na tabela e usa os '?' para evitar SQL Injection
    db.run(
      "INSERT INTO mensagens (nome, email, mensagem) VALUES (?, ?, ?)", 
      [nome, email, mensagem], 
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID); // Devolve o ID da mensagem criada
      }
    );
  });
};