var express = require('express')
var router = express.Router()
var controller = require('../controllers/products')

router.get('/', controller.index)
router.get('/add', controller.add)
router.get('/edit/:id', controller.edit)
router.get('/delete/:id', controller.delete)
router.get('/categoria/:categoria', controller.filter)
router.get('/:id', controller.show)

module.exports = router