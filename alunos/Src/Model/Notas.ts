import Banco from "../Model/Banco";
import * as Mysql from 'mysql2/promise';

export default class Notas {

    
    private _Aluno_matricula:number;
    
    
    constructor() {
        this._Aluno_matricula= -1;
    }

    public async read(): Promise<Mysql.RowDataPacket[]> {

        return new Promise<Mysql.RowDataPacket[]>((resolve, reject) => {
        
            const matricula = this._Aluno_matricula

            const PARAMETROS = [matricula];
            const SQL = "SELECT * FROM nota where Aluno_matricula = ?";
            
            Banco.getConexao().query<Mysql.RowDataPacket[]>(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                resolve(linhasBanco);
            }).catch((erro) => {
                reject(erro);
            });
        });
    }
    public get Aluno_matricula():number {
    return this._Aluno_matricula;
    }

    public set Aluno_matricula(id: number) {
        this._Aluno_matricula = id;
    }    
}