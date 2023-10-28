const express = require('express')
const mysql = require('mysql')

const route_aluno = require("./Router/Route_Alunos")
const route_professor = require("./Router/Route_Professor")

const app = express()
const banco = mysql.createPool({
connectionLimit: 128,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'colegiosunivap'})

app.use(express.json())
app.use(route_aluno)
app.use(route_professor)


app.listen(3000, function () {
  console.log('Servidor Ativo na porta: ' + porta + '!')
});

module.exports = app