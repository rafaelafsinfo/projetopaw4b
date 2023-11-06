"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const Control_read_1 = require("../Controller/Revisao/Control_read");
const Control_create_1 = require("../Controller/Revisao/Control_create");
const Control_delete_1 = require("../Controller/Revisao/Control_delete");
class RevisaoRoteador {
    constructor() {
        this._roteador = (0, express_1.Router)();
    }
    getRotaRevisao() {
        this._roteador.post("/revisao/", Control_create_1.controle_create);
        this._roteador.get("/revisao/", Control_read_1.controle_read);
        this._roteador.delete("/revisao/:id", Control_delete_1.controle_delete);
        this._roteador.get("/alunosrevisao", function (request, response) {
            response.sendFile(path_1.default.join(__dirname, '..', 'Public', 'Revisao.html'));
        });
        return this._roteador;
    }
}
exports.default = RevisaoRoteador;
