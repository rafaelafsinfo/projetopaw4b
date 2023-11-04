import { Router } from "express";
import path from "path";
import {controle_read} from "../Controller/Revisao/Control_read";
import {controle_create} from "../Controller/Revisao/Control_create";
import {controle_delete} from "../Controller/Revisao/Control_delete";




export default
  class RevisaoRoteador {

  private _roteador = Router();

  public getRotaRevisao(): Router {
    
      this._roteador.post("/revisao", controle_create);
      this._roteador.get("/revisao/:id", controle_read);
      this._roteador.delete("/revisao/", controle_delete);
      this._roteador.get("/alunosrevisao",function(request,response){
        response.sendFile(path.join(__dirname,'..','Public', 'Revisao.html'))
      })
    

    return this._roteador;
  }
}
