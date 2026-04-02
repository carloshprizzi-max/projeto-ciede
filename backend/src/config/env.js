require("dotenv").config();

console.log("JWT_SECRET carregado:", process.env.JWT_SECRET);

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD
};
