var express = require('express');
var router = express.Router();

let reportController = require('../controllers/reportController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))

router.post('/create',reportController.create)
module.exports = router;
