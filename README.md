# 📦 Orders API

API REST para gerenciamento de pedidos desenvolvida com **Node.js**, **Express** e **MongoDB**.

A aplicação permite criar, listar, consultar, atualizar e remover pedidos.  
O valor total do pedido é calculado automaticamente com base nos itens enviados.

A API também possui autenticação básica utilizando JWT para proteger rotas.

---

# 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- JavaScript

---

# 📂 Estrutura do Projeto

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

---

# ⚙️ Instalação

Clone o repositório:

    git clone https://github.com/samuelsavioo/order-api.git

Entre na pasta do projeto:

    cd order-api

Instale as dependências:

    npm install

---

# 🔌 Configuração do Banco de Dados

Certifique-se de que o MongoDB esteja rodando localmente ou utilize MongoDB Atlas.

Exemplo de string de conexão:

`mongodb://localhost:27017/order`

---

# ▶️ Executando o Projeto

Para iniciar o servidor:

    npm run dev

ou

    node server.js

A aplicação iniciará em:

`http://localhost:3000`

---

# 📬 Endpoints da API

## Criar Pedido

Endpoint:

`POST api-v1/order`

Exemplo de body:

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

---

# 📄 Listar Pedidos (Paginação)

Endpoint:

`GET api-v1/order?page=1&limit=10`

Parâmetros:

- page → número da página
- limit → quantidade de registros por página

Exemplo de resposta:

    {
      "total": 25,
      "page": 1,
      "totalPages": 3,
      "data": []
    }

---

# 🔍 Buscar Pedido por ID

Endpoint:

`GET api-v1/order/:id`

Exemplo:

`GET api-v1/order/12345`

---

# ✏️ Atualizar Pedido

Endpoint:

`PUT api-v1/order/:id`

Exemplo de body:

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

---

# 🗑️ Remover Pedido

Endpoint:

`DELETE /api-v1/order/:id`

Resposta:

    {
      "message": "Pedido removido com sucesso"
    }

---

# 🔐 Autenticação

A API utiliza autenticação baseada em JWT (JSON Web Token).

**Login**
Endpoint:

`POST /login`

Body:

    {
      "username": "admin",
      "password": "123456"
    }

Resposta:

    {
      "token": "jwt_token_aqui"
    }

Para acessar rotas protegidas, envie o token no header:

`Authorization: Bearer seu_token_aqui`

---

# 📊 Regras de Negócio

- O valor total do pedido é calculado automaticamente
- Cada pedido possui uma lista de itens
- Cada item contém:
  - productId
  - quantity
  - price
- A listagem suporta paginação

---

# 📌 Melhorias Futuras

- Validação de dados com Joi ou Zod
- Documentação com Swagger
- Testes automatizados
- Filtros e ordenação na listagem

---

# 👨‍💻 Autor

Desenvolvido por **Samuel**
