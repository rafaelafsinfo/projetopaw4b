module.exports = function(app,banco){
    const Funcionario = require("../modelo/Funcionario");
    const JwtToken = require('../modelo/JwtToken');
    const Cargo = require('../modelo/Cargo');
    app.post('/login', (request, response) => {
        console.log("rota: POST: /login");

        const email = request.body.email;
        const senha = request.body.senha;

        const funcionario = new Funcionario(banco);
        funcionario.setEmail(email);
        funcionario.setSenha(senha);

        funcionario.login().then((respostaLogin) => {
        if (respostaLogin.status == true) {
            let usuario = {
            email: respostaLogin.email,
            nome: respostaLogin.nome
            }
            const jwt = new JwtToken();
            const novoToken = jwt.gerarToken(usuario);

            const resposta = {
            status: true,
            msg: "Login efetuado com sucesso",
            token: novoToken,
            funcionario: usuario
            }

            response.status(201).send(resposta);
        } else {
            const resposta = {
            status: false,
            msg: "Usuário não logado",
            codigo: 401,
            }
            response.send(resposta, 404);
        }

        }).catch((erro) => {
        const resposta = {
            status: false,
            msg: 'erro ao executar',
            codigo: '005',
            dados: erro,
        }



        response.status(201).send(erro);
        });
        // return next(e);
        // response.status(201).send("erro");
    });

}