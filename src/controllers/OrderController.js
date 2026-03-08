const Order = require("../models/order");

/**
 * Cria um novo pedido no banco de dados.
 * Mapeia os dados recebidos na requisição (que parecem vir com chaves em português)
 * para o formato esperado pelo modelo do banco de dados.
 */
exports.createOrder = async (req, res) => {
    // Extrai os dados do corpo da requisição
    try {

        const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

        // Mapeia o array de itens, traduzindo os nomes das propriedades para o formato do Schema
        const mappedItems = items.map(item => ({
            productId: item.idItem,
            quantity: item.quantidadeItem,
            price: item.valorItem
        }));

        // Cria e salva o pedido no banco de dados
        const order = await Order.create({
            orderId: numeroPedido,
            value: valorTotal,
            creationDate: dataCriacao,
            items: mappedItems
        });

        // Retorna status 201 (Created) e os dados do pedido recém-criado
        return res.status(201).json(order);

    } catch (error) {
        // Retorna status 400 (Bad Request) em caso de erro de validação ou falha na criação
        return res.status(400).json({ error: error.message });
    }
};
/**
 * Retorna uma lista paginada de todos os pedidos.
 */
exports.getOrder = async (req, res) => {
    try {

        // Define a página e o limite de itens por página usando os parâmetros da URL (query)
        // Usa valores padrão (página 1, limite de 10) caso não sejam informados
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calcula quantos documentos devem ser "pulados" (skip) no banco para chegar à página atual
        const skip = (page - 1) * limit;

        // Busca os pedidos aplicando a paginação
        const order = await Order.find()
            .skip(skip)
            .limit(limit);

        // Conta o total absoluto de pedidos cadastrados no banco para calcular o total de páginas
        const total = await Order.countDocuments();

        // Retorna os dados envelopados com informações de paginação
        return res.json({
            total, // Total de itens no banco
            page, // Página atual
            totalPages: Math.ceil(total / limit), // Arredonda para cima para obter o total de páginas
            data: order // O array de pedidos da página atual
        });

    } catch (error) {
        // Retorna status 500 (Internal Server Error) em caso de falha no banco
        return res.status(500).json({ error: error.message });
    }
};
/**
 * Busca um pedido específico pelo seu ID customizado (orderId).
 */
exports.getOrderById = async (req, res) => {
    try {
        // Procura um pedido cujo campo 'orderId' seja igual ao parâmetro passado na URL
        const order = await Order.findOne({ orderId: req.params.id });

        // Se o pedido não existir, retorna erro 404 (Not Found)
        if (!order) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }
        // Se encontrar, retorna o pedido
        return res.json(order);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
/**
 * Remove um pedido do banco de dados pelo seu ID customizado (orderId).
 */
exports.deleteOrder = async (req, res) => {
    try {

        // Encontra o documento pelo 'orderId' e o deleta atomicamente
        const order = await Order.findOneAndDelete({ orderId: req.params.id });

        // Verifica se o pedido existia antes de tentar deletar
        if (!order) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }

        // Retorna uma mensagem de sucesso
        return res.json({ message: "Pedido removido com sucesso" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Atualiza os itens de um pedido existente e recalcula seu valor total.
 */
exports.updateOrder = async (req, res) => {
    try {
        // Extrai o novo array de itens do corpo da requisição
        const { items } = req.body;

        // Mapeia os itens recebidos para o formato esperado pelo Schema
        const mappedItems = items.map(item => ({
            productId: item.idItem,
            quantity: item.quantidadeItem,
            price: item.valorItem
        }));

        // Recalcula o valor total do pedido com base na quantidade e preço dos novos itens
        const totalValue = mappedItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        // Atualiza o documento no banco de dados
        const order = await Order.findOneAndUpdate(
            { orderId: req.params.id }, // Filtro: encontra pelo 'orderId' da URL
            {
                items: mappedItems, // Atualiza a lista de itens
                value: totalValue // Atualiza o valor total recalculado
            },
            { returnDocument: "after" } // Garante que a função retorne o documento *após* a atualização
        );

        // Se o pedido não foi encontrado para atualização, retorna 404
        if (!order) {
            return res.status(404).json({ error: "Pedido não encontrado" });
        }

        // Retorna o pedido atualizado
        return res.json(order);

    } catch (error) {
        // Retorna status 400 em caso de erro (ex: falha de validação do Mongoose)
        return res.status(400).json({ error: error.message });
    }
};

