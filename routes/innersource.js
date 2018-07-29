var express = require('express');
var router = express.Router();

let innerSourceController = require('../controllers/innerSourceController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/innersource/create Create
  * @apiGroup Inner Source
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "name": "factory",
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} innerSource array dari innerSource
  * @apiParam {string} name nama innerSource
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *       "id": 2,
  *       "name": "Factory A",
  *       "updatedAt": "2017-10-30T09:56:01.672Z",
  *       "createdAt": "2017-10-30T09:56:01.672Z"
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       item: null
  *      }
**/
router.post('/create',innerSourceController.create)
/**
* @api {get} api/innersource/all List innerSource
* @apiGroup Inner Source
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*     {
*        "success": true,
*        "status": "OK",
*        "innerSource": [
*        {
*            "id": 2,
*            "name": "Factory A",
*            "createdAt": "2017-10-30T09:56:01.672Z",
*            "updatedAt": "2017-10-30T09:56:01.672Z"
*        },
*        {
*            "id": 3,
*            "name": "Factory B",
*            "createdAt": "2017-10-30T09:57:50.808Z",
*            "updatedAt": "2017-10-30T09:57:50.808Z"
*        }
*      ]
*    }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       item: null
*      }
**/
 router.get('/all',innerSourceController.all)

module.exports = router;
