const jwt = require("jsonwebtoken");

/**
 * Controller responsável pelo processo de autenticação.
 * Recebe usuário e senha e, se as credenciais forem válidas,
 * gera um token JWT que será utilizado para acessar as rotas protegidas da API.
 */
exports.login = (req, res) => {

    // Extrai as credenciais enviadas no corpo da requisição
    const { username, password } = req.body;

    // Validação simples de credenciais.
    // Em um sistema real isso seria consultado no banco de dados.
    if (username !== "admin" || password !== "123456") {
        return res.status(401).json({
            error: "Credenciais inválidas"
        });
    }

    // Geração do token JWT contendo informações do usuário autenticado.
    // O token é assinado usando a chave secreta definida nas variáveis de ambiente.
    const token = jwt.sign(
        { user: username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Define tempo de expiração do token
    );

    // Retorna o token para que o cliente possa utilizá-lo
    // no header Authorization das próximas requisições.
    return res.json({ token });

};