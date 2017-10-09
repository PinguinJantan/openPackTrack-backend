var express = require('express');
var router = express.Router();

let itemController = require('../controllers/itemController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('items'))


/* GET users listing. */
router.post('/create',itemController.create)
router.get('/all',itemController.all)

module.exports = router;
