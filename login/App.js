const express = require('express')
const mysql = require('mysql')
const banco = mysql.createPool({
  connectionLimit: 128,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'colegiosunivap'})
  
const route_aluno = require("./Router/Route_Alunos")
const route_professor = require("./Router/Route_Professor")
const app = express()
app.use(express.static('js'));
app.use(express.json())
app.use('/View', express.static(__dirname + '/View'));


app.get("/", function(req,res){
  res.sendFile(__dirname+"/view/Index.html")
})

app.get("/professor", function(req,res){
  res.sendFile(__dirname+"/view/Login_Professor.html")
})

app.get("/aluno", function(req,res){
  res.sendFile(__dirname+"/view/Login_Aluno.html")
})

app.listen(3000, function () {
  console.log('Servidor Ativo na porta: ' + porta + '!')
});

module.exports = app