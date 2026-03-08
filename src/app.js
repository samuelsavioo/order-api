const express = require("express");
const app = express();


// Permite que a API leia o req.body em formato JSON!
app.use(express.json());

// Importa o arquivo de rotas
const orderRoutes = require("./routes/orderRoutes");

// Aplica o prefixo "/api/v1" de uma vez só para TODAS as rotas
app.use("/api-v1", orderRoutes);

// Exporta o 'app' configurado para o server.js poder ligá-lo
module.exports = app;