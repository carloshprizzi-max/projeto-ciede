const model = require("./src/models/mensagemModel");

exports.criar = async (nome, email, mensagem) => {
  if (!nome || !email || !mensagem) {
    throw new Error("Dados obrigatórios");
  }

  return await model.create(nome, email, mensagem);
};

exports.listar = async () => {
  return await model.getAll();
};

exports.deletar = async (id) => {
  return await model.deleteById(id);
};
