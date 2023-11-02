"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controle_create = void 0;
const Revisao_1 = __importDefault(require("../../Model/Revisao"));
const JwtToken_1 = __importDefault(require("../../Model/JwtToken"));
function controle_create(request, response) {
    const dadosAutorizacao = request.headers.authorization;
    if (dadosAutorizacao !== undefined) {
        const jwt = new JwtToken_1.default();
        const validacao = jwt.validarToken(dadosAutorizacao);
        console.log(validacao);
        if (validacao.status == true) {
            const Nota_idNota = request.body.Nota_idNota;
            const descricao = request.body.descricao;
            const revisao = new Revisao_1.default();
            revisao.Nota_idNota = Nota_idNota;
            revisao.descricao = descricao;
            revisao.create().then(value => {
                const obj = value;
                const resposta = {
                    status: true,
                    msg: 'Cadastrado com sucesso',
                    codigo: '201',
                    dados: {
                        idPedidoRevisao: obj.idPedidoRevisao,
                        Nota_idNota: revisao.Nota_idNota,
                        descricao: revisao.descricao,
                        status: 1
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
exports.controle_create = controle_create;
