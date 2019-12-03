const conexao = require('./conexao')

var venda = conexao.Schema({
    titulo:{
        type:String
    },
    isbn:{
        type:String
    },
    sinopse:{
        type:String
    },
    foto:{
        type:String
    },
    marca:{
        type:conexao.Schema.Types.ObjectId,
        ref: "marca"
    },
    modelo:{
        type:conexao.Schema.Types.ObjectId,
        ref: "modelo"
    },
    carros:[{
        type:conexao.Schema.Types.ObjectId,
        ref: "carro"
    }]
})

module.exports = conexao.model("venda",venda)