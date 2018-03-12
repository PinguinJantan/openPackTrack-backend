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
  *      "code": "FGJ01FOCUB",
  *      "sizeId": "18",
  *      "skuId": "6"
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} item array dari item
  * @apiParam {string} sku nomor sku item
  * @apiParam {integer} categoryId id kategori item
  * @apiParam {string} name nama item
  * @apiParam {string} color warna item
  * @apiParam {string} size ukuran item
  * @apiParam {string} gender gender item (M,W,JR)
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *        "success": true,
  *        "status": "OK",
  *        "item": {
  *            "id": 9,
  *            "code": "F0004",
  *            "sizeId": 18,
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
* @apiHeader {String} token token untuk login user
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
              "itemTotal": 7,
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

router.get('/export', itemController.export)

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
