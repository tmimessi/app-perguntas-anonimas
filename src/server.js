// importando o express
const express = require('express')

// importando o route
const route = require('./route')

// usando o módulo path
const path = require('path')

// inicializando o express
const server = express()

// mostando pro express que será usada a pasta public
server.use(express.static('public'))

// apontando para o express que a view engine será EJS
server.set('view engine', 'ejs')

// falando o caminho aonde está a página view
server.set('views', path.join(__dirname, 'views'))

// pegando o conteúdo que tá dentro do formulário, decodificar e passar para o controller > é o middleware
server.use(express.urlencoded({extended: true}))

// usando a rota
server.use(route)

// iniciando o servidor
server.listen(3000)
