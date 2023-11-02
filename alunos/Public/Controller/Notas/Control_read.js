"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controle_read = void 0;
const Notas_1 = __importDefault(require("../../Model/Notas"));
const JwtToken_1 = __importDefault(require("../../Model/JwtToken"));
function controle_read(request, response) {
    const dadosAutorizacao = request.headers.authorization;
    if (dadosAutorizacao !== undefined) {
        const jwt = new JwtToken_1.default();
        const validacao = jwt.validarToken(dadosAutorizacao);
        if (validacao.status == true) {
            let id = parseInt(request.params.id);
            const notas = new Notas_1.default();
            notas.Aluno_matricula = id;
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
        else {
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
exports.controle_read = controle_read;
