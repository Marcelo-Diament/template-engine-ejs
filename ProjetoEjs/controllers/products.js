const productsPlaceholder = [
  {
    "id": 0,
    "titulo": "Mochila",
    "marca": "Adidas",
    "preco": 199.99,
    "imagem": "/images/mochila.png",
    "categoria": "Acessórios"
  },
  {
    "id": 1,
    "titulo": "Óculos",
    "marca": "RayBan",
    "preco": 399.99,
    "imagem": "/images/oculos.png",
    "categoria": "Acessórios"
  },
  {
    "id": 2,
    "titulo": "Relógio",
    "marca": "Rolex",
    "preco": 999.99,
    "imagem": "/images/relogio.png",
    "categoria": "Acessórios"
  },
  {
    "id": 3,
    "titulo": "Abajour",
    "marca": "Kartell",
    "preco": 599.99,
    "imagem": "/images/abajour.png",
    "categoria": "Móveis e Decoração"
  }
]

const formattedString = string => string
  .replace(/á|ä|â|à|ã/gi,'a')
  .replace(/é|ë|ê|è/gi,'e')
  .replace(/í|ï|î|ì/gi,'i')
  .replace(/ó|ö|ô|ò|õ/gi,'o')
  .replace(/ú|ü|û|ù/gi,'u')
  .replace(/ç/gi,'c')
  .replace(/ /gi,'-')
  .toLowerCase()

const controller = {
  index: (req, res, next) => {
    res.render('produtos', {
      title: 'Produtos',
      message: 'Listagem dos produtos',
      produtos: productsPlaceholder,
      id: null
    })
  },
  show: (req, res, next) => {
    res.render('produtos', {
      title: `${productsPlaceholder[req.params.id].titulo} | ${productsPlaceholder[req.params.id].marca}`,
      message: `Dados do produto #${productsPlaceholder[req.params.id].id} | ${productsPlaceholder[req.params.id].titulo} | ${productsPlaceholder[req.params.id].marca}`,
      produtos: productsPlaceholder,
      id: req.params.id
    })
  },
  add: (req, res, next) => {
    res.render('produtos', {
      title: `Novo Produto`,
      message: `Adicionar novo produto`,
      produtos: null,
      id: null
    })
  },
  edit: (req, res, next) => {
    res.render('produtos', {
      title: `Editar ${productsPlaceholder[req.params.id].titulo} | ${productsPlaceholder[req.params.id].marca}`,
      message: `Editar os dados do produto #${productsPlaceholder[req.params.id].id} | ${productsPlaceholder[req.params.id].titulo} | ${productsPlaceholder[req.params.id].marca}`,
      produtos: productsPlaceholder,
      id: req.params.id
    })
  },
  delete: (req, res, next) => {
    res.render('produtos', {
      title: `Excluir ${productsPlaceholder[req.params.id].titulo} | ${productsPlaceholder[req.params.id].marca}`,
      message: `Excluir os dados do produto #${productsPlaceholder[req.params.id].id} | ${productsPlaceholder[req.params.id].titulo} | ${productsPlaceholder[req.params.id].marca}`,
      produtos: productsPlaceholder,
      id: req.params.id
    })
  },
  filter: (req, res, next) => {
    res.render('produtos', {
      title: req.params.categoria,
      message: `Produtos que pertencem à categoria ${req.params.categoria}`,
      produtos: productsPlaceholder.filter(produto => formattedString(produto.categoria) === formattedString(req.params.categoria)),
      id: null
    })
  }
}

module.exports = controller