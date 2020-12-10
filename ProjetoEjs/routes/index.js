var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express + EJS',
    message: 'Página Inicial do nosso Projeto',
    topImage: 'https://expressjs.com/images/express-facebook-share.png'
  });
});

module.exports = router;
