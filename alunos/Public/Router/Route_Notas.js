"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Control_read_1 = require("../Controller/Notas/Control_read");
class NotasRoteador {
    constructor() {
        this._roteador = (0, express_1.Router)();
    }
    getRotasNotas() {
        this._roteador.get("/aluno/notas", Control_read_1.controle_read);
        return this._roteador;
    }
}
exports.default = NotasRoteador;
