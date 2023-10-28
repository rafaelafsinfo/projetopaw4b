const { Router } = require('express')
const alunoscontroller = require('../controller/alunoscontroller') 

const routes = Router()

routes.post('/aluno',alunoscontroller.createAlunos)

module.exports = routes