var express = require('express');
var router = express.Router();

let genderController = require('../controllers/genderController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))

/**
* @api {get} api/gender/list List genders
* @apiGroup Gender
* @apiUse useToken
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*    {
  *    "success": true,
       "genders": [
          {
              "id": 1,
              "name": "M"
          },
          {
              "id": 2,
              "name": "F"
          }
      ]
*   }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       error: {}
*      }
**/
router.get('/list', genderController.list)

module.exports = router
