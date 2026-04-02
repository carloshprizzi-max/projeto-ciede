const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Aponta para a pasta principal do backend (subindo 2 níveis a partir de src/models)
const dbPath = path.resolve(__dirname, '../../database.sqlite'); 
const db = new sqlite3.Database(dbPath);

// Cria a tabela imediatamente assim que o Model for lido pelo Node.js
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS mensagens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      mensagem TEXT NOT NULL,
      data DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
      if (err) {
          console.error("❌ Erro ao criar a tabela no Model:", err.message);
      } else {
          console.log("✅ Tabela 'mensagens' blindada e criada via Model!");
      }
  });
});

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
