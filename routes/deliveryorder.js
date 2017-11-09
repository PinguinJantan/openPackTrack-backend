var express = require('express');
var router = express.Router();

let deliveryOrderController = require('../controllers/deliveryOrderController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/deliveryorder/create Create
  * @apiGroup Delivery Order
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "number": "312312312",
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} deliveryorder array dari deliveryorder
  * @apiParam {string} number nomer deliveryorder
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *     {
  *       "success": true,
  *       "status": "OK",
  *       "deliveryorder": {
  *           "id": 12,
  *           "number": "312312312",
  *           "updatedAt": "2017-11-06T07:01:32.361Z",
  *           "createdAt": "2017-11-06T07:01:32.361Z"
  *         }
  *     },
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       deliveryorder: null
  *      }
**/
router.post('/create',deliveryOrderController.create)
/**
* @api {get} api/deliveryorder/all List deliveryorder
* @apiGroup Delivery Order
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*    {
*      "success": true,
*       "status": "OK",
*       "deliveryOrder": [
*          {
*            "id": 1,
*            "number": "312312312",
*            "createdAt": "2017-11-06T12:20:39.116Z",
*            "updatedAt": "2017-11-06T12:20:39.116Z"
*          },
*          {
*            "id": 2,
*            "number": "312312312",
*            "createdAt": "2017-11-06T12:21:06.945Z",
*            "updatedAt": "2017-11-06T12:21:06.945Z"
*          }
*        ]
*        },
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       item: null
*      }
**/
 router.get('/all',deliveryOrderController.all)

module.exports = router;
