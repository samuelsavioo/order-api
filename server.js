require("dotenv").config();
const app = require("./src/app");

require("./src/database/connection");


// Define a porta onde o servidor vai rodar.
const PORT = process.env.PORT || 3000;

// Quando o servidor liga com sucesso, ele executa essa função e imprime no terminal
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});