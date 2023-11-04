
//app e banco são recebidos quando fazemos a chamada
// de rotas_funcionarios no arquivo app.js
module.exports = function (app, banco) {

  const Revisao = require("../Model/Revisao");
  const JwtToken = require('../../login/Model/JwtToken');
  
  /*************************************************************************************************************************** */
  //create
  app.post('/professores/revisao', (request, response) => {


    //imprime no console do terminal
    //útil para debug
    console.log("rota => POST: /professor/revisao");

    const dadosAutorizacao = request.headers.authorization;
    
    const jwt = new JwtToken();
    
    const validarToken = jwt.validarToken(dadosAutorizacao);
    
    if (validarToken.status == true) {

      const idPedidoRevisao = request.body.idPedidoRevisao
      const Nota_idNota = request.body.Nota_idNota
      const descricao = request.body.descricao
      const status = request.body.status

      
      if (Nota_idNota == null) {
        const resposta = {
          status: true,
          msg: 'o Nota_idNota não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if  (descricao == "") {
        const resposta = {
          status: true,
          msg: 'o descricao não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (status == null){
        const resposta = {
          status: true,
          msg: 'o status não pode ser vazio',
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
        const revisao = new Revisao(banco);

        revisao.setIdPedidoRevisao(idPedidoRevisao)
        revisao.setNota(Nota_idNota);
        revisao.setDescricao(descricao);
        revisao.setStatus(status)

        //outro modo de get e set, modo mais antigo...

        //chama o método create da classe revisao...
        //esse método executa uma instrução sql no banco.
        //then then() é executado se revisao.create() retorna um resolve do promise
        //caso contrário é executado um reject e cai no catch()
        revisao.create().then((resultadosBanco) => {
          //monta um objeto json de resposta com os dados do novo funcionário cadastrado
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '002',
            dados: {
              idPedidoRevisao: resultadosBanco.idPedidoRevisao,
              nome: revisao.getNota(),
              descricao: revisao.getDescricao(),
              status: revisao.getStatus()
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

  app.get('/professores/revisao', function (request, response) {
    console.log("rota: GET: /professores/revisao");

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
      const revisao = new Revisao(banco);


      //chama o método read() da classe Funcionario...
      //esse método executa uma instrução sql no banco.
      //then then() é executado se funcionario.read() retorna um resolve da promise
      //caso contrário é executado um reject e cai no catch()
      revisao.read().then((resultadosBanco) => {

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

  app.get('/professores/revisao/:id', (request, response) => {

    console.log("GET: /professores/revisao:id");
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

      const revisao = new Revisao(banco);

      revisao.setIdPedidoRevisao(id);
      revisao.read(id).then((resultadosBanco) => {
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

  app.put('/professores/revisao/:id', (request, response) => {
    console.log("rota: PUT: /professores/revisao");

    //recupera o 'Bearer <' + TOKEN + '>' enviado pelo cliente
    const dadosAutorizacao = request.headers.authorization;
    //cria um objeto da classe JwtToken
    const jwt = new JwtToken();

    //verifica se o token enviado pelo cliente é válido
    const validarToken = jwt.validarToken(dadosAutorizacao);

    
    if (validarToken.status == true) {
      const idPedidoRevisao = request.params.id
      const Nota_idNota = request.body.Nota_idNota
      const descricao = request.body.descricao
      const status = request.body.status

      
      if (idPedidoRevisao == null) {
        
        const resposta = {
          status: true,
          msg: 'o idPedidoRevisao não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta);
      } else if (Nota_idNota == null) {
        const resposta = {
          status: true,
          msg: 'o Nota_idNota não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if  (descricao == "") {
        const resposta = {
          status: true,
          msg: 'o descricao não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (status == null){
        const resposta = {
          status: true,
          msg: 'o status não pode ser vazio',
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
        const revisao = new Revisao(banco);

        revisao.setIdPedidoRevisao(idPedidoRevisao)
        revisao.setNota(Nota_idNota);
        revisao.setDescricao(descricao);
        revisao.setStatus(status)

        revisao.update().then((resultadosBanco) => {
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '007',
            dados: {
              idPedidoRevisao: resultadosBanco.idPedidoRevisao,
              nome: revisao.getNota(),
              descricao: revisao.getDescricao(),
              status: revisao.getStatus()
              
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

  app.delete('/professores/revisao/:id', (request, response) => {

    console.log("rota: DELETE: /professores/revisao/:id");

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
      
      const revisao = new Revisao(banco);
      revisao.setIdPedidoRevisao(id);

      revisao.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '008',
          dados: {
            idPedido: resultadosBanco.idPedidoRevisao,
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