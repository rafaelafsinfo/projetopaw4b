module.exports = class Disciplinas {

    constructor(banco) {
        /*
        os atributos da classe para serem definidos com privados devem ser precedidos de _
        essa é apenas uma convensão pois o javascript não implemente de fato o conceito de:
        mediador de acesso privado, publico e protegido
        */
        //this._banco recebe o pool de conexoes que vem sendo passado desde o arqquivo app.js
        this._banco = banco
        this._idDisciplina = null
        this._nome = null
        this._Professor = {
            registro:null,
            nome: null,
            email: null,
            tipo: null
        }
        
        this.Turma = {
            idTurma:null,
            nome:null,
            abreviacao:null,
            ano:null
        }
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
            const iddisciplina = this.getIdDisciplina() 
            const nome = this.getNome();
            const professor = this.getProfessor()
            const professor_registro = professor.registro
            const turma = this.getTurma()
            const idTurma = turma.idTurma
            console.log("professsor ->"+this.getProfessor())
            //parametros é um vetor que recebe todos os dados que serão substituidos por ?
            const parametros = [iddisciplina,nome,professor_registro,idTurma]
            console.log(parametros)

            // monta a instrução sql que será executada no sgbd
            let sql = "INSERT INTO disciplina (idDisciplina,nome,Professor_registro,Turma_idTurma) VALUES (?,?,?,?);";

            //depois da substituição dos ? pelos dados a instrução sql é executada pelo método query
            //a substituição dos ? também é realizada no método _banco.query(
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("reject => disciplina.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem informações 
                    //sobre a insersão do novo registro no banco de dados.
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => disciplina.create(): " + JSON.stringify(result))
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

            const id = this.getIdDisciplina()
            //o id é passado como nulo ou como o id que veio na uri.
            let params = [id];

            let SQL = "";

            //caso o id seja nulo entra no if e executa a primeira instrução sql
            //caso o id não seja nulo cai no else
            if (id == null) {
                SQL = "SELECT d.idDisciplina,d.nome AS disciplina_nome,p.registro AS prof_registro, p.nome AS prof_nome,p.email,p.tipo,t.idTurma AS turma_id, t.nome AS turma_nome, t.abreviacao AS turma_abreviacao, t.ano AS turma_ano FROM disciplina AS d JOIN professor AS p ON d.Professor_registro = p.registro JOIN turma AS t ON d.Turma_idTurma = t.idTurma ORDER BY disciplina_nome, prof_nome;"
            } else {
                SQL = "SELECT d.idDisciplina, d.nome AS disciplina_nome, p.registro AS prof_registro, p.nome AS prof_nome, p.email, p.tipo, t.idTurma AS turma_id, t.nome AS turma_nome, t.abreviacao AS turma_abreviacao, t.ano AS turma_ano FROM disciplina AS d JOIN professor AS p ON d.Professor_registro = p.registro JOIN turma AS t ON d.Turma_idTurma = t.idTurma WHERE d.idDisciplina = ? ORDER BY disciplina_nome, prof_nome;";
            }

            //depois da substituição dos ? pelos dados a instrução sql é executada pelo método query
            //a substituição dos ? também é realizada no método _banco.query(
            this._banco.query(SQL, params, function (error, result) {
                if (error) {
                    //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("reject => disciplina.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem informações 
                    //sobre a insersão do novo registro no banco de dados.
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => disciplina.create(): " + JSON.stringify(result))
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


            const iddisciplina = this.getIdDisciplina() 
            const nome = this.getNome()
            const professor = this.getProfessor()
            const professor_registro = professor.registro
            const turma = this.getTurma()
            const turma_idturma = turma.idTurma

            const parametros = [nome, professor_registro,turma_idturma,iddisciplina]
            console.log()
            //cria a instrução sql que será executada
            const sql = "update disciplina set nome=?,Professor_registro=?,Turma_idTurma = ? where idDisciplina = ?";

            //substitui os sinais de ? pelos parametros e executa a instrução no sgbd
            this._banco.query(sql, parametros, function (error, result) {
                //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                if (error) {
                    console.log("reject => disciplina.update(): " + JSON.stringify(error))
                    reject(error);
                } else {

                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem 
                    //as tuplas da execução da instrução sql 
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => disciplina.update(): " + JSON.stringify(result))
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
            const iddisciplina = this.getIdDisciplina();

            //cria o vetor com os parametros que serão substitudios pelos sinais de ?
            let parametros = [iddisciplina];
            //cria a instrução sql que será executada
            let sql = "delete from disciplina where idDisciplina = ?";
            //substitui os sinais de ? pelos parametros e executa a instrução no sgbd
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    //caso aconteça algum erro a promise retorna um reject com o erro que ocorreu
                    console.log("reject => aluno.delete(): " + JSON.stringify(error));
                    reject(error);
                } else {
                    //caso não aconteça nenhum erro a promise retorna um resolve.
                    //result é um consjuto de dados que contem informaçoes sobre a
                    //instrução sql que foi executada.
                    //console envida dados no terminal, muito utilizado para debug
                    console.log("resolve => aluno.delete(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }


    
    // métodos get/set tradicionais


    setIdDisciplina(idDisciplina) {
        this._IdDisciplina = idDisciplina
    }
    getIdDisciplina() {
        return this._IdDisciplina
    }
    setNome(name) {
        this._nome = name;
    }
    getNome() {
        return this._nome;
    }
    setProfessor(professor) {
        this._Professor = professor;
    }
    getProfessor() {
        return this._Professor;
    }
    setTurma(turma) {
        this._Turma = turma;
    }
    getTurma() {
        return this._Turma;
    }
    


}