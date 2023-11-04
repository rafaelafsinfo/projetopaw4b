const express = require('express')
const mysql = require('mysql')

const Route_login = require("./login/Router/Route_login")
const Route_Alunos = require("./professor/Router/Route_Alunos")
const Route_Disciplina = require("./professor/Router/Route_Disciplinas")
const Route_Historico = require("./professor/Router/Route_Historico")
const Route_Notas = require("./professor/Router/Route_Notas")
const Route_Professores = require("./professor/Router/Route_Professores")
const Route_Revisao = require("./professor/Router/Route_Revisao")
const Route_Turmas = require("./professor/Router/Route_Turmas")

const app = express()

const banco = mysql.createPool({
connectionLimit: 128,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'colegiosunivap'})

app.use(express.static('js'));
app.use(express.json())
app.use(express.static(__dirname))


Route_login(app,banco)
Route_Alunos(app,banco)
Route_Disciplina(app,banco)
Route_Historico(app,banco)
Route_Notas(app,banco)
Route_Professores(app,banco)
Route_Revisao(app,banco)
Route_Turmas(app,banco)

app.get("/login",function(request,response){
  response.sendFile(__dirname+'/login/View/Index.html')
})
app.get("/loginaluno",function(request,response){
  response.sendFile(__dirname+'/login/View/Login_Aluno.html')
})
app.get("/loginprofessor",function(request,response){
  response.sendFile(__dirname+'/login/View/Login_Professor.html')
})
app.get("/professorAluno",function(request,response){
  response.sendFile(__dirname+'/professor/View/Alunos.html')
})
app.get("/professorDisciplina",function(request,response){
  response.sendFile(__dirname+'/professor/View/Disciplinas.html')
})
app.get("/professorHistorico",function(request,response){
  response.sendFile(__dirname+'/professor/View/Historico.html')
})
app.get("/professorNota",function(request,response){
  response.sendFile(__dirname+'/professor/View/Notas.html')
})
app.get("/professorProf",function(request,response){
  response.sendFile(__dirname+'/professor/View/Professores.html')
})
app.get("/professorRevisao",function(request,response){
  response.sendFile(__dirname+'/professor/View/Revisao.html')
})
app.get("/professorTurma",function(request,response){
  response.sendFile(__dirname+'/professor/View/Turmas.html')
})

app.listen(3000, function () {
  console.log('Servidor Ativo na porta: ' + 3000 + '!')
});


module.exports = app