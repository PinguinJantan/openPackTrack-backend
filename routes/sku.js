var express = require('express');
var router = express.Router();

let skuController = require('../controllers/skuController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))

router.post('/create',skuController.create)
router.get('/all',skuController.paginatedAll)
router.get('/list', skuController.list)


module.exports = router;
