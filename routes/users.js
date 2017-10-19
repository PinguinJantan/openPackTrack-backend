var express = require('express');
var router = express.Router();

let userController = require('../controllers/userController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('users'))

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', userController.usersWithRoles)
router.post('/role/create', userController.addRole)


module.exports = router;
