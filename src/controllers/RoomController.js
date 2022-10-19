const Database = require('../db/config')

module.exports = {
  async create(req, res){
    const db = await Database()

    //  pegando a senha pra colocar no bd
    const pass = req.body.password

    let roomId

    let isRoom = true
    // while vai rodar enquanto o isRoom or verdadeiro
    while(isRoom){
      // criando uma sala com um número aleatório
      for(var i = 0; i < 6; i++) {
      i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
      }

      // verificando se o número da sala já existe
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)
  
      // o some verifica se o ID existe; se existir, vai retornar true
      isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

      // se não existir, vai inserir no banco de dados
      if(!isRoom){
        await db.run(`INSERT INTO rooms (
          id,
          pass
        ) VALUES (
          '${parseInt(roomId)}',
          '${pass}'
        )`)
      }
    }

    await db.close()

    // dar um redirect pra esta rota
    res.redirect(`/room/${roomId}`)
  },

  // pegando dinamicamente o número da sala
  async open(req, res){
    const db = await Database()
    const roomId = req.params.room
    const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`) // criando um array para as perguntas não lidas (read = 0)
    const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`) // // criando um array para as perguntas lidas (read = 0)

    // verificando se existem perguntas na sala
    let isNoQuestions
    if(questions.length == 0){
      if(questionsRead.length == 0){
        isNoQuestions = true
      }
    }
    

    res.render('room', {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
  },

  // para entrar na sala com o número
  enter(req, res){
    const roomId = req.body.roomId
    res.redirect(`/room/${roomId}`)
  }
}
