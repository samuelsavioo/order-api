// Importa a biblioteca Mongoose
// para modelar os dados da sua aplicação para o MongoDB.
const mongoose = require("mongoose");

//Inicia a conexão com o banco de dados MongoDB.
mongoose.connect(process.env.DATABASE_URL);

// Armazena a instância da conexão atual em uma variável para facilitar 
// a escuta de eventos (como sucesso ou falha na conexão).
const db = mongoose.connection;

// Escuta o evento de "error". 
// Se a conexão cair ou falhar ao iniciar, ele imprime o erro no console.
// O ".bind" garante que o erro seja repassado corretamente para o console.error.
db.on("error", console.error.bind(console, "Erro na conexão com MongoDB"));

// Exporta o mongoose já configurado e conectado. 
// Assim, quando você importar o mongoose nos seus Models (como o order.js), 
// ele já vai usar essa mesma conexão ativa.
db.once("open", function () {
    console.log("Conectado ao MongoDB com sucesso");
});

module.exports = mongoose;