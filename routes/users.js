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
router.post('/role/delete', userController.removeRole)
router.post('/role/assign', userController.addRoleToUser)
router.get('/:username', userController.userDetail)
router.get('/role/:roleName', userController.roleDetail)
router.get('/role/:roleName/:resource', userController.roleDetailResource)
router.post('/role/resource/allow', userController.allowRoleToResource)
router.post('/role/resource/revoke', userController.revokeAccessRoleToResource)


module.exports = router;
