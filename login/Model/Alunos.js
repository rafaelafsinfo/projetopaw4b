var md5 = require('md5'); //npm install md5 --save  //https://www.npmjs.com/package/md5

module.exports = class Funcionario {

    constructor(banco) {
        this.banco = banco
        this.matricula = null
        this.senha = null
        
    }
    async login() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const matricula = this.getMatricula();
            const senha = md5(this.getSenha());
            let parametros = [matricula, senha];
            let sql = "SELECT COUNT(*) AS qtd ,nome,matricula FROM Aluno WHERE matricula =? AND senha =?";

            const result = this.banco.query(sql, parametros, (error, result) => {
                if (error) {
                    reject(error);
                } else {

                    if (result[0].qtd == 1) {
                        const resposta = {
                            status: true,
                            nome: result[0].nome,
                            matricula: result[0].matricula
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

