"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const Control_read_1 = require("../Controller/Notas/Control_read");
class NotasRoteador {
    constructor() {
        this._roteador = (0, express_1.Router)();
    }
    getRotasNotas() {
        this._roteador.get("/notas/:id", Control_read_1.controle_read);
        this._roteador.get("/alunosnotas/", function (request, response) {
            response.sendFile(path_1.default.join(__dirname, '..', 'Public', 'Notas.html'));
        });
        return this._roteador;
    }
}
exports.default = NotasRoteador;
