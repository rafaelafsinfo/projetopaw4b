"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Control_read_1 = require("../Controller/Revisao/Control_read");
const Control_create_1 = require("../Controller/Revisao/Control_create");
const Control_delete_1 = require("../Controller/Revisao/Control_delete");
class RevisaoRoteador {
    constructor() {
        this._roteador = (0, express_1.Router)();
    }
    getRotaRevisao() {
        this._roteador.post("/revisao", Control_create_1.controle_create);
        this._roteador.get("/revisao/:id", Control_read_1.controle_read);
        this._roteador.delete("/revisao/:id", Control_delete_1.controle_delete);
        return this._roteador;
    }
}
exports.default = RevisaoRoteador;
