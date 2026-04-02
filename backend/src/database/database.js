const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define o caminho do banco (ajuste se a sua pasta for diferente)
const dbPath = path.resolve(__dirname, 'database.sqlite'); 

// Inicia a conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Erro ao conectar no banco:", err.message);
    } else {
        console.log("✅ Conectado ao banco SQLite com sucesso.");
        
        // Cria a tabela se ela não existir!
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
                console.error("❌ Erro ao criar a tabela 'mensagens':", err.message);
            } else {
                console.log("✅ Tabela 'mensagens' verificada/criada e pronta para uso!");
            }
        });
    }
});

module.exports = db;