const sqlite3 = require('sqlite3').verbose();
// O caminho do seu arquivo pode estar um pouco diferente
const db = new sqlite3.Database('./database.sqlite'); 

// Adicione este bloco para garantir que a tabela sempre exista
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
          console.error("Erro ao criar a tabela de mensagens:", err.message);
      } else {
          console.log("Tabela 'mensagens' verificada/criada com sucesso.");
      }
  });
});

module.exports = db;
