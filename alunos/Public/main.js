"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./Server"));
//importa a classe Banco.
const Banco_1 = __importDefault(require("./Model/Banco"));
//importa a classe servidor.
main();
//função princiapl da aplicação,
//é chamada primeiro a partir dela tudo é inicializado.
function main() {
    Banco_1.default.conectar();
    const servidor = new Server_1.default();
    servidor.iniciar();
}
