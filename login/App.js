const express = require('express')
const mysql = require('mysql')

const Route_login = require("./Router/Route_login")


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
app.get("/loginaluno",function(request,response){
  response.sendFile(__dirname+'/View/Login_Aluno.html')
})

app.listen(3000, function () {
  console.log('Servidor Ativo na porta: ' + 3000 + '!')
});


module.exports = app