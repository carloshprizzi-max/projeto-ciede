const router = require("express").Router();
const controller = require("../controllers/mensagemController");

router.post("/contato", controller.criar);
router.get("/mensagens", controller.listar);
router.delete("/mensagens/:id", controller.deletar);

module.exports = router;
