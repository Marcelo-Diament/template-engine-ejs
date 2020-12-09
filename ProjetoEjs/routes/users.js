var express = require('express');
var router = express.Router();
var userController = require('../controllers/users')

router.get('/', userController.index);
router.get('/add', userController.add);
router.get('/edit/:id', userController.edit);
router.get('/delete/:id', userController.delete);
router.get('/:id', userController.show);

module.exports = router;
