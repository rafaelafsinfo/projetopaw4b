var md5 = require('md5'); 

module.exports = class Professor {

    constructor(banco) {
        this._banco = banco
        this.email = null
        this.senha = null
        
    }
    async login() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const email = this.getEmail();
            const senha = md5(this.getSenha());
            const parametros = [email, senha];
            const sql = `SELECT COUNT(*) AS qtd ,nome,email FROM Professor WHERE email =? AND senha =?;`;

            this._banco.query(sql, parametros, (error, result) => {

                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    console.log(result)
                    if (result[0].qtd > 0) {
                        const resposta = {
                            status: true,
                            registro: result[0].registro,
                            email: result[0].email,
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


    setEmail(matricula){
        this.matricula = matricula
    }
    getEmail(){
        return this.matricula
    }
    
    setSenha(senha) {
        this.senha = senha;
    }
    getSenha() {
        return this.senha;
    }


}

