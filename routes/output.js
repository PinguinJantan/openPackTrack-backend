var express = require('express');
var router = express.Router();

let outputController = require('../controllers/outputController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/output/create Create
  * @apiGroup Output
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "deliveryOrderId": 1,
  *      "innerId": 7
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} output array dari output
  * @apiParam {integer} deliveryOrderId id deliveryOrder
  * @apiParam {integer} innerId id inner
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *        "success": true,
  *        "status": "OK",
  *        "output": {
  *              "id": 5,
  *              "deliveryOrderId": 1,
  *              "innerId": 7,
  *              "updatedAt": "2017-11-07T09:49:14.925Z",
  *              "createdAt": "2017-11-07T09:49:14.925Z"
  *            }
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       output: null
  *      }
**/
router.post('/create',outputController.create)
/**
* @api {get} api/output/all List output
* @apiGroup Output
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*     {
*    "success": true,
*    "status": "OK",
*    "output": [
*        {
*            "id": 5,
*            "deliveryOrderId": 1,
*            "innerId": 7,
*            "createdAt": "2017-11-07T09:49:14.925Z",
*            "updatedAt": "2017-11-07T09:49:14.925Z",
*            "Inner": {
*                "id": 7,
*                "barcode": "1212kj2",
*                "itemId": 3,
*                "cartonId": 3,
*                "isInStok": true,
*                "gradeId": 3,
*                "sourceId": 1,
*                "createdAt": "2017-11-04T07:34:03.555Z",
*                "updatedAt": "2017-11-04T07:34:03.555Z"
*              },
*            "DeliveryOrder": {
*                "id": 1,
*                "number": "312312312",
*                "createdAt": "2017-11-06T12:20:39.116Z",
*                "updatedAt": "2017-11-06T12:20:39.116Z"
*              }
*          }
*      ]
*    }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       output: null
*      }
**/
router.get('/all',outputController.all)

module.exports = router;
