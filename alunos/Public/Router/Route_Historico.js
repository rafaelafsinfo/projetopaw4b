"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Control_read_1 = require("../Controller/Historico/Control_read");
class HistoricoRoteador {
    constructor() {
        this._roteador = (0, express_1.Router)();
    }
    getRotasHistorico() {
        this._roteador.get("/aluno/historico", Control_read_1.controle_read);
        return this._roteador;
    }
}
exports.default = HistoricoRoteador;
