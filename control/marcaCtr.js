var marca = require('../model/marca')

//middleware para buscar marcas
function getMarcas(req,res,next){
    marca.find({}).lean().exec(function(err,docs){
        req.marcas = docs
        next()
    })
}

function listar(req,res){
    marca.find({}).lean().exec(function(err,docs){
        res.render('marca/list.ejs',{"Marcas" : docs})
    })
}

function filtrar(req,res){
    marca.find({ nome : new RegExp(req.body.pesquisa, 'i') })
    .lean().exec(function(err,docs){
        res.render('marca/list.ejs',{"Marcas" : docs})
    })
}

function abrirAdiciona(req,res){
    res.render("marca/add.ejs")
}

function adiciona(req,res){
    var novoMarca = new marca({
        nome: req.body.nome
    })
    novoMarca.save(function(err){
        if(err){
            marca.find({}).lean().exec(function(err,docs){
                res.render('marca/list.ejs', { msg: "Problema ao salvar!", Marcas: docs })
            })            
        }else{
            marca.find({}).lean().exec(function(err,docs){
                res.render('marca/list.ejs', { msg: "Adicionado com sucesso!", Marcas: docs })
            })   
        }
    })
}

function abrirEdita(req,res){
    marca.findById(req.params.id,function(err,marca){
        res.render('marca/edit.ejs',{'marca':marca});
    })    
}

function edita(req,res){
    marca.findByIdAndUpdate(req.params.id, {nome:req.body.nome},function(err){
        if(err){
            marca.find({}).lean().exec(function(err,docs){
                res.render('marca/list.ejs', { msg: "Problema ao editar!", Marcas: docs })
            })            
        }else{
            marca.find({}).lean().exec(function(err,docs){
                res.render('marca/list.ejs', { msg: "Editado com sucesso!", Marcas: docs })
            })   
        }
    })
}

function deleta(req,res){
    marca.findByIdAndDelete(req.params.id,function(){
        marca.find({}).lean().exec(function(err,docs){
            res.render('marca/list.ejs', { msg: "Removido com sucesso!", Marcas: docs })
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
    getMarcas
}