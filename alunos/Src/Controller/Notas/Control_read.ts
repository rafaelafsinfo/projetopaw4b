import { Request, Response } from "express";
import Notas from "../../Model/Notas";

export function controle_read(request: Request, response: Response) {

        let id: number = parseInt(request.params.id);

        const notas = new Notas();
        notas.Aluno_matricula = id
        notas.read().then(value => {
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