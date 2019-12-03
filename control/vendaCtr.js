var venda = require('../model/venda')
var modelo = require('../model/modelo')
var marca = require('../model/marca')
var carro = require('../model/carro')

//middleware para buscar vendas
function getVendas(req, res, next) {
    venda.find({}).lean().exec(function (err, docs) {
        req.vendas = docs
        next()
    })
}

function listar(req, res) {
    venda
        .find({})
        .populate('marca')
        .populate('modelo')
        .populate('carros')
        .lean()
        .exec(function (err, docs) {
            res.render('venda/list.ejs', { "Vendas": docs })
        })
}

function filtrar(req, res) {
    venda
        .find({ titulo: new RegExp(req.body.pesquisa, 'i') })
        .populate('marca')
        .populate('modelo')
        .populate('carros')
        .lean()
        .exec(function (err, docs) {
            res.render('venda/list.ejs', { "Vendas": docs })
        })
}

function abrirAdiciona(req, res) {
    modelo
        .find({})
        .lean()
        .exec(function (e, modelos) {
            carro
                .find({})
                .lean()
                .exec(function (e, carros) {
                    marca
                        .find({})
                        .lean()
                        .exec(function (e, marcas) {
                            res.render("venda/add.ejs", { "Modelos": modelos, "Carros": carros, "Marcas": marcas })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoVenda = new venda({
        titulo: req.body.titulo,
        sinopse: req.body.sinopse,
        foto: req.file.filename,
        marca: req.body.marca,
        modelo: req.body.modelo,
        carros: req.body.carros,
    })
    novoVenda.save(function (err) {
        if (err) {
            venda.find({}).populate('marca').populate('modelo').populate('carros').lean().exec(function (err, docs) {
                res.render('venda/list.ejs', { msg: "Problema ao salvar!", Vendas: docs })
            })
        } else {
            venda.find({}).populate('marca').populate('modelo').populate('carros').lean().exec(function (err, docs) {
                res.render('venda/list.ejs', { msg: "Adicionado com sucesso!", Vendas: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    modelo.find({}).lean().exec(
        function (e, modelos) {
            carro.find({}).lean().exec(
                function (e, carros) {
                    marca.find({}).lean().exec(
                        function (e, marcas) {
                            venda.findOne({ _id: req.params.id }).populate('marca').populate('modelo').populate('carros').exec(
                                function (err, venda) {
                                    res.render('venda/edit.ejs', { 'venda': venda, "Modelos": modelos, "Carros": carros, "Marcas": marcas });
                                });
                        });
                });
        });
}

function edita(req, res) {
    venda.findByIdAndUpdate(req.params.id,
        {
            titulo: req.body.titulo,
            sinopse: req.body.sinopse,
            foto: req.file.filename,
            marca: req.body.marca,
            modelo: req.body.modelo,
            carros: req.body.carros
        }, function (err) {
            if (err) {
                venda.find({}).populate('marca').populate('modelo').populate('carros').lean().exec(function (err, docs) {
                    res.render('venda/list.ejs', { msg: "Problema ao editar!", Vendas: docs })
                })
            } else {
                venda.find({}).populate('marca').populate('modelo').populate('carros').lean().exec(function (err, docs) {
                    res.render('venda/list.ejs', { msg: "Editado com sucesso!", Vendas: docs })
                })
            }
        })
}

function deleta(req, res) {
    venda.findByIdAndDelete(req.params.id, function () {
        venda.find({}).populate('marca').populate('modelo').populate('carros').lean().exec(function (err, docs) {
            res.render('venda/list.ejs', { msg: "Removido com sucesso!", Vendas: docs })
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
    getVendas
}