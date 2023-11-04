import Express, { Application } from "express";
import HistoricoRoteador from "./Router/Route_Historico";
import NotasRoteador from "./Router/Route_Notas";
import RevisaoRoteador from "./Router/Route_Revisao";

export default class Servidor  {
  //todos os atributos da classe servidor devem ser privados
  //tipicamente em typescript os atributos começam com _
  private _porta: number = 5000;
  private _host: string = "localhost";
  private _app: Application = Express();
  

  //método que inicia o servidor
  public iniciar():void{

   
    this._app.use(Express.static('js'));
    this._app.use(Express.json());
    this._app.use(Express.urlencoded({ extended: true })); 
    this._app.use(Express.static(__dirname))


    
    //inincia as rotas
    this.iniciarRotas();

    this.iniciarServico();

  }
  private iniciarRotas():void {

    let roteadorHistorico = new HistoricoRoteador();
    let roteadorNotas = new NotasRoteador();
    let roteadorRevisao = new RevisaoRoteador();
   
    this._app.use("/", roteadorHistorico.getRotasHistorico());
    this._app.use("/",roteadorNotas.getRotasNotas());
    this._app.use("/",roteadorNotas.getRotasNotas());
    this._app.use("/",roteadorRevisao.getRotaRevisao())
    
  }
  
 
  private iniciarServico():void {
    
    this._app.listen(this._porta, this._host,  () => {

      console.log("Servidor rodando na porta: " + this._porta);

    }).on("error", (err: any) => {
        console.log("Erro ao inicializar o sercidor");
        console.error(err);
  
    });
  }
}