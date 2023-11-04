import { Router } from "express";
import path from "path";
import {controle_read} from "../Controller/Historico/Control_read";




export default
  class HistoricoRoteador {

  private _roteador = Router();

  public getRotasHistorico(): Router {
    
    this._roteador.get("/historico/:id", controle_read);
    this._roteador.get("/alunoshistorico/",function(request,response){
      response.sendFile(path.join(__dirname,'..','Public', 'Historico.html'))
    })

    return this._roteador;
  }
}
