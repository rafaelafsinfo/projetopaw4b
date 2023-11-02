import { Router } from "express";
import {controle_read} from "../Controller/Revisao/Control_read";
import {controle_create} from "../Controller/Revisao/Control_create";
import {controle_delete} from "../Controller/Revisao/Control_delete";




export default
  class RevisaoRoteador {

  private _roteador = Router();

  public getRotaRevisao(): Router {
    
      this._roteador.post("/revisao", controle_create);
    this._roteador.get("/revisao/:id", controle_read);
    this._roteador.delete("/revisao/:id", controle_delete);
    

    return this._roteador;
  }
}
