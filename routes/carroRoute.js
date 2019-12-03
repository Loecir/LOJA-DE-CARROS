var express = require('express')
var route = express.Router()
var carroCtr = require('../control/carroCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',carrpCtr.getcarros, carroCtr.listar)

//rota para listar todos
route.get('/', carroCtr.listar)

//rota para listar por filtro
route.post('/', carroCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', carroCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), carroCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', carroCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), carroCtr.edita)

//rota para deletar
route.get('/del/:id', carroCtr.deleta)

module.exports = route;