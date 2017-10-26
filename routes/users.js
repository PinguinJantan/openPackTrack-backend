var express = require('express');
var router = express.Router();

let userController = require('../controllers/userController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('user'))

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', userController.usersWithRoles)
router.post('/role/create', userController.addRole)
router.post('/role/assign', userController.addRoleToUser)
router.get('/:username', userController.userDetail)
router.get('/role/:roleName', userController.roleDetail)


module.exports = router;
