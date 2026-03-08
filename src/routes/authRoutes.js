const express = require("express");

const router = express.Router();

// Controller responsável pela lógica de autenticação
const authController = require("../controllers/AuthController");

/**
 * Rota de autenticação da API.
 * Recebe username e password e retorna um token JWT caso as credenciais sejam válidas.
 */
router.post("/login", authController.login);

module.exports = router;