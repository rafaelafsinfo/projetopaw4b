
//app e banco são recebidos quando fazemos a chamada
// de rotas_funcionarios no arquivo app.js
module.exports = function (app, banco) {

  const Professores = require("../Model/Professores");
  const JwtToken = require('../../login/Model/JwtToken');
  
  /*************************************************************************************************************************** */
  //create
  app.post('/professores/professores', (request, response) => {


    //imprime no console do terminal
    //útil para debug
    console.log("rota => POST: /professor/aluno");

    const dadosAutorizacao = request.headers.authorization;
    
    const jwt = new JwtToken();
    
    const validarToken = jwt.validarToken(dadosAutorizacao);
    
    if (validarToken.status == true) {

      const registro = request.body.registro
      const nome = request.body.nome
      const email = request.body.email
      const senha = request.body.senha
      const tipo = request.body.tipo

      
      if (nome == "") {
        
        const resposta = {
          status: true,
          msg: 'o nome não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta);
      } else if (email == "") {
        const resposta = {
          status: true,
          msg: 'o email não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if  (registro == null) {
        const resposta = {
          status: true,
          msg: 'o registro não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (tipo == null){
        const resposta = {
          status: true,
          msg: 'o tipo não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (senha == ""){
        const resposta = {
          status: true,
          msg: 'o nome não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      }
      else {
        //o else só deve ser executado se todas as validações forem feitas
        const Professores = new Professores(banco);

        Professores.setRegistro(matricula)
        Professores.setNome(nome);
        Professores.setEmail(email);
        Professores.setSenha(senha);
        Professores.setTipo(tipo);
        //outro modo de get e set, modo mais antigo...

        //chama o método create da classe Professores...
        //esse método executa uma instrução sql no banco.
        //then then() é executado se alunos.create() retorna um resolve do promise
        //caso contrário é executado um reject e cai no catch()
        Professores.create().then((resultadosBanco) => {
          //monta um objeto json de resposta com os dados do novo funcionário cadastrado
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '002',
            dados: {
              matricula: resultadosBanco.matricula,
              nome: alunos.getNome(),
              email: alunos.getEmail(),
              wpp: alunos.getTipo()
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

  app.get('/professores/professores', function (request, response) {
    console.log("rota: GET: /professores/professores");

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
      const Professores = new Professores(banco);


      //chama o método read() da classe Funcionario...
      //esse método executa uma instrução sql no banco.
      //then then() é executado se funcionario.read() retorna um resolve da promise
      //caso contrário é executado um reject e cai no catch()
      Professores.read().then((resultadosBanco) => {

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

  app.get('/professores/professores/:id', (request, response) => {

    console.log("GET: /professores/professores:id");
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

      const registro = request.params.id;

      const Professores = new Porfessores(banco);

      Professores.setRegistro(registro);
      Professores.read(registro).then((resultadosBanco) => {
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

  app.put('/professores/professores/:id', (request, response) => {
    console.log("rota: PUT: /professores/professores");

    //recupera o 'Bearer <' + TOKEN + '>' enviado pelo cliente
    const dadosAutorizacao = request.headers.authorization;
    //cria um objeto da classe JwtToken
    const jwt = new JwtToken();

    //verifica se o token enviado pelo cliente é válido
    const validarToken = jwt.validarToken(dadosAutorizacao);

    
    if (validarToken.status == true) {
      const registro = request.body.registro
      const nome = request.body.nome
      const email = request.body.email
      const senha = request.body.senha
      const tipo = request.body.tipo

      //antes de cadastrar um novo funcionário valide todos os dados de entrada:
      //caso o nome seja vazio
      if (nome == "") {
        //cria um objeto json de resposta.
        const resposta = {
          status: true,
          msg: 'o nome não pode ser vazio',
          codigo: '001',
          dados: "{}"
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta);
      } else if (email == "") {
        const resposta = {
          status: true,
          msg: 'o email não pode ser vazio',
          codigo: '001',
          dados: "{}"
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if  (registro == null) {
        const resposta = {
          status: true,
          msg: 'o registro não pode ser vazio',
          codigo: '001',
          dados: "{}"
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (tipo == null){
        const resposta = {
          status: true,
          msg: 'o tipo não pode ser vazio',
          codigo: '001',
          dados: "{}"
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (senha == ""){
        const resposta = {
          status: true,
          msg: 'a senha não pode ser vazia',
          codigo: '001',
          dados: "{}"
        }
       
        response.status(200).send(resposta)
      }else {
        const Professores = new Professores(banco)

        Professores.setMatricula(matricula)
        Professores.setNome(nome)
        Professores.setEmail(email)
        Professores.setWpp(wpp)
        Professores.setSenha(senha)

        Professores.update().then((resultadosBanco) => {
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '007',
            dados: {
              matricula: Professores.getMatricula(),
              nome: Professores.getNome(),
              email: Professores.getEmail(),
              tipo: professores.getTipo(),
              
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
          response.status(200).send(resposta);
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

  app.delete('/professores/aluno/:id', (request, response) => {

    console.log("rota: DELETE: /professores/aluno/:id");

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
      const id = request.params.id; // é params.id pq na rota foi definido (:id)

      const alunos = new Alunos(banco);
      alunos.setMatricula(id);

      alunos.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '008',
          dados: {
            matricula: alunos.getMatricula(),
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