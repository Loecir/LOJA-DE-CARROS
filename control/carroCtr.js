var carro = require('../model/carro')


//middleware para buscar autores
function getCarros(req, res, next) {
    carro.find({}).lean().exec(function (err, docs) {
        req.carros = docs
        next()
    })
}

function listar(req, res) {
    carro.find({}).lean().exec(function (err, docs) {
        res.render('carro/list.ejs', { "Carros": docs })
    })
}

function filtrar(req, res) {
    carro.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('carro/list.ejs', { "Carros": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("carro/add.ejs")
}

function adiciona(req, res) {
    var novoCarro = new carro({
        nome: req.body.nome
    })
    novoCarro.save(function (err) {
        if (err) {
            carro.find({}).lean().exec(function (err, docs) {
                res.render('carro/list.ejs', { msg: "Problema ao salvar!", Carros: docs })
            })
        } else {
            carro.find({}).lean().exec(function (err, docs) {
                res.render('carro/list.ejs', { msg: "Adicionado com sucesso!", Carros: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    carro.findById(req.params.id, function (err, carro) {
        res.render('carro/edit.ejs', { 'carro': carro });
    })
}

function edita(req, res) {
    carro.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome
        }, function (err) {
            if (err) {
                carro.find({}).lean().exec(function (err, docs) {
                    res.render('carro/list.ejs', { msg: "Problema ao editar!", Carros: docs })
                })
            } else {
                carro.find({}).lean().exec(function (err, docs) {
                    res.render('carro/list.ejs', { msg: "Editado com sucesso!", Carro: docs })
                })
            }
        })
}

function deleta(req, res) {
    carro.findByIdAndDelete(req.params.id, function () {
        carro.find({}).lean().exec(function (err, docs) {
            res.render('carro/list.ejs', { msg: "Removido com sucesso!", Carros: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getCarros
}