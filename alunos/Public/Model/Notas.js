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
const Banco_1 = __importDefault(require("../Model/Banco"));
class Notas {
    constructor() {
        this._Aluno_matricula = -1;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const matricula = this._Aluno_matricula;
                const PARAMETROS = [matricula];
                const SQL = "SELECT * FROM nota where Aluno_matricula = ?";
                Banco_1.default.getConexao().query(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                    resolve(linhasBanco);
                }).catch((erro) => {
                    reject(erro);
                });
            });
        });
    }
    get Aluno_matricula() {
        return this._Aluno_matricula;
    }
    set Aluno_matricula(id) {
        this._Aluno_matricula = id;
    }
}
exports.default = Notas;
