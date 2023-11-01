const _jwt = require('jsonwebtoken'); 
module.exports = class JwtToken {
  Jsonwebtoken = _jwt;
  JWT_KEY = "yfyt6t7uou8y8i87utguy78y8ou8ouwou4iow39o";
  JWT_DURACAO = 60 * 60 * 24
  constructor() {

  }
  gerarToken(payload) {

    const novoToken = this.Jsonwebtoken.sign({ data: payload },
      this.JWT_KEY,
      { expiresIn: this.JWT_DURACAO });
    //console.log("entrou:" ,  novoToken)
    return novoToken;
  }
  validarToken(token) {

    const retorno = {
      status: false,
      dados: null
    }
    if (token == null) {
      return retorno;
    }
    if (token == "") {
      return retorno
    }
    const TokenArray = token
    
    //console.log("tokenarray ->>" + TokenArray +"\n"+ "token ->>" + token)
    token = TokenArray[1]
    token = token.replace("<", "")
    token = token.replace(">", "")
    try {
      
      var decoded = this.Jsonwebtoken.decode(token,function(err,decoded){
        console.log(decoded.token)
      },this.JWT_KEY);
      retorno.status = true;
      retorno.dados = decoded;
      console.log("try")
      return retorno;
    } catch (err) {
      console.log("catch")
      return retorno;
    }
  }
}

