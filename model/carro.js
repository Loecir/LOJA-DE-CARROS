const conexao = require('./conexao')

var carro = conexao.Schema({
    nome:{
        type:String
    },
    nacionalidade:{
        type:String
    },
    datanasc:{
        type:Date
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("carro",carro)