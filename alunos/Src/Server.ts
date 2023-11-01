import Express, { Application } from "express";


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
    //use a rota localhost:3000/ como se fosse localhost:3000/public 
    this._app.use('/', Express.static(__dirname + '/public'));


    
    //inincia as rotas
    this.iniciarRotas();

    this.iniciarServico();

  }
  private iniciarRotas():void {

    /*let roteadorCargos = new CargoRoteador();
    let roteadorFuncionarios = new FuncionarioRoteador();
   
    this._app.use("/", roteadorCargos.getRotasCargo());
    this._app.use("/",roteadorFuncionarios.getRotasFuncionario());*/

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