const { Router } = require('express')
const alunoscontroller = require('../controller/alunoscontroller') 

routes.post('/aluno',alunoscontroller.createAlunos)