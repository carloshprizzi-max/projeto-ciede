const router = require("express").Router();
const controller = require("../controllers/mensagemController");
const auth = require("../middlewares/authMiddleware");

router.post("/contato", controller.criar);

// 🔐 protegidas
router.get("/mensagens", auth, controller.listar);
router.delete("/mensagens/:id", auth, controller.deletar);

module.exports = router;
