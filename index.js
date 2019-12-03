const express = require('express')
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
const app = express()
var marcaRoute = require('./routes/marcaRoute')
var carroRoute = require('./routes/carroRoute')
var modeloRoute = require('./routes/modeloRoute')
var vendaRoute = require('./routes/vendaRoute')

app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000,function(){
    console.log('O servidor esta funcionando!')
})

app.use('/marca',marcaRoute)
app.use('/carro',carroRoute)
app.use('/modelo',modeloRoute)
app.use('/venda',vendaRoute)