var express = require('express')
var route = express.Router()
var vendaCtr = require('../control/vendaCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',vendaCtr.getVendas, vendaCtr.listar)
route.get('/',vendaCtr.getVendas, vendaCtr.listar)

//rota para listar por filtro
route.post('/', vendaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', vendaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), vendaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', vendaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), vendaCtr.edita)

//rota para deletar
route.get('/del/:id', vendaCtr.deleta)

module.exports = route;