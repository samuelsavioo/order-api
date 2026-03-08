// Importa o framework Express
const express = require("express");


// Cria um roteador do Express. Ele funciona como um "mini-aplicativo"
const router = express.Router();

// Importa o Controller que contém a lógica do negócio
const orderController = require("../controllers/OrderController");

// Rota POST: Usada para CRIAR (salvar) um novo pedido no banco.
router.post("/orders", orderController.createOrder);

// Rota GET: Usada para LISTAR os pedidos (aqui funciona a paginação).
router.get("/orders", orderController.getOrders);

// Rota GET (com parâmetro dinâmico): Usada para BUSCAR um pedido específico.
router.get("/orders/:id", orderController.getOrderById);

// Rota DELETE: Usada para REMOVER um pedido específico pelo ID.
router.delete("/orders/:id", orderController.deleteOrder);
// Rota PUT: Usada para ATUALIZAR os dados de um pedido existente pelo ID.
router.put("/orders/:id", orderController.updateOrder);


// Exporta este roteador configurado para que ele possa ser "plugado" 
// no arquivo principal da sua aplicação
module.exports = router;