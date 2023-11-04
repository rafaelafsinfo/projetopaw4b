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
            const SQL = "SELECT d.idDisciplina,d.nome AS disciplina_nome,p.registro AS prof_registro, p.nome AS prof_nome,t.idTurma AS turma_id, t.abreviacao AS turma_abreviacao, t.ano AS turma_ano FROM disciplina AS d JOIN professor AS p ON d.Professor_registro = p.registro JOIN turma AS t ON d.Turma_idTurma = t.idTurma ORDER BY disciplina_nome, prof_nome;";
            
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