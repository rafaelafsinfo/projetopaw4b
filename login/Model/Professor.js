var md5 = require('md5'); //npm install md5 --save  //https://www.npmjs.com/package/md5

module.exports = class professor {

    constructor(banco) {
        this.banco = banco
        this.email = null
        this.senha = null
        
    }
    async login() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const email = this.getemail();
            const senha = md5(this.getSenha());
            let parametros = [email, senha];
            let sql = "SELECT COUNT(*) AS qtd ,nome,email FROM Aluno WHERE email =? AND senha =?";

            const result = this.banco.query(sql, parametros, (error, result) => {
                if (error) {
                    reject(error);
                } else {

                    if (result[0].qtd == 1) {
                        const resposta = {
                            status: true,
                            nome: result[0].nome,
                            email: result[0].matricula
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


    setEmail(email){
        this.email = email
    }
    getEmail(){
        return this.email
    }
    
    setSenha(senha) {
        this.senha = senha;
    }
    getSenha() {
        return this.senha;
    }


}

