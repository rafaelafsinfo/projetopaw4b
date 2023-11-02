import { Router } from "express";
import {controle_read} from "../Controller/Notas/Control_read";




export default
  class NotasRoteador {

  private _roteador = Router();

  public getRotasNotas(): Router {
    
    this._roteador.get("/notas", controle_read);
    

    return this._roteador;
  }
}
