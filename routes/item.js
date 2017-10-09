var express = require('express');
var router = express.Router();

let itemController = require('../controllers/itemController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('items'))


/* GET users listing. */
/**
  * @api {post} api/item/create Create
  * @apiGroup item
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "sku": "FGJ01FOCUB",
  *      "categoryId": 4,
  *      "name": "castelo",
  *      "color": "Blue/Silver",
  *      "size": "49",
  *      "genre": "M"
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} item array dari item
  * @apiParam {string} sku nomor sku item
  * @apiParam {integer} categoryId id kategori item
  * @apiParam {string} name nama item
  * @apiParam {string} color warna item
  * @apiParam {string} size ukuran item
  * @apiParam {string} genre genre item (M,W,JR)
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *      "success": true,
  *      "status": "OK",
  *      "item": {
  *          "id": 2,
  *          "sku": "FGJ01FOCUB",
  *          "categoryId": 4,
  *          "name": "castelo",
  *          "color": "Blue/Silver",
  *          "size": "49",
  *          "genre": "M",
  *          "updatedAt": "2017-10-05T13:03:50.747Z",
  *          "createdAt": "2017-10-05T13:03:50.747Z"
  *          }
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       item: null
  *      }
**/
router.post('/create',itemController.create)
/**
* @api {get} api/item/all List item
* @apiGroup item
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*    {
*        "id": 1,
*        "sku": "CUBFGJ01FO",
*        "categoryId": 4,
*        "name": "castelo",
*        "color": "Blue/Red",
*        "size": "46",
*        "genre": "JR",
*        "createdAt": "2017-10-03T13:03:26.774Z",
*        "updatedAt": "2017-10-03T13:03:26.774Z"
*    },
*    {
*        "id": 2,
*        "sku": "FGJ01FOCUB",
*        "categoryId": 4,
*        "name": "castelo",
*        "color": "Blue/Silver",
*        "size": "49",
*        "genre": "M",
*        "createdAt": "2017-10-05T13:03:50.747Z",
*        "updatedAt": "2017-10-05T13:03:50.747Z"
*    }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       item: null
*      }
**/
router.get('/all',itemController.all)

module.exports = router;
