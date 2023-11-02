import { Router } from "express";
import {controle_read} from "../Controller/Historico/Control_read";




export default
  class HistoricoRoteador {

  private _roteador = Router();

  public getRotasHistorico(): Router {
    
    this._roteador.get("/historico", controle_read);

    return this._roteador;
  }
}
