import { Request, Response } from "express";
import Revisao from "../../Model/Revisao";
import JwtToken from "../../Model/JwtToken";




export function controle_delete(request: Request, response: Response) {
  const dadosAutorizacao = request.headers.authorization;
  if (dadosAutorizacao !== undefined) {
   
    const jwt = new JwtToken();
    const validacao:any = jwt.validarToken(dadosAutorizacao);

    console.log(validacao);
    if (validacao.status == true) {

      let id: number = parseInt(request.params.id);
  
     
      const revisao = new Revisao();
      revisao.idPedidoRevisao = id;

      revisao.delete().then(value => {

        const obj: any = value;
        const resposta = {
          status: true,
          msg: 'pedido excluido com sucesso',
          codigo: '201',
          dados: {
            idFuncionario : obj.insertId,
          }
        };
        return response.status(201).send(resposta);

      }).catch(erro => {
        console.log(erro);
        const resposta = {
          status: true,
          msg: 'erro ao cadastrar',
          codigo: '200',
          dados: erro
        };
        return response.status(200).send(resposta);
      });

    }else{
      const resposta = {
        status: true,
        msg: 'Token Inválido',
        codigo: '200',
        dados: "erro"
      };
      return response.status(200).send(resposta);
    }
  }
}