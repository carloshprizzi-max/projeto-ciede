const service = require("../services/eventoService");

exports.listar = async (req, res) => {
  try {
    const eventos = await service.listar();
    res.json(eventos);
  } catch (err) {
    console.error("Erro ao listar eventos:", err);
    res.status(500).json({ erro: "Erro interno ao buscar os eventos." });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, data, local } = req.body;
    
    await service.criar(nome, data, local);
    
    res.status(201).json({ mensagem: "Evento publicado com sucesso!" });
  } catch (err) {
    console.error("Erro ao criar evento:", err);
    
    // Devolve erro 400 se faltar dado (veio do Service), ou 500 se o banco falhar
    if (err.message.includes("obrigatórios")) {
      res.status(400).json({ erro: err.message });
    } else {
      res.status(500).json({ erro: "Erro interno ao publicar o evento." });
    }
  }
};

exports.deletar = async (req, res) => {
  try {
    const id = req.params.id;
    await service.deletar(id);
    
    res.json({ mensagem: "Evento excluído com sucesso." });
  } catch (err) {
    console.error("Erro ao excluir evento:", err);
    res.status(500).json({ erro: "Erro interno ao excluir o evento." });
  }
};