var express = require('express')
var route = express.Router()
var marcaCtr = require('../control/marcaCtr')

// rota para listar todos usando middleware
//route.get('/',marcaCtr.getMarcas, marcaCtr.listar)
route.get('/',marcaCtr.getMarcas, marcaCtr.listar)

//rota para listar por filtro
route.post('/', marcaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', marcaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', marcaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', marcaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id', marcaCtr.edita)

//rota para deletar
route.get('/del/:id', marcaCtr.deleta)

module.exports = route;