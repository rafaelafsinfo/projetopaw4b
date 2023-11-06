"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Control_read_1 = require("../Controller/Disciplinas/Control_read");
class DisciplinasRoteador {
    constructor() {
        this._roteador = (0, express_1.Router)();
    }
    getRotasDisciplinas() {
        this._roteador.get("/disciplinas", Control_read_1.controle_read);
        return this._roteador;
    }
}
exports.default = DisciplinasRoteador;
