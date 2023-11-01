import * as Mysql from 'mysql2/promise';

export default class Banco {
    static credenciais: Mysql.PoolOptions = {
        connectionLimit: 128,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'colegiosunivap'
    };
    static conexao:Mysql.Pool;  
    static conectar():void{
        Banco.conexao =  Mysql.createPool(Banco.credenciais);
    }
    static getConexao():Mysql.Pool{
        return Banco.conexao
    }
}