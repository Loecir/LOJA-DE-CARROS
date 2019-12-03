const conexao = require('./conexao')

var marca = conexao.Schema({
    nome:{
        type:String
    },
    livros:[
        {
            type:conexao.Schema.Types.ObjectId,
            ref:"livro"
        }
    ]
})

module.exports = conexao.model("marca",marca)