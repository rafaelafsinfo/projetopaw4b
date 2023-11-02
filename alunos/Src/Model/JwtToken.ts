const JWT = require('jsonwebtoken');

export default class JwtToken {
  private Jsonwebtoken = JWT;
  private _key: string;
  private _duracao: number;
  constructor() {
    this._key = "09ac8db5a84d6cfd979521700cb600fa";

    const minuto: number = 60;
    const hora: number = minuto * 60;

    this._duracao = hora * 24 //duração de 24 horas
  }


  public gerarToken(payload: string): string {
    const novoPayload = JSON.parse(payload);
    const novoToken = this.Jsonwebtoken.sign({ data: novoPayload },
      this._key,
      { expiresIn: this._duracao });
    //console.log("entrou:" ,  novoToken)
    return novoToken;
  }

  private stripToken(token: string): string {

    let TokenArray = token.split(" ");
    token = TokenArray[1]
    token = token.replace("<", "");
    token = token.replace(">", "");

    return token;
  }

  public validarToken(token: string): object {
    
    token = this.stripToken(token);

    const retorno = {
      status: false,
      dados: null
    }

    try {

      var decoded = this.Jsonwebtoken.decode(token, this._key);
      retorno.status = true;
      retorno.dados = decoded;

      return retorno;

    } catch (err) {

      return retorno;
    }
  }
}
