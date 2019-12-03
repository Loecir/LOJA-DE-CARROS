var mongoose = require('mongoose')
const endereco = "mongodb://localhost:27017/biblioteca"

mongoose.connect(endereco, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

module.exports = mongoose