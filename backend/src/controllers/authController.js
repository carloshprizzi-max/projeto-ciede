const authService = require("../services/authService");

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const token = await authService.login(email, senha);

    res.json({ token });
  } catch (err) {
    res.status(401).json({ erro: err.message });
  }
};
