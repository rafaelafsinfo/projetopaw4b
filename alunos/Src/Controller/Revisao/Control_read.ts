import { Request, Response } from "express";
import Revisao from "../../Model/Revisao";
import JwtToken from "../../Model/JwtToken";

export function controle_read(request: Request, response: Response) {
    const dadosAutorizacao = request.headers.authorization;
    if (dadosAutorizacao !== undefined) {
   
    const jwt = new JwtToken();
    const validacao:any = jwt.validarToken(dadosAutorizacao);

    if (validacao.status == true) {

        let id: number = parseInt(request.params.id);

        const revisao = new Revisao();
        revisao.idPedidoRevisao = id
        revisao.read().then(value => {
            const resposta = {
                status: true,
                msg: 'executado com sucesso',
                codigo: '201',
                dados: value
            };

            return response.status(201).json(resposta);

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