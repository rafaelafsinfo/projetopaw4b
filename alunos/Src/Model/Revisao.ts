var md5 = require('md5');
import * as Mysql from 'mysql2/promise';
import Banco from "../Model/Banco";


export default class Revisao {
    private _idPedidoRevisao: number;
    private _Nota_idNota: number;
    private _descricao: string;


    constructor() {
        this._idPedidoRevisao = 0
        this._Nota_idNota = 0
        this._descricao = ""
    }


    public async create(): Promise<Mysql.RowDataPacket[]> {
        return new Promise<Mysql.RowDataPacket[]>((resolve, reject) => {
            const Nota_idNota = this._Nota_idNota;
            const descricao = this._descricao;

            const PARAMETROS = [Nota_idNota,descricao,];

            let SQL = "INSERT INTO pedidorevisao (Nota_idNota,descricao,status) VALUES (?, ?, 1);";

            Banco.getConexao().query<Mysql.RowDataPacket[]>(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                resolve(linhasBanco)
            }).catch((erro) => {
                reject(erro);
            });
        });

    }

    public async read(): Promise<Mysql.RowDataPacket[]> {

        return new Promise<Mysql.RowDataPacket[]>((resolve, reject) => {
            const id = this.idPedidoRevisao;
            const PARAMETROS = [id];
            const SQL = "SELECT * FROM pedidorevisao where idPedidoRevisao = ?";
            
            Banco.getConexao().query<Mysql.RowDataPacket[]>(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                // console.log(rows);
                resolve(linhasBanco)
            }).catch((erro) => {
                reject(erro);
            });
        });
    }
    

    public async delete(): Promise<Mysql.RowDataPacket[]> {
        return new Promise<Mysql.RowDataPacket[]>((resolve, reject) => {
            const id = this.idPedidoRevisao;
            let PARAMETROS = [id];
            let SQL = "delete from pedidorevisao where idPedidoRevisao = ?";
            Banco.getConexao().query<Mysql.RowDataPacket[]>(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                return resolve(linhasBanco)
            }).catch((erro) => {
                return reject(erro);
            });
        });
    }

    


    

    public get Nota_idNota(): number {
        return this._Nota_idNota;
    }

    public set Nota_idNota(idnota: number) {
        this._Nota_idNota = idnota;
    }
    public get descricao(): string {
        return this._descricao;
    }

    public set descricao(descricao: string) {
        this._descricao = descricao;
    }
    
    public get idPedidoRevisao(): number{
        return this._idPedidoRevisao;
    }

    public set idPedidoRevisao(idPedidoRevisao: number) {
        this._idPedidoRevisao = idPedidoRevisao;
    }
    
}


