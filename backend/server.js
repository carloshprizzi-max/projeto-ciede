const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// rotas
const mensagemRoutes = require("./src/routes/mensagemRoutes");
const authRoutes = require("./src/routes/authRoutes");
const eventoRoutes = require("./src/routes/eventoRoutes");


app.use("/", mensagemRoutes);
app.use("/auth", authRoutes);
app.use(eventoRoutes);

// start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando...");
});
