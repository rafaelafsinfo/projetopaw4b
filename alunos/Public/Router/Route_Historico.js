"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const Control_read_1 = require("../Controller/Historico/Control_read");
class HistoricoRoteador {
    constructor() {
        this._roteador = (0, express_1.Router)();
    }
    getRotasHistorico() {
        this._roteador.get("/historico/:id", Control_read_1.controle_read);
        this._roteador.get("/alunoshistorico/", function (request, response) {
            response.sendFile(path_1.default.join(__dirname, '..', 'Public', 'Historico.html'));
        });
        return this._roteador;
    }
}
exports.default = HistoricoRoteador;
