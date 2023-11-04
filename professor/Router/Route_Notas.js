
//app e banco são recebidos quando fazemos a chamada
// de rotas_funcionarios no arquivo app.js
module.exports = function (app, banco) {

  const Notas = require("../Model/Notas")
  const JwtToken = require('../../login/Model/JwtToken')
  
  /*************************************************************************************************************************** */
  //create
  app.post('/professores/notas', (request, response) => {


    //imprime no console do terminal
    //útil para debug
    console.log("rota => POST: /professor/notas");

    const dadosAutorizacao = request.headers.authorization;
    
    const jwt = new JwtToken();
    
    const validarToken = jwt.validarToken(dadosAutorizacao);
    
    if (validarToken.status == true) {

      const idNota = request.body.idNota
      const Disciplina_idDisciplina = request.body.Disciplina_idDisciplina
      const Aluno_matricula = request.body.Aluno_matricula
      const bimestre = request.body.bimestre
      const nota = request.body.nota
      const ultimaAlteracao = request.body.ultimaAlteracao
      const tipoNota = request.body.tipoNota
      const fezLista = request.body.fezLista
      
      if  (Aluno_matricula == null) {
        const resposta = {
          status: true,
          msg: 'o Aluno_matricula não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (bimestre == null){
        const resposta = {
          status: true,
          msg: 'o bimestre não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (nota == null){
        const resposta = {
          status: true,
          msg: 'o nota não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      }else if (ultimaAlteracao == null){
        const resposta = {
          status: true,
          msg: 'o ultimaAlteracao não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      }else if (tipoNota == null){
        const resposta = {
          status: true,
          msg: 'o nota não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      }else if (fezLista == null){
        const resposta = {
          status: true,
          msg: 'o fezLista não pode ser vazio',
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
        const notas = new Notas(banco);

        notas.setidNota(idNota)
        notas.setDisciplina(Disciplina_idDisciplina)
        notas.setAluno(Aluno_matricula)
        notas.setBimestre(bimestre)
        notas.setNota(nota)
        notas.setultimaalteracao(ultimaAlteracao)
        notas.settipoNota(tipoNota)
        notas.setfezLista(fezLista)

        //outro modo de get e set, modo mais antigo...

        //chama o método create da classe alunos...
        //esse método executa uma instrução sql no banco.
        //then then() é executado se alunos.create() retorna um resolve do promise
        //caso contrário é executado um reject e cai no catch()
        notas.create().then((resultadosBanco) => {
          //monta um objeto json de resposta com os dados do novo funcionário cadastrado
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '002',
            dados: {
              idNota: resultadosBanco.idNota,
              Disciplina: notas.getDisciplina(),
              alunos: notas.getAluno(),
              nota: notas.getNota(),
              bimestre: notas.getBimestre(),
              ultimaAlteracao: notas.getultimaalteracao(),
              tipoNota: notas.gettipoNota(),
              fezLista: notas.getfezLista()
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

  app.get('/professores/notas', function (request, response) {
    console.log("rota: GET: /professores/notas");

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
      const notas = new Notas(banco);


      notas.read().then((resultadosBanco) => {

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

  app.get('/professores/notas/:id', (request, response) => {

    console.log("GET: /professores/notas:id");
    //recupera o 'Bearer <' + TOKEN + '>' enviado pelo cliente
    const dadosAutorizacao = request.headers.authorization;
    //cria um objeto da classe JwtToken
    const jwt = new JwtToken();
    //verifica se o token enviado pelo cliente é válido
    const validarToken = jwt.validarToken(dadosAutorizacao);
    
    if (validarToken.status == true) {

      //recupera o id que foi enviado na uri.
      //perceba que quando é enviado pelo uri é necessário
      //utilizar o  (request.params) e não o (request.body)

      const id = request.params.id;

      const notas = new Notas(banco);

      notas.setidNota(id);
      notas.read(id).then((resultadosBanco) => {
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

  app.put('/professores/notas/:id', (request, response) => {
    console.log("rota: PUT: /professores/notas");

    //recupera o 'Bearer <' + TOKEN + '>' enviado pelo cliente
    const dadosAutorizacao = request.headers.authorization;
    //cria um objeto da classe JwtToken
    const jwt = new JwtToken();

    //verifica se o token enviado pelo cliente é válido
    const validarToken = jwt.validarToken(dadosAutorizacao);

    
    if (validarToken.status == true) {
      const idNota = request.params.id
      const Disciplina_idDisciplina = request.body.Disciplina_idDisciplina
      const Aluno_matricula = request.body.Aluno_matricula
      const bimestre = request.body.bimestre
      const nota = request.body.nota
      const ultimaAlteracao = request.body.ultimaAlteracao
      const tipoNota = request.body.tipoNota
      const fezLista = request.body.fezLista
      
      console.log(idNota)

      if (idNota == null) {
        
        const resposta = {
          status: true,
          msg: 'o idnota não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta);
      } else if (Disciplina_idDisciplina == null) {
        const resposta = {
          status: true,
          msg: 'o IdDisciplina não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if  (Aluno_matricula == null) {
        const resposta = {
          status: true,
          msg: 'o Aluno_matricula não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (bimestre == null){
        const resposta = {
          status: true,
          msg: 'o bimestre não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      } else if (nota == null){
        const resposta = {
          status: true,
          msg: 'o nota não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      }else if (ultimaAlteracao == null){
        const resposta = {
          status: true,
          msg: 'o ultimaAlteracao não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      }else if (tipoNota == null){
        const resposta = {
          status: true,
          msg: 'o nota não pode ser vazio',
          codigo: '001',
          dados: "{}",
          //token: jwt.gerarToken(validarToken.dados.data) //como o token foi validado é gerado um novo token mais novo com os dados do cliente.
        }
        //envia a resposta para o cliente
        //http code = 200
        response.status(200).send(resposta)
      }else if (fezLista == null){
        const resposta = {
          status: true,
          msg: 'o fezLista não pode ser vazio',
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
        const notas = new Notas(banco);

        notas.setidNota(idNota)
        notas.setDisciplina(Disciplina_idDisciplina)
        notas.setAluno(Aluno_matricula)
        notas.setBimestre(bimestre)
        notas.setNota(nota)
        notas.setultimaalteracao(ultimaAlteracao)
        notas.settipoNota(tipoNota)
        notas.setfezLista(fezLista)

        notas.update().then((resultadosBanco) => {
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '007',
            dados: {
              idNota: resultadosBanco.idNota,
              Disciplina: notas.getDisciplina(),
              alunos: notas.getAluno(),
              nota: notas.getNota(),
              bimestre: notas.getBimestre(),
              ultimaAlteracao: notas.getultimaalteracao(),
              tipoNota: notas.gettipoNota(),
              fezLista: notas.getfezLista()
              
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

  app.delete('/professores/notas/:id', (request, response) => {

    console.log("rota: DELETE: /professores/notas/:id");

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

      const notas = new Notas(banco);
      notas.setidNota(id);

      notas.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '008',
          dados: {
            matricula: notas.getidNota(),
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