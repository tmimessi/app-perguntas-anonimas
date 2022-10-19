// importando a modal
import Modal from './modal.js'
// inicializando a modal
const modal = Modal()

//  selecionando os campos
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

//  pegar todos os botões que existem com a classe check
const checkButtons = document.querySelectorAll('.actions a.check')

// adicionar o eventListener de click, percorrendo cada um deles com o forEach
checkButtons.forEach(button => {
  // adicionar a escuta e chamar a função
  button.addEventListener('click', handleClick)
})

// quando o botão delete for clicado, ele tb abre a modal
const deleteButton = document.querySelectorAll('.actions a.delete')
deleteButton.forEach(button => {
  // adicionar a escuta e chamar a função, chamando o eveto e passando o check como false
  button.addEventListener('click', event => handleClick(event, false))
  })

// criando uma função que vai ter um evento e o check por padrão como true e no delete muda pra falso
function handleClick(event, check = true){
  // para que os links não se comportem como links, ou seja, não abra uma janela (tava adicionando a # qdo clicava no botão)
  event.preventDefault()

  const text = check ? 'Marcar como lida' : 'Excluir'
  const slug = check ? 'check' : 'delete'

  // pra colocar o número da pergunta
  const questionId = event.target.dataset.id

  // transformando o room-id no número da sala
  const roomId = document.querySelector('#room-id').dataset.id

  // selecionando o form
  const form  = document.querySelector('.modal form')

  // mudando o atributo action para as variáveis para que qdo clique no form, abra o caminho da url
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  // condições pra exibir cada escrito se marcar o botão check
  modalTitle.innerHTML = `${text} esta pergunta`
  modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()}`
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`

  // condição pra tirar a classe red e deixar o botão azul
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

  // executando a ação de abrir a modal
  modal.open()
}
