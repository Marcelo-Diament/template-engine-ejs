const usersPlaceholder = [
  {
    "id": 0,
    "nome": "Fulano",
    "sobrenome": "da Silva",
    "avatar": "/images/fulano.png"
  },
  {
    "id": 1,
    "nome": "Beltrano",
    "sobrenome": "da Silva",
    "avatar": "/images/beltrano.png"
  },
  {
    "id": 2,
    "nome": "Ciclana",
    "sobrenome": "da Silva",
    "avatar": "/images/ciclana.png"
  },
  {
    "id": 3,
    "nome": "Abirosvaldo",
    "sobrenome": "da Silva",
    "avatar": "/images/abirosvaldo.png"
  }
]

const controller = {
  index: (req, res, next) => res.render('users', {
    title: `Usuários`,
    message: `Listagem de todos os usuários`,
    users: usersPlaceholder,
    id: null
  }),
  add: (req, res, next) => res.render('users', {
    title: `Novo Usuário`,
    message: `Adicionar novo usuário`,
    users: null,
    id: null
  }),
  edit: (req, res, next) => res.render('users', {
    title: `Editar Usuário ${usersPlacehoder[req.params.id].nome} ${usersPlacehoder[req.params.id].sobrenome}`,
    message: `Editar os Dados do Usuário #${req.params.id} - ${usersPlacehoder[req.params.id].nome}`,
    users: usersPlaceholder,
    id: req.params.id
  }),
  delete: (req, res, next) => res.render('users', {
    title: `Excluir Usuário ${usersPlacehoder[req.params.id].nome} ${usersPlacehoder[req.params.id].sobrenome}`,
    message: `Excluir os Dados do Usuário #${req.params.id} - ${usersPlacehoder[req.params.id].nome}`,
    users: usersPlaceholder,
    id: req.params.id
  }),
  show: (req, res, next) => res.render('users', {
    title: `Usuário ${usersPlacehoder[req.params.id].nome} ${usersPlacehoder[req.params.id].sobrenome}`,
    message: `Exibindo os Dados do Usuário #${req.params.id} - ${usersPlacehoder[req.params.id].nome}`,
    users: usersPlaceholder,
    id: req.params.id
  })
}

module.exports = controller