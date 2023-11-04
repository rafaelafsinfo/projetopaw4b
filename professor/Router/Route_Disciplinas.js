module.exports = function (app, banco) {

  const Disciplinas = require("../Model/Disciplinas");
  const JwtToken = require('../../login/Model/JwtToken');
  
  /*************************************************************************************************************************** */
  //create
  app.post('/professores/disciplina', (request, response) => {


    //imprime no console do terminal
    //útil para debug
    console.log("rota => POST: /professor/disciplina");

    const dadosAutorizacao = request.headers.authorization;
    
    const jwt = new JwtToken();
    
    const validarToken = jwt.validarToken(dadosAutorizacao);
    
    if (validarToken.status == true) {

      const idDisciplina = request.body.idDisciplina
      const nome = request.body.nome
      const Professor_registro = request.body.Professor_registro
      const Turma_idTurma = request.body.Turma_idTurma
      
      if (nome == "") {
        
        const resposta = {
          status: true,
          msg: 'o nome não pode ser vazio',
          codigo: '001',
          dados: "{}",
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta);
      }else if  (Professor_registro == null) {
        const resposta = {
          status: true,
          msg: 'o Professor_registro não pode ser vazio',
          codigo: '001',
          dados: "{}",
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (Turma_idTurma == null){
        const resposta = {
          status: true,
          msg: 'o id da turma não pode ser vazio',
          codigo: '001',
          dados: "{}",
        }

        response.status(200).send(resposta)
      } else {
        const disciplinas = new Disciplinas(banco)

        disciplinas.setIdDisciplina(idDisciplina)
        disciplinas.setNome(nome)
        disciplinas.setProfessor(Professor_registro)
        disciplinas.setTurma(Turma_idTurma)
        
        disciplinas.create().then((resultadosBanco) => {
          //monta um objeto json de resposta com os dados do novo funcionário cadastrado
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '002',
            dados: {
              idDisciplina: resultadosBanco.idDisciplina,
              nome: disciplinas.getNome(),
              professor: disciplinas.getProfessor().registro,
              turma: disciplinas.getTurma().idTurma
            }
          }
          response.status(200).send(resposta);
        }).catch((erro) => {
          console.error('Error retrieving users:', erro);
        });;
      }
    } else {
      //token inválido
      //monta um objeto json para resposta
      const resposta = {
        status: false,
        msg: 'Usuário não logado',
        codigo: 401,
        dados: {},
        token: "" //como o token não foi valido, é enviado para o cliente um token vazio e ele perte a autorização de acesso ao sistema
      }
      //envia o objeto json como resposta para o cliente
      response.status(200).send(resposta);
    }
  });

  app.get('/professores/disciplina', function (request, response) {
    console.log("rota: GET: /professores/disciplina");

    //recupera o 'Bearer <' + TOKEN + '>' enviado pelo cliente
    const dadosAutorizacao = request.headers.authorization;
    //cria um objeto da classe JwtToken
    const jwt = new JwtToken();

    //verifica se o token enviado pelo cliente é válido
    const validarToken = jwt.validarToken(dadosAutorizacao);

    //entra no if se a validação do token é verdadeira
    //se a validação do token é verdadeira a propriedade validarToken.dados, 
    //possui dados do cliente no formato: {"email":"","nome":"","idFuncionario":"","idCargo":"","nomeCargo":""}
    //esses dados serão utilizados para gerar um novo token com a data de validade maior que a anterior.
    //toda vez que o token do cliente é validado é gerado um novo token mais novo na resposta da requisicao.
    if (validarToken.status == true) {
      //passando pela validação do token o código abaixo é executado.

      //é criado um objeto de funcionario..
      //para o objeto é passado o pool de conexoes com o banco
      const disciplina = new Disciplinas(banco);


      //chama o método read() da classe Funcionario...
      //esse método executa uma instrução sql no banco.
      //then then() é executado se funcionario.read() retorna um resolve da promise
      //caso contrário é executado um reject e cai no catch()
      disciplina.read().then((resultadosBanco) => {

        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          dados: resultadosBanco,
          codigo: '003',
        };
        //envia a resposta para o cliente
        response.status(200).send(resposta);
      }).catch((erro) => {

        //só é executado caso aconteça algum problema no select dos funcionarios
        //monta um objeto json de respota
        const resposta = {
          status: false,
          codigo: '004',
          msg: 'erro ao executar',
          dados: erro
        };
        console.log(erro)
        //envia uma respota para o cliente
        response.status(200).send(resposta)

      });;
    } else {
      //token inválido
      //monta um objeto json para resposta
      const resposta = {
        status: false,
        msg: 'Usuário não logado',
        codigo: 401,
        dados: {},
        token: "" //como o token não foi valido, é enviado para o cliente um token vazio e ele perte a autorização de acesso ao sistema
      }
      //envia o objeto json como resposta para o cliente
      response.status(200).send(resposta);
    }
  });

  app.get('/professores/disciplina/:id', (request, response) => {

    console.log("GET: /professores/disciplina:id");
    //recupera o 'Bearer <' + TOKEN + '>' enviado pelo cliente
    const dadosAutorizacao = request.headers.authorization;
    //cria um objeto da classe JwtToken
    const jwt = new JwtToken();
    //verifica se o token enviado pelo cliente é válido
    const validarToken = jwt.validarToken(dadosAutorizacao);
    //entra no if se a validação do token é verdadeira
    //se a validação do token é verdadeira a propriedade validarToken.dados, 
    //possui dados do cliente no formato: {"email":"","nome":"","idFuncionario":"","idCargo":"","nomeCargo":""}
    //esses dados serão utilizados para gerar um novo token com a data de validade maior que a anterior.
    //toda vez que o token do cliente é validado é gerado um novo token mais novo na resposta da requisicao.
    if (validarToken.status == true) {

      //recupera o id que foi enviado na uri.
      //perceba que quando é enviado pelo uri é necessário
      //utilizar o  (request.params) e não o (request.body)

      const id = request.params.id;

      const disciplina = new Disciplinas(banco);

      disciplina.setIdDisciplina(id);
      disciplina.read(id).then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'executado com sucesso',
          dados: resultadosBanco,
        };
        response.status(200).send(resposta);
      }).catch((erro) => {

        const resposta = {
          status: false,
          msg: 'erro ao executar',
          codigo: '005',
          dados: erro,
        }
        response.status(200).send(resposta);

      });;
    } else {
     
      const resposta = {
        status: false,
        msg: 'Usuário não logado',
        codigo: 401,
        dados: {},
        token: ""
      }
     
      response.status(200).send(resposta);

    }
  });

  app.put('/professores/disciplina/:id', (request, response) => {
    console.log("rota: PUT: /professores/disciplina");

    //recupera o 'Bearer <' + TOKEN + '>' enviado pelo cliente
    const dadosAutorizacao = request.headers.authorization;
    //cria um objeto da classe JwtToken
    const jwt = new JwtToken();

    //verifica se o token enviado pelo cliente é válido
    const validarToken = jwt.validarToken(dadosAutorizacao);

    
    if (validarToken.status == true) {
      const idDisciplina = request.body.idDisciplina
      const nome = request.body.nome
      const Professor_registro = request.body.Professor_registro
      const Turma_idTurma = request.body.Turma_idTurma
      
      if (nome == "") {
        
        const resposta = {
          status: true,
          msg: 'o nome não pode ser vazio',
          codigo: '001',
          dados: "{}",
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta);
      } else if (idDisciplina == null) {
        const resposta = {
          status: true,
          msg: 'o idDisciplina não pode ser vazio',
          codigo: '001',
          dados: "{}",
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if  (Professor_registro == null) {
        const resposta = {
          status: true,
          msg: 'o Professor_registro não pode ser vazio',
          codigo: '001',
          dados: "{}",
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (Turma_idTurma == null){
        const resposta = {
          status: true,
          msg: 'o id da turma não pode ser vazio',
          codigo: '001',
          dados: "{}",
        }

        response.status(200).send(resposta)
      } else {
        const disciplinas = new Disciplinas(banco)

        disciplinas.setIdDisciplina(idDisciplina)
        disciplinas.setNome(nome)
        disciplinas.setProfessor(Professor_registro)
        disciplinas.setTurma(Turma_idTurma)


        disciplinas.update().then((resultadosBanco) => {
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '007',
            dados: {
              idDisciplina: resultadosBanco.idDisciplina,
              nome: disciplinas.getNome(),
              professor: disciplinas.getProfessor().registro,
              turma: disciplinas.getTurma().idTurma
              
            },
          }
          response.status(200).send(resposta);
        }).catch((erro) => {
          const resposta = {
            status: false,
            msg: 'erro ao executar',
            codigo: '010',
            dados: erro,
          }
          console.log(erro)
          response.status(200).send(resposta);
        });;
      }
    } else {
      
      const resposta = {
        status: false,
        msg: 'Usuário não logado',
        codigo: 401,
        dados: {},
        token: "" //como o token não foi valido, é enviado para o cliente um token vazio e ele perte a autorização de acesso ao sistema
      }
      //envia o objeto json como resposta para o cliente
      response.status(200).send(resposta);
    }
  });

  app.delete('/professores/disciplina/:id', (request, response) => {

    console.log("rota: DELETE: /professores/disciplina/:id");

    //recupera o 'Bearer <' + TOKEN + '>' enviado pelo cliente
    const dadosAutorizacao = request.headers.authorization;
    //cria um objeto da classe JwtToken
    const jwt = new JwtToken();

    //verifica se o token enviado pelo cliente é válido
    const validarToken = jwt.validarToken(dadosAutorizacao);
    //entra no if se a validação do token é verdadeira
    //se a validação do token é verdadeira a propriedade validarToken.dados, 
    //possui dados do cliente no formato: {"email":"","nome":"","idFuncionario":"","idCargo":"","nomeCargo":""}
    //esses dados serão utilizados para gerar um novo token com a data de validade maior que a anterior.
    //toda vez que o token do cliente é validado é gerado um novo token mais novo na resposta da requisicao.
    if (validarToken.status == true) {


      //recupera o id que foi enviado na uri.
      //perceba que quando é enviado pelo uri é necessário
      //utilizar o  (request.params) e não o (request.body)
      const id = request.params.id

      const disciplinas = new Disciplinas(banco);
      disciplinas.setIdDisciplina(id);

      disciplinas.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '008',
          dados: {
            matricula: disciplinas.getIdDisciplina(),
          },
        }
        response.status(200).send(resposta);
      }).catch((erro) => {
        const resposta = {
          status: false,
          msg: 'erro ao executar',
          codigo: '009',
          dados: erro,
         }
         console.log(erro)
        response.status(200).send(resposta);
      });
    } else {
      //token inválido
      //monta um objeto json para resposta
      const resposta = {
        status: false,
        msg: 'Usuário não logado',
        codigo: 401,
        dados: {},
        token: "" //como o token não foi valido, é enviado para o cliente um token vazio e ele perte a autorização de acesso ao sistema
      }
      //envia o objeto json como resposta para o cliente
      response.status(200).send(resposta);

    }
  });
};
