const express = require('express')
const mysql = require('mysql')

const Route_login = require("./login/Router/Route_login")
const Route_Alunos = require("./professor/Router/Route_Alunos")
const Route_Disciplina = require("./professor/Router/Route_Disciplinas")

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

Route_login(app,banco)
Route_Alunos(app,banco)
Route_Disciplina(app,banco)

app.get("/loginaluno",function(request,response){
  response.sendFile(__dirname+'/login/View/Login_Aluno.html')
})

app.listen(3000, function () {
  console.log('Servidor Ativo na porta: ' + 3000 + '!')
});


module.exports = app