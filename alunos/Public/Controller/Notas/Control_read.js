"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controle_read = void 0;
const Notas_1 = __importDefault(require("../../Model/Notas"));
function controle_read(request, response) {
    const notas = new Notas_1.default();
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
exports.controle_read = controle_read;
