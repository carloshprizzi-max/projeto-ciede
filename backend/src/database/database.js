const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho absoluto para garantir que sempre será o MESMO arquivo
const dbPath = path.resolve(__dirname, '../../database.sqlite'); 
const db = new sqlite3.Database(dbPath);

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
          console.error("❌ Erro ao criar a tabela centralizada:", err.message);
      } else {
          console.log("✅ Conexão central: Tabela 'mensagens' 100% pronta!");
      }
  });
});
// Exporta a conexão para o resto do sistema usar
module.exports = db;