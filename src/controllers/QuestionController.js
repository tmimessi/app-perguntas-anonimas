const Database = require('../db/config')

module.exports = {
  async index(req, res) {
    const db = await Database()

    const roomId = req.params.room
    const questionId = req.params.question
    const action = req.params.action
    const password = req.body.password

    // verificar se a senha está correta buscando pelo id pq é um dado único, já que pela password pode ter mais de uma igual
    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
    // verificando se a senha da sala está igual à senha do usuário
    if(verifyRoom.pass == password){
      if(action == "delete"){
        // apagar a questão que tem o id 1, por exemplo
        await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
      }else if(action == 'check'){
        // alterar a tabela quando for check
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
      }
      res.redirect(`/room/${roomId}`)
    } else {
      // caso a senha esteja incorreta, redirecionar de volta para a página
      res.render('passIncorrect', {roomId: roomId})
    }


  },

  async create(req, res) {
    const db = await Database()
    const question = req.body.question
    const roomId = req.params.room

    db.run(`INSERT INTO questions (
      title,
      room,
      read
    ) VALUES (
      '${question}',
      ${roomId},
      0
    )`)

    res.redirect(`/room/${roomId}`)
  }
}
