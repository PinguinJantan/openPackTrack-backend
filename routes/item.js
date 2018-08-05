var express = require('express');
var router = express.Router();
var multer = require('multer');

let itemController = require('../controllers/itemController')
let aclMiddleware = require('../acl/aclMiddleware');

var upload = multer({ dest: '/tmp/' })

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/item/create Create
  * @apiGroup Item
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "barcode": "FGJ01FOCUB42",
  *      "code": "FGJ01FOCUB42",
  *      "size": "42",
  *      "skuId": "6"
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Object} item Object
  * @apiParam {String} code code untuk Item
  * @apiParam {String} barcode barcode untuk Item
  * @apiParam {Number} size ukuran item
  * @apiParam {Number} skuId ID SKU
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *        "success": true,
  *        "status": "OK",
  *        "item": {
  *            "id": 9,
  *            "code": "F0004",
  *            "size": 42,
  *            "updatedAt": "2017-12-09T11:47:56.426Z",
  *            "createdAt": "2017-12-09T11:47:56.426Z"
  *        }
  *    }
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
* @api {get} api/item/all All item
* @apiGroup Item
* @apiUse useToken
* @apiUse useSortDir
* @apiUse paginationParams
* @apiParam {String} [search] search by `size.name`, `sku.name`, `item.name`, and `color.name` field.
* @apiParam {String} [sortBy] sort by `updatedAt`, `code`, or `name`.
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
      {
          "success": true,
          "status": "OK",
          "pagination": {
              "total": 7,
              "pageCount": 1,
              "currentPage": 1,
              "hasNextPage": false,
              "hasPrevPage": false
          },
          "item": [
              {
                  "id": 1,
                  "code": "I122221",
                  "createdAt": "2017-12-05T17:31:36.541Z",
                  "updatedAt": "2017-12-05T17:31:36.541Z",
                  "size": "47",
                  "sku": {
                      "id": 1,
                      "code": "FGJ01FOCUB",
                      "name": "FOCUS B JR",
                      "category": "Tae Kwon Do",
                      "gender": "Junior",
                      "color": "Black/Black"
                  }
              },
              {
                  "id": 2,
                  "code": "I122222",
                  "createdAt": "2017-12-05T17:31:36.541Z",
                  "updatedAt": "2017-12-05T17:31:36.541Z",
                  "size": "47",
                  "sku": {
                      "id": 2,
                      "code": "FGJ01LATIO",
                      "name": "LATIO B",
                      "category": "Badminton",
                      "gender": "Junior",
                      "color": "Black/Black"
                  }
              }
          ]
      }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       item: null
*      }
**/
router.get('/all',itemController.paginatedAll)

/**
 * @api {get} item/export Export to CSV
 * @apiGroup Item
 * @apiParam {String} accessToken access token for authentication
 *
 * @apiSuccess {File} csv Exported csv
 */
router.get('/export', itemController.export)

/**
 * @api {get} item/:code Detail item
 * @apiGroup Item
 * @apiUse useToken
 *
 * @apiParam {String} code item code
 * @apiUse successBoolean
 * @apiSuccess {Object} item detail item object
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "item": {
        "id": 11740,
        "code": "FGW07VALLENBM40",
        "createdAt": "2018-02-07T04:55:41.507Z",
        "updatedAt": "2018-02-07T04:55:41.507Z",
        "size": {
            "id": 139,
            "name": "40"
        },
        "sku": {
            "id": 3290,
            "code": "FGW07VALLENBM",
            "name": "VALLEN BM ",
            "category": {
                "id": 24,
                "name": "FG,W,07"
            },
            "gender": {
                "id": 2,
                "name": "W"
            },
            "color": {
                "id": 28,
                "name": "Tidak tersedia"
            }
        }
    }
 }
 */
router.get('/:code', itemController.detail)

router.post('/update', itemController.update)

/**
 * @api {post} item/import Import from CSV
 * @apiGroup Item
 * @apiUse useToken
 *
 * @apiParam {File} ItemCSV csv file to be imported
 * @apiUse successBoolean
 * @apiSuccess {String} message
 * @apiSuccess {Number} importedItems imported items count
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "message": "Imported",
    "importedItems": 1467
 }
 */

router.post('/import', upload.single('ItemCSV'), itemController.import)


module.exports = router;
