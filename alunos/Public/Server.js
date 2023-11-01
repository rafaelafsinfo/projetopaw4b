"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
        //use a rota localhost:3000/ como se fosse localhost:3000/public 
        this._app.use('/', express_1.default.static(__dirname + '/public'));
        //inincia as rotas
        this.iniciarRotas();
        this.iniciarServico();
    }
    iniciarRotas() {
        /*let roteadorCargos = new CargoRoteador();
        let roteadorFuncionarios = new FuncionarioRoteador();
       
        this._app.use("/", roteadorCargos.getRotasCargo());
        this._app.use("/",roteadorFuncionarios.getRotasFuncionario());*/
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
