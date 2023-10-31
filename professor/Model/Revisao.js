module.exports = class Revisao {

    constructor(banco) {
        /*
        os atributos da classe para serem definidos com privados devem ser precedidos de _
        essa é apenas uma convensão pois o javascript não implemente de fato o conceito de:
        mediador de acesso privado, publico e protegido
        */
        //this._banco recebe o pool de conexoes que vem sendo passado desde o arqquivo app.js
        this._banco = banco
        this._IdPedidoRevisao = null
        this._Nota = {
            idNota:null
        }
        this._Descricao = null
        this._Status = null
    }

    /**
     * o método é chamado no arquivo rotas_funcionarios.js quando é recebido um POST:/funcionário
     * @returns {Promise} resolve se cadastrado e reject caso aconteça algum erro
     */

    async create() {
        //cria uma promise que retornará dados referentes a execução de 
        //uma instrução sql no banco.
        const operacaoAssincrona = new Promise((resolve, reject) => {


            //recupera os dados do objeto funcionario
            //os dados foram passados para o objeto funcionario (this) no arquivo rotas_funcionarios.js
            //no método app.post('/funcionarios')
            const IdPedidoRevisao = this.getIdPedidoRevisao() 
            const Nota = this.getNota()
            const Nota_idNota = Nota.idNota
            const Descricao = this.getDescricao() 
            const Status = this.getStatus() 
            

            //parametros é um vetor que recebe todos os dados que serão substituidos por ?
            const parametros = [IdPedidoRevisao,Nota_idNota,Descricao,Status];

            // monta a instrução sql que será executada no sgbd
            let sql = "INSERT INTO pedidorevisao (idPedidoRevisao,Nota_idNota,descricao,status) VALUES (?,?,?,?);";

            //depois da substituição dos ? pelos dados a instrução sql é executada pelo método query
            //a substituição dos ? também é realizada no método _banco.query(
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("reject => pedidorevisao.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem informações 
                    //sobre a insersão do novo registro no banco de dados.
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => pedidorevisao.create(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        //retorna uma promise para rotas_funcionario
        return operacaoAssincrona;
    }


    /**
      * o método é chamado no arquivo rotas_funcionarios
      * quando é recebido um GET:/funcionarios ou
      * quando é recebido um GET:/funcionarios/:id
      * observe que as as duas rotas chamam o mesmo método read()
      * @returns {Promise} resolve se o sql for executado com sucesso e reject caso aconteça algum erro
      */
    async read() {
        //cria uma promise que retornará dados referentes a execução de 
        //uma instrução sql no banco.
        const operacaoAssincrona = new Promise((resolve, reject) => {
            //observe que o idFuncionario pode ou não ter sido inserido
            //se veio da GET:/funcionarios  => não foi inserido id, portanto é nulo
            //se veio da GET:/funcionarios/:id  => foi inserido id, id é equivalente ao valor que veio na uri

            const id = this.getMatricula();

            //o id é passado como nulo ou como o id que veio na uri.
            let params = [id];

            let SQL = "";

            //caso o id seja nulo entra no if e executa a primeira instrução sql
            //caso o id não seja nulo cai no else
            if (id == null) {
                SQL = "SELECT* FROM pedidorevisao ORDER BY idPedidoRevisao";
            } else {
                SQL = "SELECT* FROM pedidorevisao where idPedidoRevisao=? ORDER BY idPedidoRevisao ";
            }

            //depois da substituição dos ? pelos dados a instrução sql é executada pelo método query
            //a substituição dos ? também é realizada no método _banco.query(
            this._banco.query(SQL, params, function (error, result) {
                if (error) {
                    //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("reject => pedidorevisao.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem informações 
                    //sobre a insersão do novo idPedidoRevisao no banco de dados.
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => pedidorevisao.create(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        //retorna uma promise para rotas_funcionario.js  na funçao => app.get('/funcionarios')
        return operacaoAssincrona;
    }

    /**
      * o método é chamado no arquivo rotas_funcionarios pela função app.put('/funcionarios/:id')
      * quando é recebido um PUT:/funcionarios/:id
      * @returns {Promise} resolve se o sql for executado com sucesso e reject caso aconteça algum erro
      */
    async update() {

        //cria uma promise que retornará dados referentes a execução de 
        //uma instrução sql no banco.
        const operacaoAssincrona = new Promise((resolve, reject) => {


            const IdPedidoRevisao = this.getIdPedidoRevisao() 
            const Nota = this.getNota()
            const Nota_idNota = Nota.idNota
            const Descricao = this.getDescricao() 
            const Status = this.getStatus() 
            const parametros = [Nota_idNota,Descricao,Status,IdPedidoRevisao];

            //cria a instrução sql que será executada
            const sql = "update pedidorevisao set Nota_idNota=?,descricao=?,status=? where idPedidoRevisao = ?";

            //substitui os sinais de ? pelos parametros e executa a instrução no sgbd
            this._banco.query(sql, parametros, function (error, result) {
                //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                if (error) {
                    console.log("reject => pedidorevisao.update(): " + JSON.stringify(error))
                    reject(error);
                } else {

                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem 
                    //as tuplas da execução da instrução sql 
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => professor.update(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });

        //retorna uma promise para rotas_funcionario.js  na funçao => app.put('/funcionarios')
        return operacaoAssincrona;
    }


    /**
      * o método é chamado no arquivo rotas_funcionarios pela função app.delete('/funcionarios/:id')
      * quando é recebido um DELETE:/funcionarios/:id
      * @returns {Promise} resolve se o sql for executado com sucesso e reject caso aconteça algum erro
    */
    async delete() {
        //cria uma promise que retornará dados referentes a execução de 
        //uma instrução sql no banco.
        const operacaoAssincrona = new Promise((resolve, reject) => {


            //recupera o id que foi inserido no atribudo idFuncionario
            //a inserção é feita no arquivo rotas_funcionario.js
            //A inserção é feita dentro da função que trata a rota DELETE:/funcionarios/:id
            const idPedidoRevisao = this.getIdPedidoRevisao();

            //cria o vetor com os parametros que serão substitudios pelos sinais de ?
            let parametros = [idPedidoRevisao];

            //cria a instrução sql que será executada
            let sql = "delete from professor where idPedidoRevisao = ?";
            //substitui os sinais de ? pelos parametros e executa a instrução no sgbd
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                    console.log("reject => professor.delete(): " + JSON.stringify(error));
                    reject(error);
                } else {
                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem informaçoes sobre a
                    //instrução sql que foi executada.
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => professor.delete(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }


    
    // métodos get/set tradicionais


    setIdPedidoRevisao(IdPedidoRevisao) {
        this._IdPedidoRevisao = IdPedidoRevisao
    }
    getIdPedidoRevisao() {
        return this._IdPedidoRevisao
    }
    setNota(nota) {
        this._Nota = nota;
    }
    getNota() {
        return this._Nota;
    }
    setDescricao(descricao) {
        this._Descricao = descricao;
    }
    getDescricao() {
        return this._Descricao;
    }

    setStatus(status) {
        this._Status = status;
    }
    getStatus() {
        return this._Status;
    }
    


}