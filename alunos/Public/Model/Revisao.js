"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var md5 = require('md5');
const Banco_1 = __importDefault(require("../Model/Banco"));
class Revisao {
    constructor() {
        this._idPedidoRevisao = 0;
        this._Nota_idNota = 0;
        this._descricao = "";
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const Nota_idNota = this._Nota_idNota;
                const descricao = this._descricao;
                const PARAMETROS = [Nota_idNota, descricao,];
                let SQL = "INSERT INTO pedidorevisao (Nota_idNota,descricao,status) VALUES (?, ?, 1);";
                Banco_1.default.getConexao().query(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                    resolve(linhasBanco);
                }).catch((erro) => {
                    reject(erro);
                });
            });
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const id = this.idPedidoRevisao;
                const PARAMETROS = [id];
                const SQL = "SELECT * FROM pedidorevisao where idPedidoRevisao = ?";
                Banco_1.default.getConexao().query(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                    // console.log(rows);
                    resolve(linhasBanco);
                }).catch((erro) => {
                    reject(erro);
                });
            });
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const id = this.idPedidoRevisao;
                let PARAMETROS = [id];
                let SQL = "delete from pedidorevisao where idPedidoRevisao = ?";
                Banco_1.default.getConexao().query(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                    return resolve(linhasBanco);
                }).catch((erro) => {
                    return reject(erro);
                });
            });
        });
    }
    get Nota_idNota() {
        return this._Nota_idNota;
    }
    set Nota_idNota(idnota) {
        this._Nota_idNota = idnota;
    }
    get descricao() {
        return this._descricao;
    }
    set descricao(descricao) {
        this._descricao = descricao;
    }
    get idPedidoRevisao() {
        return this._idPedidoRevisao;
    }
    set idPedidoRevisao(idPedidoRevisao) {
        this._idPedidoRevisao = idPedidoRevisao;
    }
}
exports.default = Revisao;
