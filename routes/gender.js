var express = require('express');
var router = express.Router();

let genderController = require('../controllers/genderController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))

router.get('/list', genderController.list)

module.exports = router
