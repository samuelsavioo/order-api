📦 Orders API

API REST para gerenciamento de pedidos desenvolvida com Node.js, Express e MongoDB.

A aplicação permite criar, listar, consultar, atualizar e remover pedidos, além de calcular automaticamente o valor total de cada pedido com base nos itens informados.

🚀 Tecnologias Utilizadas

Node.js

Express

MongoDB

Mongoose

JavaScript

📂 Estrutura do Projeto
src
 ├── controllers
 │   └── orderController.js
 ├── models
 │   └── order.js
 ├── routes
 │   └── orderRoutes.js
 ├── config
 │   └── db.js
 └── server.js
⚙️ Instalação

Clone o repositório:

git clone https://github.com/samuelsavioo/order-api.git

Entre na pasta do projeto:

cd orders-api

Instale as dependências:

npm install
🔌 Configuração do Banco de Dados

Certifique-se de que o MongoDB esteja rodando localmente ou utilize uma string de conexão do MongoDB Atlas.

Exemplo de conexão:

mongodb://localhost:27017/orders
▶️ Executando o Projeto
npm run dev

ou

node server.js

O servidor iniciará em:

http://localhost:3000
📬 Endpoints da API
Criar Pedido
POST /orders
Exemplo de Body
{
  "orderId": "12345",
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 10
    },
    {
      "productId": "2",
      "quantity": 1,
      "price": 20
    }
  ]
}

O valor total do pedido é calculado automaticamente pela API.

📄 Listar Pedidos (com Paginação)
GET /orders?page=1&limit=10
Parâmetros
Parâmetro	Descrição
page	número da página
limit	quantidade de registros por página
Exemplo de Resposta
{
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "data": []
}
🔍 Buscar Pedido por ID
GET /orders/:id

Exemplo:

GET /orders/12345
✏️ Atualizar Pedido
PUT /orders/:id
Exemplo de Body
{
  "items": [
    {
      "productId": "1",
      "quantity": 3,
      "price": 15
    }
  ]
}

O valor total do pedido será recalculado automaticamente.

🗑️ Remover Pedido
DELETE /orders/:id

Resposta:

{
  "message": "Pedido removido com sucesso"
}
📊 Regras de Negócio

O valor total do pedido é calculado automaticamente.

Cada pedido possui uma lista de itens.

Cada item contém:

productId

quantity

price

A listagem de pedidos suporta paginação.

📌 Melhorias Futuras

Validação de dados com Joi ou Zod

Autenticação com JWT

Documentação da API com Swagger

Testes automatizados

Filtros e ordenação na listagem de pedidos

👨‍💻 Autor

Desenvolvido por Samuel
