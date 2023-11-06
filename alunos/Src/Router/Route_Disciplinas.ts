import { Router } from "express";
import {controle_read} from "../Controller/Disciplinas/Control_read";




export default
  class DisciplinasRoteador {

  private _roteador = Router();

  public getRotasDisciplinas(): Router {
    
    this._roteador.get("/disciplinas/", controle_read);

    return this._roteador;
  }
}
