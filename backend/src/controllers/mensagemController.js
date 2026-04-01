const service = require("../services/mensagemService");

exports.criar = async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;

    await service.criar(nome, email, mensagem);

    res.json({ mensagem: "Mensagem salva com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const senha = req.query.senha;

    if (senha !== "1234") {
      return res.status(403).send("Acesso negado");
    }

    const dados = await service.listar();
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await service.deletar(id);

    res.json({ mensagem: "Mensagem excluída" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
