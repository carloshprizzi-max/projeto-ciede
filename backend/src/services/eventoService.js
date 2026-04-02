const model = require("../models/eventoModel");

exports.listar = async () => {
  return await model.getAll();
};

exports.criar = async (nome, data, local) => {
  // Regra de negócio: Validação estrita
  if (!nome || !data || !local) {
    throw new Error("Todos os campos (nome, data e local) são obrigatórios.");
  }

  return await model.create(nome, data, local);
};

exports.deletar = async (id) => {
  return await model.deleteById(id);
};