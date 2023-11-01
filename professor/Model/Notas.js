module.exports = class Historico {

    constructor(banco) {
        /*
        os atributos da classe para serem definidos com privados devem ser precedidos de _
        essa é apenas uma convensão pois o javascript não implemente de fato o conceito de:
        mediador de acesso privado, publico e protegido
        */
        //this._banco recebe o pool de conexoes que vem sendo passado desde o arqquivo app.js
        this._banco = banco
        this._idNota = null
        this._Disciplina = {
            idDisciplina: null,
            nome:null,
            Professor_registro:null,
            Turma_idTurma:null
        }
        this._Aluno = {
            matricula:null,
            nome:null,
            email:null,
            wpp:null
        }
        this._bimestre = null
        this._nota = null
        this._ultimaalteracao = null
        this._tiponota = null
        this._fezLista = null
        
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
            const idnota = this.getidNota()
            const disciplina = this.getDisciplina()
            const disciplina_id = disciplina.idDisciplina
            const aluno = this.getAluno()
            const aluno_matricula = aluno.matricula 
            
            const bimestre = this.getBimestre()
            const nota = this.getNota()
            const ultimaalteracao = this.getultimaalteracao()
            const tipoNota = this.gettipoNota()
            const fezLista = this.getfezLista()
            

            //parametros é um vetor que recebe todos os dados que serão substituidos por ?
            const parametros = [idnota,disciplina_id,aluno_matricula,bimestre,nota,ultimaalteracao,tipoNota,fezLista]

            // monta a instrução sql que será executada no sgbd
            let sql = "INSERT INTO nota (idNota,Disciplina_idDisciplina,Aluno_Matricula,bimestre,nota,ultimaalteracao,tipoNota,fezLista) VALUES (?,?,?,?,?,?,?,?);";

            //depois da substituição dos ? pelos dados a instrução sql é executada pelo método query
            //a substituição dos ? também é realizada no método _banco.query(
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("reject => nota.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem informações 
                    //sobre a insersão do novo registro no banco de dados.
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => nota.create(): " + JSON.stringify(result))
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

            const id = this.getidNota();

            //o id é passado como nulo ou como o id que veio na uri.
            let params = [id];

            let SQL = "";

            //caso o id seja nulo entra no if e executa a primeira instrução sql
            //caso o id não seja nulo cai no else
            if (id == null) {
                SQL = "SELECT * FROM nota ORDER BY idNota";
            } else {
                SQL = "SELECT * FROM nota where idNota =? ORDER BY idNota";
            }

            //depois da substituição dos ? pelos dados a instrução sql é executada pelo método query
            //a substituição dos ? também é realizada no método _banco.query(
            this._banco.query(SQL, params, function (error, result) {
                if (error) {
                    //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("reject => nota.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem informações 
                    //sobre a insersão do novo registro no banco de dados.
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => nota.create(): " + JSON.stringify(result))
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


            const idnota = this.getidNota()
            const disciplina = this.getDisciplina()
            const disciplina_id = disciplina.idDisciplina
            const aluno = this.getAluno()
            const aluno_matricula = aluno.matricula 
            
            const bimestre = this.getBimestre()
            const nota = this.getNota()
            const ultimaalteracao = this.getultimaalteracao()
            const tipoNota = this.gettipoNota()
            const fezLista = this.getfezLista()
            

            //parametros é um vetor que recebe todos os dados que serão substituidos por ?
            const parametros = [disciplina_id,aluno_matricula,bimestre,nota,ultimaalteracao,tipoNota,fezLista,idnota]
            console.log(parametros)
            //cria a instrução sql que será executada
            const sql = "update nota set Disciplina_idDisciplina=?,Aluno_Matricula=?,bimestre=?,nota=?,ultimaalteracao=?,tipoNota=?,fezLista=? where idNota = ?";

            //substitui os sinais de ? pelos parametros e executa a instrução no sgbd
            this._banco.query(sql, parametros, function (error, result) {
                //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                if (error) {
                    console.log("reject => nota.update(): " + JSON.stringify(error))
                    reject(error);
                } else {

                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem 
                    //as tuplas da execução da instrução sql 
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => nota.update(): " + JSON.stringify(result))
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
            const idNota = this.getidNota();

            //cria o vetor com os parametros que serão substitudios pelos sinais de ?
            let parametros = [idNota];

            //cria a instrução sql que será executada
            let sql = "delete from nota where idNota = ?";
            //substitui os sinais de ? pelos parametros e executa a instrução no sgbd
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                    console.log("reject => nota.delete(): " + JSON.stringify(error));
                    reject(error);
                } else {
                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem informaçoes sobre a
                    //instrução sql que foi executada.
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => nota.delete(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }


    
    // métodos get/set tradicionais


    setidNota(idNota) {
        this._idNota = idNota
    }
    getidNota() {
        return this._idNota
    }
    setDisciplina(disciplina) {
        this._Disciplina = disciplina
    }
    getDisciplina() {
        return this._Disciplina
    }
    setAluno(aluno) {
        this._Aluno = aluno
    }
    getAluno() {
        return this._Aluno
    }
    setBimestre(bimestre) {
        this._Bimestre = bimestre;
    }
    getBimestre() {
        return this._Bimestre;
    }
    setNota(nota) {
        this._nota = nota;
    }
    getNota() {
        return this._nota;
    }
    setultimaalteracao(ultimaAlteracao) {
        this._ultimaalteracao = ultimaAlteracao;
    }
    getultimaalteracao() {
        return this._ultimaalteracao;
    }
    settipoNota(tipoNota) {
        this._tipoNota = tipoNota;
    }
    gettipoNota() {
        return this._tipoNota;
    }
    setfezLista(fezLista) {
        this._fezLista = fezLista;
    }
    getfezLista() {
        return this._fezLista;
    }

}