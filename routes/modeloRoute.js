var express = require('express')
var route = express.Router()
var modeloCtr = require('../control/modeloCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',modeloCtr.getmodelos, modeloCtr.listar)

//rota para listar todos
route.get('/', modeloCtr.listar)

//rota para listar por filtro
route.post('/', modeloCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', modeloCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), modeloCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', modeloCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), modeloCtr.edita)

//rota para deletar
route.get('/del/:id', modeloCtr.deleta)

module.exports = route;