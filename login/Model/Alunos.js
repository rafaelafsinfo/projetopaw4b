//var md5 = require('md5'); 

module.exports = class Alunos {

    constructor(banco) {
        this._banco = banco
        this._matricula = null
        this._senha = null
        
    }
    async login() {
        const md5 = require('md5'); 
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const matricula = this.getMatricula();
            const senha = md5(this.getSenha());
            console.log(matricula,senha)
            const parametros = [matricula, senha];
            const sql = `SELECT COUNT(*) AS qtd, matricula,nome FROM aluno WHERE matricula = ? AND senha = ?`;

            this._banco.query(sql, parametros, (error, result) => {

                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    console.log(result)
                    if (result[0].qtd > 0) {
                        const resposta = {
                            status: true,
                            matricula: result[0].matricula,
                            nome: result[0].nome,
                            email: result[0].email
                        }
                        resolve(resposta);
                    } else {
                        const resposta = {
                            status: false,
                        }
                        resolve(resposta);
                    }

                }
            });
        });
        return operacaoAssincrona;
    }


    setMatricula(matricula){
        this._matricula = matricula
    }
    getMatricula(){
        return this._matricula
    }
    
    setSenha(senha) {
        this._senha = senha;
    }
    getSenha() {
        return this._senha;
    }


}

