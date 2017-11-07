var express = require('express');
var router = express.Router();

let innerDeliveryOrderController = require('../controllers/innerDeliveryOrderController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/innerDeliveryOrder/create Create
  * @apiGroup Inner Delivery Order
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "quantity": 10,
  *      "innerId": 7,
  *      "deliveryOrderId": 1,
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} innerDeliveryOrder array dari innerDeliveryOrder
  * @apiParam {integer} quantity jumlah inner yang dibutuhkan
  * @apiParam {integer} innerId id inner
  * @apiParam {integer} deliveryOrderId id deliveryOrder
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *      "success": true,
  *       "status": "OK",
  *       "innerDeliveryOrder": {
  *            "id": 1,
  *            "quantity": 10,
  *            "innerId": 7,
  *            "deliveryOrderId": 1,
  *            "updatedAt": "2017-11-07T16:00:44.480Z",
  *            "createdAt": "2017-11-07T16:00:44.480Z"
  *          }
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       innerDeliveryOrder: null
  *      }
**/
router.post('/create',innerDeliveryOrderController.create)
/**
* @api {get} api/innerDeliveryOrder/all List innerDeliveryOrder
* @apiGroup Inner Delivery Order
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*     {
*      "success": true,
*      "status": "OK",
*      "innerDeliveryOrder": [
*         {
*             "id": 1,
*             "quantity": 10,
*             "innerId": 7,
*             "deliveryOrderId": 1,
*             "createdAt": "2017-11-07T16:00:44.480Z",
*             "updatedAt": "2017-11-07T16:00:44.480Z",
*             "Inner": {
*                 "id": 7,
*                 "barcode": "1212kj2",
*                 "itemId": 3,
*                 "cartonId": 3,
*                 "isInStok": true,
*                 "gradeId": 3,
*                 "sourceId": 1,
*                 "createdAt": "2017-11-04T07:34:03.555Z",
*                 "updatedAt": "2017-11-04T07:34:03.555Z"
*             },
*             "DeliveryOrder": {
*                 "id": 1,
*                 "number": "312312312",
*                 "createdAt": "2017-11-06T12:20:39.116Z",
*                 "updatedAt": "2017-11-06T12:20:39.116Z"
*             }
*         }
*       ]
*      }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       innerDeliveryOrder: null
*      }
**/
 router.get('/all',innerDeliveryOrderController.all)

module.exports = router;
