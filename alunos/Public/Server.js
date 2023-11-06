"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Route_Historico_1 = __importDefault(require("./Router/Route_Historico"));
const Route_Notas_1 = __importDefault(require("./Router/Route_Notas"));
const Route_Disciplinas_1 = __importDefault(require("./Router/Route_Disciplinas"));
const Route_Revisao_1 = __importDefault(require("./Router/Route_Revisao"));
class Servidor {
    constructor() {
        //todos os atributos da classe servidor devem ser privados
        //tipicamente em typescript os atributos começam com _
        this._porta = 5000;
        this._host = "localhost";
        this._app = (0, express_1.default)();
    }
    //método que inicia o servidor
    iniciar() {
        this._app.use(express_1.default.static('js'));
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.urlencoded({ extended: true }));
        this._app.use(express_1.default.static(__dirname));
        //inincia as rotas
        this.iniciarRotas();
        this.iniciarServico();
    }
    iniciarRotas() {
        let roteadorHistorico = new Route_Historico_1.default();
        let roteadorNotas = new Route_Notas_1.default();
        let roteadorDisciplinas = new Route_Disciplinas_1.default();
        let roteadorRevisao = new Route_Revisao_1.default();
        this._app.use("/", roteadorHistorico.getRotasHistorico());
        this._app.use("/", roteadorNotas.getRotasNotas());
        this._app.use("/", roteadorDisciplinas.getRotasDisciplinas());
        this._app.use("/", roteadorRevisao.getRotaRevisao());
    }
    iniciarServico() {
        this._app.listen(this._porta, this._host, () => {
            console.log("Servidor rodando na porta: " + this._porta);
        }).on("error", (err) => {
            console.log("Erro ao inicializar o sercidor");
            console.error(err);
        });
    }
}
exports.default = Servidor;
