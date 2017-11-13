var express = require('express');
var router = express.Router();

let innerController = require('../controllers/innerController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/inner/create Create
  * @apiGroup Inner
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "barcode": "1212kj2",
  *      "categoryId": 7,
  *      "isInStok": 1,
  *      "gradeId": "1",
  *      "sourceId": "2",
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} inner array dari inner
  * @apiParam {string} barcode barcode inner
  * @apiParam {integer} categoryId id kategori inner
  * @apiParam {Boolean} isInStok status stok inner
  * @apiParam {integer} gradeId id grade inner
  * @apiParam {string} sourceId id source inner
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *      "success": true,
  *      "status": "OK",
  *      "inner": {
  *          "id": 44,
  *          "barcode": "1212kj2",
  *          "itemId": 3,
  *          "cartonId": 7,
  *          "isInStok": true,
  *          "gradeId": 1,
  *          "sourceId": 3,
  *          "updatedAt": "2017-10-30T12:49:01.130Z",
  *          "createdAt": "2017-10-30T12:49:01.130Z"
  *        }
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       inner: null
  *      }
**/
router.post('/create',innerController.create)
/**
* @api {get} api/inner/all List inner
* @apiGroup Inner
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*     {
    "success": true,
    "status": "OK",
    "inner": [
        {
            "id": 39,
            "barcode": "1212kj2",
            "itemId": 3,
            "cartonId": 7,
            "isInStok": true,
            "gradeId": 1,
            "sourceId": 3,
            "createdAt": "2017-10-30T10:15:23.232Z",
            "updatedAt": "2017-10-30T10:15:23.232Z",
            "Carton": {
                "id": 7,
                "barcode": "1212kj2",
                "warehouseId": 1,
                "createdAt": "2017-10-27T10:31:04.431Z",
                "updatedAt": "2017-10-27T10:31:04.431Z",
                "Warehouse": {
                    "id": 1,
                    "name": "warehouse a",
                    "address": "jl lorem ipsum bla bla bla",
                    "createdAt": "2017-10-27T10:04:43.681Z",
                    "updatedAt": "2017-10-27T10:04:43.681Z"
                }
            },
            "Item": {
                "id": 3,
                "sku": "122223",
                "categoryId": 1,
                "name": "CRV B",
                "color": "Hitam/ Hitam",
                "size": "47",
                "gender": "M",
                "createdAt": "2017-10-26T15:45:16.625Z",
                "updatedAt": "2017-10-26T15:45:16.625Z",
                "Category": {
                    "id": 1,
                    "name": "Tae Kwon Do",
                    "createdAt": "2017-10-26T15:45:16.611Z",
                    "updatedAt": "2017-10-26T15:45:16.611Z"
                }
            },
            "InnerGrade": {
                "id": 1,
                "name": "A",
                "createdAt": "2017-10-28T17:37:29.118Z",
                "updatedAt": "2017-10-28T17:37:29.118Z"
            },
            "InnerSource": {
                "id": 3,
                "name": "Factory B",
                "createdAt": "2017-10-30T09:57:50.808Z",
                "updatedAt": "2017-10-30T09:57:50.808Z"
            }
        },
        {
            "id": 44,
            "barcode": "1212kj2",
            "itemId": 3,
            "cartonId": 7,
            "isInStok": true,
            "gradeId": 1,
            "sourceId": 3,
            "createdAt": "2017-10-30T12:49:01.130Z",
            "updatedAt": "2017-10-30T12:49:01.130Z",
            "Carton": {
                "id": 7,
                "barcode": "1212kj2",
                "warehouseId": 1,
                "createdAt": "2017-10-27T10:31:04.431Z",
                "updatedAt": "2017-10-27T10:31:04.431Z",
                "Warehouse": {
                    "id": 1,
                    "name": "warehouse a",
                    "address": "jl lorem ipsum bla bla bla",
                    "createdAt": "2017-10-27T10:04:43.681Z",
                    "updatedAt": "2017-10-27T10:04:43.681Z"
                }
            },
            "Item": {
                "id": 3,
                "sku": "122223",
                "categoryId": 1,
                "name": "CRV B",
                "color": "Hitam/ Hitam",
                "size": "47",
                "gender": "M",
                "createdAt": "2017-10-26T15:45:16.625Z",
                "updatedAt": "2017-10-26T15:45:16.625Z",
                "Category": {
                    "id": 1,
                    "name": "Tae Kwon Do",
                    "createdAt": "2017-10-26T15:45:16.611Z",
                    "updatedAt": "2017-10-26T15:45:16.611Z"
                }
            },
            "InnerGrade": {
                "id": 1,
                "name": "A",
                "createdAt": "2017-10-28T17:37:29.118Z",
                "updatedAt": "2017-10-28T17:37:29.118Z"
            },
            "InnerSource": {
                "id": 3,
                "name": "Factory B",
                "createdAt": "2017-10-30T09:57:50.808Z",
                "updatedAt": "2017-10-30T09:57:50.808Z"
            }
        }
    ]
}
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       inner: null
*      }
**/
 router.get('/all',innerController.all)

module.exports = router;
