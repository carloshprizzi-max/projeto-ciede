const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = require("../config/env");

const gerarHash = async () => {
  return await bcrypt.hash(env.adminPassword, 10);
};

// vamos gerar hash uma vez
let hashedPassword;
gerarHash().then(hash => hashedPassword = hash);

exports.login = async (email, senha) => {
  if (email !== env.adminEmail) {
    throw new Error("Credenciais inválidas");
  }

  const senhaValida = await bcrypt.compare(senha, hashedPassword);

  if (!senhaValida) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign(
    { email },
    env.jwtSecret,
    { expiresIn: "2h" }
  );

  return token;
};
