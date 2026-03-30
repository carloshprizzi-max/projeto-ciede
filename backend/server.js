const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();
const path = require("path");

// node vai servir o frontend tambem
app.use(express.static(path.join(__dirname, "../frontend")));

// permitir comunicação com frontend
app.use(cors());

// permitir JSON
app.use(express.json());

// ROTA DE TESTE
// app.get("/", (req, res) => {
//   res.send("Servidor rodando 🚀");
// });
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ROTA DO FORMULÁRIO
app.post("/contato", (req, res) => {
  console.log(req.body);
  const { nome, email, mensagem } = req.body;

  const sql = `
    INSERT INTO mensagens (nome, email, mensagem)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [nome, email, mensagem], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao salvar" });
    }

    res.json({ mensagem: "Mensagem salva com sucesso!" });
  });
});

// PÁGINA P/ VER AS MENSAGENS
app.get("/mensagens", (req, res) => {
  const senha = req.query.senha;

  const SENHA = "1234";

if (senha !== SENHA) {
    return res.status(403).send("Acesso negado");
  }

  db.all("SELECT * FROM mensagens ORDER BY data DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json(rows);
  });
});

// EXCLUIR MENSAGEM
app.delete("/mensagens/:id", (req, res) => {
  const { id } = req.params;
  const senha = req.query.senha;

  console.log("Tentando excluir ID:", id);
  console.log("Senha:", senha);

  if (senha !== "1234") {
    return res.status(403).send("Acesso negado");
  }

  db.run("DELETE FROM mensagens WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Erro ao deletar:", err);
      return res.status(500).json({ erro: err.message });
    }

    console.log("Linhas afetadas:", this.changes);

    res.json({ mensagem: "Mensagem excluída" });
  });
});

// iniciar servidor
// app.listen(3000, () => {
//   console.log("Servidor rodando em http://localhost:3000");
// });
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando...");
});

