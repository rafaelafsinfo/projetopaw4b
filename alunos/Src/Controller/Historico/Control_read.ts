import { Request, Response } from "express";
import Historico from "../../Model/Historico";

export function controle_read(request: Request, response: Response) {
    
    const historico = new Historico();

    historico.read().then(value => {
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


}