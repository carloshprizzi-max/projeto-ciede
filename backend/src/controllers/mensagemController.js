const service = require("../services/mensagemService");

exports.criar = async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;
    await service.criar(nome, email, mensagem);
    
    // Resposta de sucesso que o frontend espera ler
    res.status(201).json({ mensagem: "Mensagem enviada com sucesso!" }); 
  } catch (err) {
    // 👇 NOSSO ESPIÃO PARA DESCOBRIR O MOTIVO DO ERRO 500 👇
    console.error("💥 ERRO FATAL AO SALVAR MENSAGEM:", err);
    
    // Resposta de erro formatada para o frontend não dar "undefined"
    res.status(500).json({ erro: "Erro interno ao enviar a mensagem." });
  }
};

exports.listar = async (req, res) => {
  try {
    const dados = await service.listar();
    res.json(dados);
  } catch (err) {
    console.error("💥 ERRO FATAL AO LISTAR MENSAGENS:", err);
    
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