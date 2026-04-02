const jwt = require("jsonwebtoken");
const env = require("../config/env");

exports.login = async (email, senha) => {
  if (email !== env.adminEmail || senha !== env.adminPassword) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign(
    { email },
    env.jwtSecret,
    { expiresIn: "2h" }
  );

  return token;
};
