
//app e banco são recebidos quando fazemos a chamada
// de rotas_funcionarios no arquivo app.js
module.exports = function (app, banco) {

  const Alunos = require("../Model/Alunos");
  const JwtToken = require('../../login/Model/JwtToken');
  
  /*************************************************************************************************************************** */
  //create
  app.post('/professores/aluno', (request, response) => {
    const md5 = require("md5")

    //imprime no console do terminal
    //útil para debug
    console.log("rota => POST: /professor/aluno");

    //recupera o 'Bearer <' + TOKEN + '>' enviado pelo cliente
    const dadosAutorizacao = request.headers.authorization;
    console.log(dadosAutorizacao)
    //cria um objeto da classe JwtToken
    const jwt = new JwtToken();
    //verifica se o token enviado pelo cliente é válido
    const validarToken = jwt.validarToken(dadosAutorizacao);
    console.log(validarToken);
    //entra no if se a validação do token é verdadeira
    //se a validação do token é verdadeira a propriedade validarToken.dados, 
    //possui dados do cliente no formato: {"email":"","nome":"","idFuncionario":"","idCargo":"","nomeCargo":""}
    //esses dados serão utilizados para gerar um novo token com a data de validade maior que a anterior.
    //toda vez que o token do cliente é validado é gerado um novo token mais novo na resposta da requisicao.
    if (validarToken.status == true) {

      const matricula = request.body.matricula
      const nome = request.body.nome
      const email = request.body.email
      const wpp = request.body.wpp
      const senha = request.body.senha

      //antes de cadastrar um novo funcionário valide todos os dados de entrada:
      //caso o nome seja vazio
      if (nome == "") {
        //cria um objeto json de resposta.
        const resposta = {
          status: true,
          msg: 'o nome não pode ser vazio',
          codigo: '001',
          dados: "{}",
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
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
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if  (matricula == null) {
        const resposta = {
          status: true,
          msg: 'o matricula não pode ser vazio',
          codigo: '001',
          dados: "{}",
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (wpp == null){
        const resposta = {
          status: true,
          msg: 'o wpp não pode ser vazio',
          codigo: '001',
          dados: "{}",
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
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
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      }
      else {
        //o else só deve ser executado se todas as validações forem feitas
        const alunos = new Alunos(banco);

        alunos.setMatricula(matricula)
        alunos.setNome(nome);
        alunos.setEmail(email);
        alunos.setWpp(wpp)
        alunos.md5(this.setSenha());

        //outro modo de get e set, modo mais antigo...

        //chama o método create da classe alunos...
        //esse método executa uma instrução sql no banco.
        //then then() é executado se alunos.create() retorna um resolve do promise
        //caso contrário é executado um reject e cai no catch()
        alunos.create().then((resultadosBanco) => {
          //monta um objeto json de resposta com os dados do novo funcionário cadastrado
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '002',
            dados: {
              matricula: resultadosBanco.matricula,
              nome: alunos.getNome(),
              email: alunos.getEmail(),
              wpp: alunos.getWpp()
            },
            token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
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

  app.get('/professores/aluno', function (request, response) {
    console.log("rota: GET: /professores/aluno");

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
      const alunos = new Alunos(banco);


      //chama o método read() da classe Funcionario...
      //esse método executa uma instrução sql no banco.
      //then then() é executado se funcionario.read() retorna um resolve da promise
      //caso contrário é executado um reject e cai no catch()
      alunos.read().then((resultadosBanco) => {

        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          dados: resultadosBanco,
          codigo: '003',
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
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
        //envia uma respota para o cliente
        response.status(200).send(resposta);

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

  app.get('/professores/aluno/:id/', (request, response) => {

    console.log("GET: /professores/aluno:id");
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

      const matricula = request.params.matricula;

      //é criado um o bjeto de funcionario..
      //para o objeto é passado o pool de conexoes com o banco
      const alunos = new Alunos(banco);

      alunos.setMatricula(matricula);


      //chama o método read() da classe Funcionario...

      //esse método executa uma instrução sql no banco.
      //then then() é executado se funcionario.read() retorna um resolve da promise
      //caso contrário é executado um reject e cai no catch()
      //note que o ide não é passado como parametro na chamda do método read.
      //isso não é necessário pois o id ja foi passado para instancia anteriomrente em:
      //  funcionario.setIdFuncionario(idFuncionario);
      alunos.read().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'executado com sucesso',
          dados: resultadosBanco,
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        };
        response.status(200).send(resposta);
      }).catch((erro) => {

        const resposta = {
          status: false,
          msg: 'erro ao executar',
          codigo: '005',
          dados: erro,

          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        response.status(200).send(resposta);

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

  app.put('/professores/aluno/:id', (request, response) => {
    console.log("rota: PUT: /professores/aluno");

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
      const matricula = request.body.matricula
      const nome = request.body.nome
      const email = request.body.email
      const wpp = request.body.wpp
      const senha = request.body.senha

      //antes de cadastrar um novo funcionário valide todos os dados de entrada:
      //caso o nome seja vazio
      if (nome == "") {
        //cria um objeto json de resposta.
        const resposta = {
          status: true,
          msg: 'o nome não pode ser vazio',
          codigo: '001',
          dados: "{}",
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
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
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if  (matricula == null) {
        const resposta = {
          status: true,
          msg: 'o matricula não pode ser vazio',
          codigo: '001',
          dados: "{}",
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (wpp == null){
        const resposta = {
          status: true,
          msg: 'o wpp não pode ser vazio',
          codigo: '001',
          dados: "{}",
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (senha == ""){
        const resposta = {
          status: true,
          msg: 'a senha não pode ser vazia',
          codigo: '001',
          dados: "{}",
          token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      }else {
        const alunos = new Alunos(banco)

        alunos.setMatricula(matricula)
        alunos.setNome(nome)
        alunos.setEmail(email)
        alunos.setWpp(wpp)
        alunos.setSenha(senha)

        funcionario.update().then((resultadosBanco) => {
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '007',
            dados: {
              matricula: alunos.getMatricula(),
              nome: alunos.getNome(),
              email: alunos.getEmail(),
              wpp: alunos.getWpp(),
              
            },
            token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
          }
          response.status(200).send(resposta);
        }).catch((erro) => {
          const resposta = {
            status: false,
            msg: 'erro ao executar',
            codigo: '010',
            dados: erro,
            token: jwt.gerarToken(validarToken.dados.data), //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
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

      funcionario.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '008',
          dados: {
            matricula: funcionario.getMatricula(),
          },
          token: jwt.gerarToken(validarToken.dados.data), //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        response.status(200).send(resposta);
      }).catch((erro) => {
        const resposta = {
          status: false,
          msg: 'erro ao executar',
          codigo: '009',
          dados: erro,
          token: jwt.gerarToken(validarToken.dados.data), //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
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