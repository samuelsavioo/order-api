const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json(401).json({
            error: "Token não fornecido"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Armazena os dados do usuário decodificados no objeto de requisição para uso posterior
        next(); // Continua para o próximo middleware ou rota
    } catch (error) {
        return res.status(401).json({
            error: "Token inválido"
        });
    }
}