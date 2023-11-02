"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require('jsonwebtoken');
class JwtToken {
    constructor() {
        this.Jsonwebtoken = JWT;
        this._key = "09ac8db5a84d6cfd979521700cb600fa";
        const minuto = 60;
        const hora = minuto * 60;
        this._duracao = hora * 24; //duração de 24 horas
    }
    gerarToken(payload) {
        const novoPayload = JSON.parse(payload);
        const novoToken = this.Jsonwebtoken.sign({ data: novoPayload }, this._key, { expiresIn: this._duracao });
        //console.log("entrou:" ,  novoToken)
        return novoToken;
    }
    stripToken(token) {
        let TokenArray = token.split(" ");
        token = TokenArray[1];
        /*token = token.replace("<", "");
        token = token.replace(">", "");*/
        return token;
    }
    validarToken(token) {
        token = this.stripToken(token);
        const retorno = {
            status: false,
            dados: null
        };
        try {
            var decoded = this.Jsonwebtoken.decode(token, this._key);
            retorno.status = true;
            retorno.dados = decoded;
            return retorno;
        }
        catch (err) {
            return retorno;
        }
    }
}
exports.default = JwtToken;
