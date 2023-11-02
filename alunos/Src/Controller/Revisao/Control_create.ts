import { Request, Response } from "express";
import Revisao from "../../Model/Revisao";
import JwtToken from "../../Model/JwtToken";



export function controle_create(request: Request, response: Response) {
  const dadosAutorizacao = request.headers.authorization;
  if (dadosAutorizacao !== undefined) {
   
    const jwt = new JwtToken();
    const validacao:any = jwt.validarToken(dadosAutorizacao);

    console.log(validacao);
    if (validacao.status == true) {

      const Nota_idNota: number = request.body.Nota_idNota;
      const descricao: string = request.body.descricao;
      

      const revisao = new Revisao();
   
      revisao.Nota_idNota = Nota_idNota;
      revisao.descricao = descricao;
 

      

      revisao.create().then(value => {

        const obj: any = value;
        const resposta = {
          status: true,
          msg: 'Cadastrado com sucesso',
          codigo: '201',
          dados: {
            idPedidoRevisao : obj.idPedidoRevisao,
            Nota_idNota: revisao.Nota_idNota,
            descricao:revisao.descricao,
            status : 1 


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