// importando o express
const express = require('express')

// importando os controllers
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

// usando o router do express
const route = express.Router()

// renderizando as páginas no caminho do servidor pela rota get
route.get('/', (req, res) => res.render('index', {page: 'enter-room'}))
route.get('/create-room', (req, res) => res.render('index', {page: 'create-room'}))

route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)
route.post('/enterroom', RoomController.enter)

route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index) 



module.exports = route

/* formato que o formulário de dentro da modal tem que passar a informação:
route.post('/room/:room/:question/:action')
> qdo coloco o : é pra criar uma variável pq cada hora vai ser uma sala, pergunda e ação de botão diferente */