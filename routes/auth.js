var express = require('express');
var router = express.Router();

let authController = require('../controllers/authController')

/* GET users listing. */
router.post('/register', authController.register);
router.post('/login',authController.login);

module.exports = router;
