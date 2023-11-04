
//app e banco são recebidos quando fazemos a chamada
// de rotas_funcionarios no arquivo app.js
module.exports = function (app, banco) {

  const Historico = require("../Model/Historico");
  const JwtToken = require('../../login/Model/JwtToken');
  
  /*************************************************************************************************************************** */
  //create
  app.post('/professores/historico', (request, response) => {


    //imprime no console do terminal
    //útil para debug
    console.log("rota => POST: /professor/aluno");

    const dadosAutorizacao = request.headers.authorization;
    
    const jwt = new JwtToken();
    
    const validarToken = jwt.validarToken(dadosAutorizacao);
    
    if (validarToken.status == true) {

      const Nota_idNota = request.body.Nota_idNota
      const nota = request.body.nota
      const ultimaAlteracao = request.body.ultimaAlteracao
      

      
      if (Nota_idNota == null) {
        
        const resposta = {
          status: true,
          msg: 'o id da nota não pode ser vazio',
          codigo: '001',
          dados: "{}",
        }
       
        response.status(200).send(resposta);
      } else if (nota == null) {
        const resposta = {
          status: true,
          msg: 'a nota não pode ser vazia',
          codigo: '001',
          dados: "{}",
        }
      
        response.status(200).send(resposta)
      } else if  (ultimaAlteracao == null) {
        const resposta = {
          status: true,
          msg: 'a data de alteração não pode ser vazia',
          codigo: '001',
          dados: "{}",
        }
        
        response.status(200).send(resposta)
      }else {
        const historico = new Historico(banco);

        historico.setidNota(Nota_idNota)
        historico.setNota(nota);
        historico.setultimaalteracao(ultimaAlteracao);
        
        historico.create().then((resultadosBanco) => {
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '002',
            dados: {
              Nota_idNota: resultadosBanco.Nota_idNota,
              nota: historico.getNota(),
              ultimaAlteracao: historico.getultimaalteracao()
            }
          }
          response.status(200).send(resposta);
        }).catch((erro) => {
          console.error('Error retrieving users:', erro);
        });;
      }
    } else {

      const resposta = {
        status: false,
        msg: 'Usuário não logado',
        codigo: 401,
        dados: {},
        token: "" 
      }
      //envia o objeto json como resposta para o cliente
      response.status(200).send(resposta);
    }
  });

  app.get('/professores/historico', function (request, response) {
    console.log("rota: GET: /professores/historico");

    const dadosAutorizacao = request.headers.authorization;
    const jwt = new JwtToken();

    const validarToken = jwt.validarToken(dadosAutorizacao);

    
    if (validarToken.status == true) {
      
      const historico = new Historico(banco);

      historico.read().then((resultadosBanco) => {

        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          dados: resultadosBanco,
          codigo: '003',
        };
        response.status(200).send(resposta);
      }).catch((erro) => {

        
        const resposta = {
          status: false,
          codigo: '004',
          msg: 'erro ao executar',
          dados: erro
        };
        console.log(erro)
        
        response.status(200).send(resposta)

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

  app.get('/professores/historico/:id', (request, response) => {

    console.log("GET: /professores/historico:id");
    
    const dadosAutorizacao = request.headers.authorization;
    
    const jwt = new JwtToken();
    
    const validarToken = jwt.validarToken(dadosAutorizacao);
    
    if (validarToken.status == true) {

      

      const Nota_idNota = request.params.id;

      const historico = new Historico(banco);

      historico.setidNota(Nota_idNota);
      historico.read(Nota_idNota).then((resultadosBanco) => {
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

  app.put('/professores/historico/:id', (request, response) => {
    console.log("rota: PUT: /professores/historico");

    const dadosAutorizacao = request.headers.authorization;
    const jwt = new JwtToken();

    const validarToken = jwt.validarToken(dadosAutorizacao);

    
    if (validarToken.status == true) {
      const Nota_idNota = request.body.Nota_idNota
      const nota = request.body.nota
      const ultimaAlteracao = request.body.ultimaAlteracao
      

      
      if (Nota_idNota == null) {
        
        const resposta = {
          status: true,
          msg: 'o id da nota não pode ser vazio',
          codigo: '001',
          dados: "{}",
        }
       
        response.status(200).send(resposta);
      } else if (nota == null) {
        const resposta = {
          status: true,
          msg: 'a nota não pode ser vazia',
          codigo: '001',
          dados: "{}",
        }
      
        response.status(200).send(resposta)
      } else if  (ultimaAlteracao == null) {
        const resposta = {
          status: true,
          msg: 'a data de alteração não pode ser vazia',
          codigo: '001',
          dados: "{}",
        }
        
        response.status(200).send(resposta)
      }else {
        const historico = new Historico(banco);

        historico.setidNota(Nota_idNota)
        historico.setNota(nota);
        historico.setultimaalteracao(ultimaAlteracao);

        historico.update().then((resultadosBanco) => {
          const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '007',
            dados: {
              Nota_idNota: resultadosBanco.Nota_idNota,
              nota: historico.getNota(),
              ultimaAlteracao: historico.getultimaalteracao()
              
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
      
      const resposta = {
        status: false,
        msg: 'Usuário não logado',
        codigo: 401,
        dados: {},
        token: "" 
      }
      //envia o objeto json como resposta para o cliente
      response.status(200).send(resposta);
    }
  });

  app.delete('/professores/historico/:id', (request, response) => {

    console.log("rota: DELETE: /professores/historico/:id");

    const dadosAutorizacao = request.headers.authorization;
    const jwt = new JwtToken();
    const validarToken = jwt.validarToken(dadosAutorizacao);
    if (validarToken.status == true) {
      const id = {
        "idNota": request.params.id
      } // é params.id pq na rota foi definido (:id)

      const historico = new Historico(banco);
      historico.setidNota(id);

      historico.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '008',
          dados: {
            Nota_idNota: historico.getidNota(),
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
      
      const resposta = {
        status: false,
        msg: 'Usuário não logado',
        codigo: 401,
        dados: {},
        token: "" 
      }
      //envia o objeto json como resposta para o cliente
      response.status(200).send(resposta);

    }
  });
};