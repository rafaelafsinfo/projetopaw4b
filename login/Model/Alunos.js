var md5 = require('md5'); 

module.exports = class Aluno {

    constructor(banco) {
        this._banco = banco
        this.matricula = null
        this.senha = null
        
    }
    async login() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const matricula = this.getMatricula();
            const senha = md5(this.getSenha());
            const parametros = [matricula, senha];
            const sql = "SELECT COUNT(*) AS qtd ,nome,matricula FROM aluno WHERE matricula =? AND senha =?";

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
        this.matricula = matricula
    }
    getMatricula(){
        return this.matricula
    }
    
    setSenha(senha) {
        this.senha = senha;
    }
    getSenha() {
        return this.senha;
    }


}

