const router = require("express").Router();
const controller = require("../controllers/eventoController");
const auth = require("../middlewares/authMiddleware");

// Rota pública: Permite que o site principal puxe a lista de eventos depois
router.get("/eventos", controller.listar);

// Rotas protegidas (Apenas o Admin pode criar/deletar)
router.post("/eventos", auth, controller.criar);
router.delete("/eventos/:id", auth, controller.deletar);

module.exports = router;