var express = require('express');
var router = express.Router();

let userController = require('../controllers/userController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('user'))

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



/**
 * @api {get} user/all Get all users
 * @apiGroup User
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object[]} users user data
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "users": [
        {
            "name": "arnaz",
            "username": "sikun",
            "hasRole": true,
            "roles": [
                [
                    "admin"
                ]
            ]
        },
        {
            "name": "Diky Arga",
            "username": "dikyarga",
            "hasRole": true,
            "roles": [
                [
                    "admin"
                ]
            ]
        },
    ]
  }
 */
router.get('/all', userController.usersWithRoles)

/**
 * @api {post} user/role/create Create new role
 * @apiGroup ACL
 * @apiUse useToken
 *
 * @apiParam {String} rolename Role name
 * @apiParam {json} permissions JSON string of permissionss
 *
 *@apiSuccessExample {json} success
 {
    "success": true,
    "message": "berhasil menambahkan role",
    "permissions": {
        "roles": "scientist",
        "allows": [
            {
                "resources": "user",
                "permissions": [
                    "GET"
                ]
            },
            {
                "resources": "item",
                "permission": [
                    "GET",
                    "POST"
                ]
            }
        ]
    }
  }
 *
 */
router.post('/role/create', userController.addRole)

/**
 * @api {post} user/role/delete Delete an existing role
 * @apiGroup ACL
 * @apiUse useToken
 *
 * @apiParam {String} rolename Role name
 *
 * @apiSuccessExample {json} success
   {
      "success": true,
      "message": "Berhasil menghapus role scientist"
   }
 *
 */
router.post('/role/delete', userController.removeRole)

/**
 * @api {post} user/role/assign Assign a user to a role
 * @apiGroup ACL
 * @apiUse useToken
 *
 * @apiParam {String} role Role name
 * @apiParam {String} userId user ID to be assigned
 *
 * @apiSuccessExample {json} success
 {
     "success": true,
     "message": "role successfully assigned to user",
     "user": {
         "username": "mnirfan",
         "name": "Nurul Irfan"
     },
     "role": "admin"
 }
 *@apiErrorExample {json} user not found
 {
    "success": false,
    "message": "User not found"
}
 */
router.post('/role/assign', userController.addRoleToUser)

/**
 * @api {get} user/:username Get user detail
 * @apiGroup User
 * @apiUse useToken
 *
 * @apiParam {String} username username
 *
 * @apiSuccessExample {json} success
 {
   "success": true,
   "user": {
       "id": 1,
       "name": "Nurul Irfan",
       "username": "mnirfan",
       "email": "hello@nurulirfan.com",
       "identityNumber": "A11.2014.08363",
       "roles": [
           "admin"
       ]
   }
}
 *
 * @apiErrorExample {json} User not found
 {
    "success": false,
    "message": "User irfan not found"
}
 */
router.get('/:username', userController.userDetail)

/**
 * @api {get} user/role/:roleName Get role detail
 * @apiGroup ACL
 * @apiUse useToken
 *
 * @apiParam {String} roleName role name
 *
 * @apiSuccessExample {json} success
 {
     "success": true,
     "role": {
         "name": "admin",
         "resources": [
             {
                 "name": "user",
                 "permission": [
                     "GET",
                     "POST",
                     "DELETE"
                 ]
             },
             {
                 "name": "item",
                 "permission": [
                     "GET",
                     "POST",
                     "DELETE"
                 ]
             }
         ]
     }
 }
 *
 * @apiErrorExample {json} Role not found
 {
     "success": false,
     "message": "Role admins not found"
 }
 */
router.get('/role/:roleName', userController.roleDetail)

/**
 * @api {get} user/role/:roleName:/resource Get role resource permission
 * @apiGroup ACL
 * @apiUse useToken
 *
 * @apiParam {String} roleName role name
 * @apiParam {String} resource resource name
 *
 * @apiSuccessExample {json} success
 {
 "success": true,
 "resource": {
     "name": "user",
     "permissions": [
         "GET",
         "POST",
         "DELETE"
     ]
 }
}
 *
 * @apiErrorExample {json} not found or no permission
 {
    "success": false,
    "message": "Resource users not found or no access permission for admin"
}
 */
router.get('/role/:roleName/:resource', userController.roleDetailResource)

/**
 * @api {post} user/role/resouce/allow Give resource access to a role
 * @apiDescription operation will always succeeded even if resource or permission doesn't exist before
 * @apiGroup ACL
 * @apiUse useToken
 *
 * @apiParam {String} role role name
 * @apiParam {String} resource resource name
 * @apiParam {String[]} permissions permissions (POST, GET, DELETE, etc)
 *
 * @apiSuccessExample {json} success
 {
    "success": true,
    "message": "izin akses diberikan",
    "acl": {
        "role": "LOL",
        "resource": "barrack",
        "permissions": [
            "POST"
        ]
    }
}
 *
 * @apiErrorExample {json} role not found
 {
      "success": false,
      "message": "Role LOLa not found."
  }
 */
router.post('/role/resource/allow', userController.allowRoleToResource)

/**
 * @api {post} user/role/resouce/revoke Revoke resource access from a role
 * @apiDescription operation will always succeeded even if permission doesn't has permission before or resource doesn't exist
 * @apiGroup ACL
 * @apiUse useToken
 *
 * @apiParam {String} role role name
 * @apiParam {String} resource resource name
 * @apiParam {String[]} permissions permissions (POST, GET, DELETE, etc)
 *
 * @apiSuccessExample {json} success
 {
    "success": true,
    "message": "izin dicabut",
    "acl": {
        "role": "LOL",
        "resource": "box",
        "permissions": [
            "UPDATE"
        ]
    }
 }
 *
 * @apiErrorExample {json} role not found
 {
     "success": false,
     "message": "Role LOLa not found."
 }
 */
router.post('/role/resource/revoke', userController.revokeAccessRoleToResource)


module.exports = router;
