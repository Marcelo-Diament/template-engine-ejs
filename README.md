# Node.js > Express > Template Engine EJS

Projeto para compreendermos e nos familiarizarmos com a _template engine_ EJS e o uso das _views_ dentro do _mini-framework_ para node.js Express.

## 1. Iniciando e configurando o projeto

Primeiramente iniciamos o projeto com o express-generator e criamos o(s) controller(s)

Se não tiver instalado o express-generator de forma global, instale com o seguinte comando:

```sh
npm install express-generator -g
```

Para iniciar o projeto, execute:

```sh
express NomeDoProjeto --view=ejs
```

Então instalamos as dependências do projeto:

```sh
cd NomeDoProjeto

npm install
```

Podemos, ainda, incluir o `nodemon` no nosso script 'start' (no `package.json`):

```json
"start": "nodemon ./bin/www"
```

Agora é só 'startar' o projeto (estando dentro da pasta 'NomeDoProjeto'):

```sh
npm start
```

## 2. Controller - Parte I

Como sabemos, ao criar o projeto com o _express-generator_, os _controllers_ não são criados automaticamente. Então criaremos um _controller_ para os usuários. Para iniciar, vamos criar uma pasta chamada _controllers_ e, dentro dela, um arquivo chamado `users.js` - podemos fazer isso pelo terminal (a partir da pasta `App`): `mkdir controllers && touch users.js`.

De início, iremos apenas mover o _callback_ das rotas para os respectivos métodos do _controller_.

**Antes**

```js
// Rotas de usuários
router.get('/', (req, res, next) => res.send(`<h1>Página de Produtos</h1>`))
```

**Depois**

```js
// Controller de usuários
const controller = {
  index: (req, res, next) => res.send(`<h1>Página de Produtos</h1>`)
}

// Rota de usuários
var usersController = require('../controllers/users')
router.get('/', usersController.index)
```

De forma resumida nós simplesmente 'movemos' o _callback_ da rota para o _controller_, nomeando um determinado método no _controller_ (`index`), importando o _controller_ para a rota e chamando o _controller_ e o método (`usersController.index`) na rota.

## 3. View - Parte I

Vamos criar uma view para users (`users.ejs`). Podemos simplesmente copiar a view `index.ejs`. Repare que temos uma sintaxe um pouco diferente do que vimos até o momento. Nosso arquivo copiado - até o momento - está assim:

```ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>
```

**Sintaxe EJS**

Vamos fazer uma pausa e entender um pouco melhor a sintaxe do EJS.

Para exibirmos conteúdo usando o JS dentro desse 'HTML', usamos `<%= elemento.propriedade %>`, por exemplo. O importante é perceber que o `=` é que indica que exibiremos o conteúdo na view.

Fora essa sintaxe para 'printar', 'renderizar', 'imprimir' conteúdo usando a sintaxe JS, temos a possibilidade de usar lógica com JS dentro desse arquivo `.ejs` - para isso usamos uma sintaxe bem semelhante: `<% ... %>`. Vamos criar alguns exemplos mais adiante.

**Informações capturadas na _view_**

De onde será que vem essa string `title`? Vamos olhar o arquivo `./App/routes/index.js` para descobrirmos. Temos o seguinte conteúdo no arquivo:

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

Há alguns pontos aos quais devemos nos atentar:

* Perceba que agora estamos usando o método `render()` ao invés do `send`. Esse método `render()` é justamente o que nos permite 'renderizar' o conteúdo com uma _view_ de acordo com a rota (ou _controller_, que já estamos utilizando).

* Esse método `render()` recebe - como primeiro argumento - o nome do arquivo da _view_ (não precisamos declarar nem o caminho inteiro nem a extensão, graças ao seguinte trecho do arquivo `app.js`: `app.set('views', path.join(__dirname, 'views'));`).

* Como segundo argumento, veja que estamos enviando um objeto, que contém justamente a propriedade `title`, que é exibida na _view_.

* Podemos usar arquivos `.ejs` por termos o seguinte trecho no `app.js`: `app.set('view engine', 'ejs');`. Eventualmente poderíamos utilizar outro _template view_ ou _template engine_ (como 'pug', por exemplo).

Agora que temos essa visão geral sobre os conceitos básicos de uma _view_, precisamos atualizar nosso _controller_ de usuários.

## 4. Controller - Parte II

Como vimos, precisamos alterar o método `send` do nosso _controller_ para `render` - e passamos o nome da `view` no _controller_ (o _Express_ já o buscará na pasta `views`). Também podemos alterar o valor de `title` (para vermos a alteração refletindo na rota de usuários) e acrescentar mais uma propriedade - `subtitle`, para 'brincarmos' um pouco mais. Nosso arquivo ficará assim:

```js
const controller = {
  index: (req, res, next) => res.render('users', {
    title: 'Usuários',
    subtitle: 'Página da view de Users'
  })
}

module.exports = controller
```

## 5. View - Parte II

Como adicionamos a propriedade `subtitle`, vamos utilizá-la em nossa _view_. Também acrescentaremos uma imagem estática (ou seja, está vindo do código diretamente).

**Conteúdo Estático**

Para adicionarmos arquivos estáticos (como a imagem que incluiremos ou mesmo como o arquivo CSS que está sendo carregado), basta incluirmos o caminho a partir da pasta `public` usando `/`. Isso é possível por conta do seguinte snippet em nosso app.js:

``` js
app.use(express.static(path.join(__dirname, 'public')));
```

**De volta para a view de usuários**

Bom, para incluirmos nosso `subtitle` e uma imagem estática, deixaremos nossa _view_ de usuários da seguinte forma:

```ejs
<!DOCTYPE html>
<html>

<head>
  <title><%= title %></title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body>
  <img src="/images/users.jpg" alt="Imagem de capa da view Users">
  <h1><%= title %></h1>
  <p><%= subtitle %></p>
</body>

</html>
```

## 6. Manipulando Objetos na View (com EJS)

Enquanto ainda não temos um Banco de Dados, vamos simular o conteúdo através de uma `const` que guarde um _array_ como um JSON. Vamos salvar essa `const` no nosso _controller_ de usuários:

```js
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
```

Claro, você pode trocar as informações da forma que preferir. **Importante:** salve as imagens a serem utilizadas dentro da pasta `./App/public/images/`.

Uma vez que temos nosso conteúdo de exemplo (`usersPlaceholder`), vamos refatorar nosso _controller_.

> **Lembre-se!** O _controller_ nada mais é do que um objeto cujas propriedades contêm os métodos a serem executados como _callback_ para cada rota.

Vale ressaltar ainda que, como ainda não entramos no método POST, estamos usando apenas rotas e _controllers_ com o método GET.

Bom, nosso objeto _controller_ deverá ficar assim (declarado logo após nossa `const` 'usersPlaceholder'):

```js
const controller = {
  index: (req, res, next) => res.render('users', {
    title: 'Usuários',
    subtitle: 'Página da view de Users',
    users: usersPlaceholder
  })
}
```

Agora temos um _array_ de usuários 'chegando' em nossa _view_ de usuários! Vamos entender como manipular esse _array_ de objetos dentro da própria _view_. Lembra daquela sintaxe `<% ... %>` que mencionamos algumas linhas acima? Chegou a hora de usá-la. :)

Como precisamos passar um objeto literal como segundo parâmetro do controller, salvamos aquele mesmo JSON/Array dentro do _controller_ e passamos como valor da propriedade `users` declarada no método `index` do controller de usuários.

Até poderíamos passar o próprio objeto de usuários dentro do método, mas como vamos usá-lo mais vezes, nosso código ficará mais organizado se declararmos a `const` de usuários fora e simplesmente passarmos como valor da propriedade `users`.

Repare, ainda, que precisamos chamar esse parâmetro através do nome da propriedade definida no método do controller (por isso usamos nomes distintos - `usersPlaceholder` e `users` - para que fique clara qual nome é utilizado em que trecho do código).

Basicamente faremos um _loop_ no objeto `users` dentro da nossa _view_. Para cada usuário dentro de `users`, 'printaremos' um `<article></article>` com as informações do usuário dentro de uma `<section></section>`:

```ejs
<!DOCTYPE html>
<html>

<head>
  <title><%= title %></title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>

<body>
<header><%= title %></header>
<main>

  <h1><%= title %></h1>
  <p><%= message %></p>

  <section class="users">

    <% for(let user of users) { %>

    <article id="userCard<%= user.id %>" class="user-card">
      <img src="<%= user.avatar %>" alt="Avatar do usuário <%= user.nome %>" class="user-avatar">
      <h3 class="user-name"><%= user.nome %> <%= user.sobrenome %></h3>
      <a href="/users/<%= user.id %>" class="user-btn">Ver Detalhes</a>
    </article>

    <% } %>

  </section>

</main>
```

Bacana né? Mas... repare que estamos repetindo o mesmo código (as tags _head_, _header_ e _footer_) mais de uma vez - na `index.ejs` e na `users.ejs`. Podemos melhorar isso!

___

## **DESAFIO I**

Incluir links para 'Usuários' e 'Produtos' no `header` da nossa aplicação.

___

## 7. Reaproveitando Código

Podemos reaproveitar código dentro de nossas _views_, facilitando assim inclusive a manuntenção do mesmo. Afinal, imagine se tivermos 20 páginas diferentes, cada uma com todo esse código repetido - se precisássemos alterar algo no menu, precisaríamos editar cada um dos arquivos. Então vamos aprender mais esse recurso do EJS.

Há um método chamado `include()`, onde podemos 'puxar' o código de certos arquivos para dentro de outro. A sintaxe é bem simples: `<%- include('outro-arquivo') %>` (não precisamos repetir o caminho todo nem declararmos a extensão).

É uma boa prática salvarmos esses 'trechos', que serão utilizados repetidamente, dentro de uma pasta que chamaremos de '_partials_'. Nesse passo tudo o que temos de fazer é 'recortar' os trechos repetidos (_head_, _header_ e _footer_) e colar nos respectivos arquivos parciais (`./App/views/partials/head.ejs`, `./App/views/partials/header.ejs` e `./App/views/partials/footer.ejs`).

Por fim, para importarmos trechos de código (_templates_ ou _snippets_) nas _views_ `index.ejs` e `users.ejs`, podemos usar a tag `<%- %>` e o método `include()`:

```ejs
<%- include('./partials/head') %>
<%- include('./partials/header') %>

<!-- Corpo do nosso arquivo -->

<%- include('./partials/footer') %>
```

Agora nossos arquivos estão muito mais limpos, legíveis, organizados e permitem escalonarmos e realizarmos a manutenção em nosso projeto muito mais facilmente!

## 8. Criando novas Rotas e Controllers de Usuários

Agora que já temos a visão macro, vamos incrementar nossas rotas e _controllers_ de usuários. Vamos criar as seguintes rotas e os respectivos _controllers_:

* Rota: `'/'` | Método no Controller: `index()` | Objetivo: listar todos os usuários

* Rota: `'/add'` | Método no Controller: `add()` | Objetivo: 'adicionar' um novo usuário

* Rota: `'/edit/:id'` | Método no Controller: `edit()` | Objetivo: 'editar' um usuário específico (através de seu ID)

* Rota: `'/delete/:id'` | Método no Controller: `delete()` | Objetivo: apagar um usuário específico (através de seu ID)

* Rota: `'/:id'` | Método no Controller: `show()` | Objetivo: exibir um usuário específico (através de seu ID)

*Notas*

1. Apesar de criarmos as rotas de adição, edição e exclusão de usuário, vamos apenas simular essas operações nessa prática.

2. Perceba que a rota referente ao método `show()` é a última. Isso para que o trecho 'add' da rota de adição de usuário não seja interpretada como um ID. Experimente posicionar a rota 'add' abaixo da 'show' e veja o que acontece.

3. A view espera receber todas as propriedades utilizadas pelos métodos dentro do _controller_, então caso não faça sentido usá-las, declare-as mas passe `null` como valor.

Vamos aproveitar e já isolar alguns dos trechos referentes a usuários dentro da pasta 'partials' também. Teremos o seguinte resultado após a implantação dessas rotas e métodos:


**./App/routes/users.js**

Rotas de usuários com cada um dos respectivos métodos:

```js
var express = require('express')
var router = express.Router()
var usersController = require('../controllers/users')

router.get('/', usersController.index)
router.get('/add', usersController.add)
router.get('/edit/:id', usersController.edit)
router.get('/delete/:id', usersController.delete)
router.get('/:id', usersController.show)

module.exports = router
```

**./App/controllers/users.js**

Nosso arquivo controlador de usuários (com um JSON dentro, já que ainda não entramos na parte de Banco de Dados).

Repare que podemos acessar as propriedades do nosso JSON dentro do nosso controlador, para podermos passar, por exemplo, o nome de um usuário.

```js
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

  index: (req, res, next) => {
    res.render('users', {
      title: `Usuários`,
      message: `Listagem de todos os usuários`,
      users: usersPlaceholder,
      id: null
    })
  },

  show: (req, res, next) => {
    res.render('users', {
      title: `${usersPlaceholder[req.params.id].nome} ${usersPlaceholder[req.params.id].sobrenome}`,
      message: `Dados do usuário #${req.params.id} - ${usersPlaceholder[req.params.id].nome} ${usersPlaceholder[req.params.id].sobrenome}`,
      users: usersPlaceholder,
      id: req.params.id
    })
  },

  add: (req, res, next) => {
    res.render('users', {
      title: `Novo Usuário`,
      message: `Adicionar novo usuário`,
      users: null,
      id: null
    })
  },

  edit: (req, res, next) => {
    res.render('users', {
      title: `Editar | ${usersPlaceholder[req.params.id].nome} ${usersPlaceholder[req.params.id].sobrenome}`,
      message: `Editar dados do usuário #${req.params.id} - ${usersPlaceholder[req.params.id].nome} ${usersPlaceholder[req.params.id].sobrenome}`,
      users: usersPlaceholder,
      id: req.params.id
    })
  },

  delete: (req, res, next) => {
    res.render('users', {
      title: `Excluir | ${usersPlaceholder[req.params.id].nome} ${usersPlaceholder[req.params.id].sobrenome}`,
      message: `Excluir dados do usuário #${req.params.id} - ${usersPlaceholder[req.params.id].nome} ${usersPlaceholder[req.params.id].sobrenome}`,
      users: usersPlaceholder,
      id: req.params.id
    })
  }
}

module.exports = controller
```

**./App/views/users.ejs**

Aqui estamos:

* Renderizando _strings_ a partir do objeto enviado (como _`title`_) | `<%= ... %>`

* Incluindo trechos de códigos (_head_, _header_, _footer_, _detalhes-usuario_ e _lista-usuarios_) | `<%- include('...') %>`

* Includindo lógica (condicional) para incluirmos ou não determinados trechos | `<% ... %>`

```ejs
<%- include('./partials/head.ejs') %>
<%- include('./partials/header.ejs') %>

<main>

  <h1><%= title %></h1>
  <p><%= message %></p>

  <% if (users && id) { %>
  <%- include('./partials/detalhe-usuario') %>
  <% } %>

  <% if (users) { %>
  <%- include('./partials/lista-usuarios') %>
  <% } %>

</main>

<%- include('./partials/footer.ejs') %>
```

**./App/views/partials/lista-usuarios.ejs**

Novamente estamos usando lógica dentro dessa _view_ parcial.

```ejs
<section class="users">

  <% for(let user of users) { %>

  <article id="userCard<%= user.id %>" class="user-card">
    <img src="<%= user.avatar %>" alt="Avatar do usuário <%= user.nome %>" class="user-avatar">
    <h3 class="user-name"><%= user.nome %> <%= user.sobrenome %></h3>
    <a href="/users/<%= user.id %>" class="user-btn">Ver Detalhes</a>
  </article>

  <% } %>

</section>
```

**./App/views/partials/detalhe-usuario.ejs**

E nesse arquivo utilizamos um `filter()` para filtrarmos um usuário específico a partir do ID.

**Repare!** Veja o caminho percorrido pelo ID, da rota, para o _controller_ e para a _view_ (`req.params.id` > `{id: req.params.id}` > `user.id`).

```ejs
<% let user = users.filter(user => user.id == id) %>

<section class="users">

  <article id="userCard<%= user[0].id %>" class="user-card">
    <img src="<%= user[0].avatar %>" alt="Avatar do usuário <%= user[0].nome %>" class="user-avatar">
    <h3 class="user-name"><%= user[0].nome %> <%= user[0].sobrenome %></h3>
    <div class="user-btn-group">
      <a href="/users/edit/<%= user[0].id %>" class="user-btn">Editar</a>
      <a href="/users/delete/<%= user[0].id %>" class="user-btn">Excluir</a>
    </div>
  </article>

</section>
```

___

## DESAFIO II

**PARTE I**

Incluir links para 'Usuários' e 'Produtos' no `header` da nossa aplicação.

**PARTE II**

Vamos replicar toda a lógica aplicada em usuários para **produtos**. No caso, iremos considerar a seguinte estrutura para um produto:

```js
{
  "id": 0,
  "titulo": "Título do Produto",
  "marca": "Marca do Produto",
  "preco": 999.99,
  "imagem": "/images/imagem-do-produto.png",
  "categoria": "Categoria do Produto"
}
```

**PARTE III**

Agora vamos adicionar mais um método ao _controller_ de produtos: **`filter`**.

Nesse caso não vamos - ainda - criar um objeto de categorias e torná-las dinâmicas nem relacioná-las com os produtos através de seus IDs. Faremos algo mais simples.

A ideia é que tenhamos um link no _header_ para cada uma das categorias que criar no JSON de produtos.

Ao clicar no link, o usuário é direcionado para uma listagem de produtos que pertençam àquela categoria específica (método `filter` a ser criado nessa parte do desafio).

**Dicas**

* A rota para filtrar produtos por categoria será `/categoria/:categoria`.

* Podemos passar o nome 'legível' no parâmetro `:categoria` da rota (ex.: 'Móveis e Decoração').

* Precisaremos filtrar de alguma maneira o _array_ que contém todos os produtos para gerarmos um _array_ que contenha apenas os produtos da categoria.

* Segue uma função de apoio para 'limparmos' a string e podermos realizar esse tratamento:

```js
const formattedString = string => string
  .replace(/á|ä|â|à|ã/gi,'a')
  .replace(/é|ë|ê|è/gi,'e')
  .replace(/í|ï|î|ì/gi,'i')
  .replace(/ó|ö|ô|ò|õ/gi,'o')
  .replace(/ú|ü|û|ù/gi,'u')
  .replace(/ç/gi,'c')
  .replace(/ /gi,'-')
  .toLowerCase()
```


**PARTE IV**

Aplique um estilo ao nosso projeto (pode ser algo básico, a ideia é apenas conferir certa identidade à nossa aplicação).

Para conferir as respostas do desafio, basta acessar a _branch_ 'DESAFIO' (a _branch_ será mergeada à `main` ao final da prática). =)