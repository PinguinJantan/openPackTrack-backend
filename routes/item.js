var express = require('express');
var router = express.Router();

let itemController = require('../controllers/itemController')


/* GET users listing. */
router.post('/create',itemController.create)
router.get('/all',itemController.all)

module.exports = router;
