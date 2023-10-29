module.exports = function(app,banco){

    const JwtToken = require('../Model/JwtToken')
    const Alunos = require("../Model/Alunos")
    app.post('/loginaluno',(request,response) =>{
        console.log("rota: POST: /login")
            const matricula = request.body.matricula
            const senha = request.body.senha
    
            const Alunos = new Alunos(banco)
            Alunos.setmatricula(matricula)
            Alunos.setSenha(senha)
    
            Alunos.login().then((respostaLogin) => {
            if (respostaLogin.status == true) { 
                let usuario = {
                matricula: respostaLogin.matricula,
                nome: respostaLogin.nome
                }
                const jwt = new JwtToken()
                const novoToken = jwt.gerarToken(usuario)

                const resposta = {
                status: true,
                msg: "Login efetuado com sucesso",
                token: novoToken,
                Alunos: usuario
                }
    
                response.status(201).send(resposta)
            } else {
                const resposta = {
                status: false,
                msg: "Usuário não logado",
                codigo: 401,
                }
                response.send(resposta, 404)
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
    })

}
