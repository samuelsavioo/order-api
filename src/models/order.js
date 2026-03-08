// Importa a conexão com o banco de dados MongoDB configurada no arquivo 'connection.js'.
const mongoose = require("../database/connection");

/**
 * SCHEMA DE ITENS (Sub-documento)
 * Define a estrutura de cada item individual que vai dentro do pedido.
 */
const ItemSchema = new mongoose.Schema({
    // ID do produto é obrigatório
    productId: { type: Number, required: true },
    
    // A quantidade é obrigatória e não pode ser menor que 1 
    quantity: { type: Number, required: true, min: 1 },
    
    // O preço é obrigatório e não pode ser negativo 
    price: { type: Number, required: true, min: 0 },
});

/**
 * SCHEMA DO PEDIDO PRINCIPAL
 * Define a estrutura geral do pedido que será salvo na coleção do MongoDB.
 */
const OrderSchema = new mongoose.Schema({
    // ID do pedido 
    orderId: { type: Number, required: true },
    
    // Valor total do pedido
    value: { type: Number, required: true },
    
    // Data de criação. O 'default: Date.now' preenche a data atual automaticamente se você não enviar.
    creationDate: { type: Date, default: Date.now },
    
    // Array de itens: Informa ao Mongoose que a chave 'items' vai receber 
    // uma lista de objetos que seguem as regras do 'ItemSchema' criado ali em cima
    items: [ItemSchema]
},
{
    // O Mongoose por padrão cria um campo '__v' para versionamento de documentos.
    // Colocar 'versionKey: false' desabilita a criação desse campo, deixando o banco mais limpo.
    versionKey: false
});

// Transforma o Schema em um Modelo executável e o exporta para ser usado em outras partes do código
module.exports = mongoose.model("Order", OrderSchema);