var modelo = require('../model/modelo')


//middleware para buscar modelos
function getModelos(req, res, next) {
    modelo.find({}).lean().exec(function (err, docs) {
        req.modelos = docs
        next()
    })
}

function listar(req, res) {
    modelo.find({}).lean().exec(function (err, docs) {
        res.render('modelo/list.ejs', { "Modelos": docs })
    })
}

function filtrar(req, res) {
    modelo.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('modelo/list.ejs', { "Modelos": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("modelo/add.ejs")
}

function adiciona(req, res) {
    var novoModelo = new modelo({
        nome: req.body.nome
    })
    novoModelo.save(function (err) {
        if (err) {
            modelo.find({}).lean().exec(function (err, docs) {
                res.render('modelo/list.ejs', { msg: "Problema ao salvar!", Modelos: docs })
            })
        } else {
            modelo.find({}).lean().exec(function (err, docs) {
                res.render('modelo/list.ejs', { msg: "Adicionado com sucesso!", Modelos: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    modelo.findById(req.params.id, function (err, modelo) {
        res.render('modelo/edit.ejs', { 'modelo': modelo });
    })
}

function edita(req, res) {
    modelo.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome
        }, function (err) {
            if (err) {
                modelo.find({}).lean().exec(function (err, docs) {
                    res.render('modelo/list.ejs', { msg: "Problema ao editar!", Modelo: docs })
                })
            } else {
                modelo.find({}).lean().exec(function (err, docs) {
                    res.render('modelo/list.ejs', { msg: "Editado com sucesso!", Modelo: docs })
                })
            }
        })
}

function deleta(req, res) {
    modelo.findByIdAndDelete(req.params.id, function () {
        modelo.find({}).lean().exec(function (err, docs) {
            res.render('modelo/list.ejs', { msg: "Removido com sucesso!", Modelos: docs })
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
    getModelos
}