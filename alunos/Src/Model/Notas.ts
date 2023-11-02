import Banco from "../Model/Banco";
import * as Mysql from 'mysql2/promise';

export default class Notas {

    
    private _Aluno_matricula:number;
    
    
    constructor() {
        this._Aluno_matricula= -1;
    }

    public async read(): Promise<Mysql.RowDataPacket[]> {

        return new Promise<Mysql.RowDataPacket[]>((resolve, reject) => {
        
            const PARAMETROS = ['_Aluno_matricula'];
            const SQL = "SELECT * FROM nota where Aluno_Matricula = ?";
            
            Banco.getConexao().query<Mysql.RowDataPacket[]>(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                resolve(linhasBanco)
            }).catch((erro) => {
                reject(erro);
            });
        });
    }
    public get matricula_aluna():number {
    return this._Aluno_matricula;
    }

    public set matricula_aluno(id: number) {
        this._Aluno_matricula = id;
    }    
}