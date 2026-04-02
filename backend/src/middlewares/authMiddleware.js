require("dotenv").config();
const jwt = require("jsonwebtoken");
const env = require("../config/env");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN:", token);
  console.log("SECRET:", env.jwtSecret);

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    console.log("DECODED:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("ERRO JWT:", err.message);
    return res.status(403).json({ erro: "Token inválido" });
  }
};
