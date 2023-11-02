"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controle_delete = void 0;
const Revisao_1 = __importDefault(require("../../Model/Revisao"));
const JwtToken_1 = __importDefault(require("../../Model/JwtToken"));
function controle_delete(request, response) {
    const dadosAutorizacao = request.headers.authorization;
    if (dadosAutorizacao !== undefined) {
        const jwt = new JwtToken_1.default();
        const validacao = jwt.validarToken(dadosAutorizacao);
        console.log(validacao);
        if (validacao.status == true) {
            let id = parseInt(request.params.id);
            const revisao = new Revisao_1.default();
            revisao.idPedidoRevisao = id;
            revisao.delete().then(value => {
                const obj = value;
                const resposta = {
                    status: true,
                    msg: 'pedido excluido com sucesso',
                    codigo: '201',
                    dados: {
                        idFuncionario: obj.insertId,
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
exports.controle_delete = controle_delete;
