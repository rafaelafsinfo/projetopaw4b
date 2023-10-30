module.exports = function(app,banco){

    const JwtToken = require('../Model/JwtToken')
    const Alunos = require("../Model/Alunos")
    app.post('/login/aluno',(request,response) =>{
        console.log("rota: POST: /login/aluno")
            const matricula = request.body.matricula
            const senha = request.body.senha
            const jwt = new JwtToken();
            if (matricula == null || senha == "") {
                //cria um objeto json de resposta.
                const resposta = {
                  status: false,
                  msg: 'matricula ou senha não podem ser vazios',
                  codigo: '001',
                  dados: "{}",
                }
                //envia a resposta para o cliente
                //http code = 200
                response.status(200).send(resposta);
          
              }else{

                const Aluno = new Alunos(banco)
                Aluno.setMatricula(matricula)
                Aluno.setSenha(senha)
                
    
                Aluno.login().then((respostaLogin) => {
                if (respostaLogin.status == true) { 
                    const usuario = {
                        matricula: respostaLogin.matricula,
                        nome: respostaLogin.nome,
                        email: respostaLogin.email, 
                        wpp: respostaLogin.wpp
                      }
            
                    const jwt = new JwtToken()
                    const novoToken = jwt.gerarToken(usuario)

                    const resposta = {
                    status: true,
                    msg: "Login efetuado com sucesso",
                    token: novoToken,
                    Aluno: usuario
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
        }
    })
    const Professor = require("../Model/Professor")
    app.post('/login/professor',(request,response) =>{
        console.log("rota: POST: /login/aluno")
            const Registro = request.body.registro
            const senha = request.body.senha
            const jwt = new JwtToken();
            if (Registro == null || senha == "") {
                //cria um objeto json de resposta.
                const resposta = {
                  status: false,
                  msg: 'Registro ou senha não podem ser vazios',
                  codigo: '001',
                  dados: "{}" 
                  //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
                }
                //envia a resposta para o cliente
                //http code = 200
                response.status(200).send(resposta);
          
              }else{

                const professor = new Professor(banco)
                professor.setRegistro(Registro)
                professor.setSenha(senha)
                
    
                professor.login().then((respostaLogin) => {
                if (respostaLogin.status == true) { 
                    const usuario = {
                        Registro: respostaLogin.Registro,
                        nome: respostaLogin.nome,
                        email: respostaLogin.email, 
                        wpp: respostaLogin.wpp
                      }
            
                    const jwt = new JwtToken()
                    const novoToken = jwt.gerarToken(usuario)

                    const resposta = {
                    status: true,
                    msg: "Login efetuado com sucesso",
                    token: novoToken,
                    professor: usuario
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
        }
    })
}
