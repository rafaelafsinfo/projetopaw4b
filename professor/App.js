const express = require('express')
const mysql = require('mysql')

const Route_Alunos = require("./Router/Route_Alunos")
const Route_Disciplina = require("./Router/Route_Disciplina")
const Route_Historico = require("./Router/Route_Historico")
const Route_Notas = require("./Router/Route_Notas")
const Route_Professores = require("./Router/Route_Professores")
const Route_Revisao = require("./Router/Route_Revisao")
const Route_Turmas = require("./Router/Route_Turmas")


const app = express()

const banco = mysql.createPool({
connectionLimit: 128,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'colegiosunivap'})

app.use(express.static('js'));
app.use(express.json())
app.use('/view', express.static(__dirname + '/view'))

Route_Alunos(app,banco)
Route_Disciplina(app,banco)
Route_Historico(app,banco)
Route_Notas(app,banco)
Route_Professores(app,banco)
Route_Revisao(app,banco)
Route_Turmas(app,banco)

app.listen(3001, function () {
  console.log('Servidor Ativo na porta: ' + 3001 + '!')
});


module.exports = app