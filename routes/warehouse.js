var express = require('express');
var router = express.Router();

let warehouseController = require('../controllers/warehouseController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('items'))


/* GET users listing. */
/**
  * @api {post} api/warehouse/create Create
  * @apiGroup Warehouse
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "name": "Warehouse B",
  *      "address": "jl lorem ipsum bla bla bla",
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} warehouse array dari warehouse
  * @apiParam {string} name nama warehouse
  * @apiParam {string} address alamat warehouse
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    "success": true,
  *    "status": "OK",
  *    "warehouse": {
  *      "id": 5,
  *      "name": "Warehouse B",
  *      "address": "jl lorem ipsum bla bla bla",
  *      "updatedAt": "2017-10-30T05:57:50.643Z",
  *      "createdAt": "2017-10-30T05:57:50.643Z"
  *  }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       warehouse: null
  *      }
**/
router.post('/create',warehouseController.create)
/**
* @api {get} api/warehouse/all List warehouse
* @apiGroup Warehouse
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*     {
*        "id": 1,
*        "name": "warehouse a",
*        "address": "jl lorem ipsum bla bla bla",
*        "createdAt": "2017-10-27T10:04:43.681Z",
*        "updatedAt": "2017-10-27T10:04:43.681Z",
*        "Cartons": [
*            {
*                "id": 7,
*                "barcode": "1212kj2",
*                "warehouseId": 1,
*                "createdAt": "2017-10-27T10:31:04.431Z",
*                "updatedAt": "2017-10-27T10:31:04.431Z"
*            },
*            {
*                "id": 9,
*                "barcode": "1231231",
*                "warehouseId": 1,
*                "createdAt": "2017-10-30T05:14:33.876Z",
*                "updatedAt": "2017-10-30T05:14:33.876Z"
*            }
*        ]
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       warehouse: null
*      }
**/
 router.get('/all',warehouseController.all)

module.exports = router;
