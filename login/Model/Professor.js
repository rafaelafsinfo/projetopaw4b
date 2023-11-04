
module.exports = class Professor {

    constructor(banco) {
        this._banco = banco
        this._registro = null
        this._senha = null
        
    }
    async login() {
        const md5 = require('md5'); 
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const registro = this.getRegistro();
            const senha = md5(this.getSenha());
            const parametros = [registro, senha];
            console.log(registro,senha)

            const sql = `SELECT COUNT(*) AS qtd ,nome,registro FROM professor WHERE registro =? AND senha =?`;

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


    setRegistro(Registro){
        this._Registro = Registro
    }
    getRegistro(){
        return this._Registro
    }
    
    setSenha(senha) {
        this._senha = senha;
    }
    getSenha() {
        return this._senha;
    }


}

