import Servidor from "./Server";
  //importa a classe Banco.
import Banco from "./Model/Banco";
//importa a classe servidor.

main();
  
  //função princiapl da aplicação,
  //é chamada primeiro a partir dela tudo é inicializado.
  function main(): void {
  Banco.conectar();
  const servidor = new Servidor();
  servidor.iniciar();
}
