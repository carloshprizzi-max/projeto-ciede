const router = require("express").Router();
const controller = require("./src/controllers/mensagemController");

router.post("/contato", controller.criar);
router.get("/mensagens", controller.listar);
router.delete("/mensagens/:id", controller.deletar);

module.exports = router;
