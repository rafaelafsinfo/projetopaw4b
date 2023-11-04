import { Router } from "express";
import path from "path";
import {controle_read} from "../Controller/Notas/Control_read";




export default
  class NotasRoteador {

  private _roteador = Router();

  public getRotasNotas(): Router {
    
    this._roteador.get("/notas/:id", controle_read);
    this._roteador.get("/alunosnotas/:token/:matricula",function(request,response){
      response.sendFile(path.join(__dirname,'..','Public', 'Notas.html'))
    })

    return this._roteador;
  }
}
