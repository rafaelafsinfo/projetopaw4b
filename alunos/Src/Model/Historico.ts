import Banco from "../Model/Banco";
import * as Mysql from 'mysql2/promise';

export default class Historico {

    private _Nota_idNota:number;
    
    constructor() {
        this._Nota_idNota= -1;
    }

    public async read(): Promise<Mysql.RowDataPacket[]> {

        return new Promise<Mysql.RowDataPacket[]>((resolve, reject) => {
        
            const PARAMETROS = [''];
            const SQL = "SELECT historicoalteracoes.*  FROM historicoalteracoes INNER JOIN nota ON historicoalteracoes.Nota_idNota = nota.Aluno_matricula INNER JOIN aluno ON nota.Aluno_matricula = aluno.matricula where aluno.matricula = 1";
            
            Banco.getConexao().query<Mysql.RowDataPacket[]>(SQL, PARAMETROS).then(([linhasBanco, fields]) => {
                resolve(linhasBanco);
            }).catch((erro) => {
                reject(erro);
            });
        });
    }
    public get Nota():number {
    return this._Nota_idNota;
    }

    public set Nota(id: number) {
        this._Nota_idNota = id;
    }

    
}