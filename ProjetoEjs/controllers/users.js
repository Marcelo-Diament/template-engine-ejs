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
    title: 'Users',
    message: 'Você está na view users.ejs',
    users: usersPlaceholder
  })
}

module.exports = controller