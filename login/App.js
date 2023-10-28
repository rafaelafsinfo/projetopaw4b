const express = require('express')
const mysql = require('mysql')

const route_aluno = require("./Router/Route_Alunos")
const Route_Professor = require("./Router/Route_Professor")

const app = express()
const banco = mysql.createPool({
connectionLimit: 128,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'colegiosunivap'})

app.use(express.json())
app.use('/view', express.static(__dirname + '/view'))

route_aluno(app,banco)
Route_Professor(app,banco)


app.listen(3000, function () {
  console.log('Servidor Ativo na porta: ' + porta + '!')
});

module.exports = app