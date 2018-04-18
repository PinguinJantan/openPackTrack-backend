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
  *      "cartonId": 7,
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
* @apiUse useToken
* @apiUse paginationParams
* @apiUse useSortDir
* @apiParam {String} [search] string to search in `inner.barcode`, `carton.barcode`, `warehouse.name`, and `item.code` field.
* @apiParam {String} [sortBy] available: `updatedAt`, `item`, `carton`, `stock`, `grade`, or `source`.
* @apiUse successBoolean
* @apiSuccess {Object[]} inners Inners object
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
* {
    "success": true,
    "pagination": {
        "innerTotal": 16,
        "pageCount": 2,
        "currentPage": 1,
        "hasNextPage": true,
        "hasPrevPage": false
    },
    "inners": [
        {
            "barcode": "MASK",
            "isInStok": null,
            "createdAt": "2018-04-06T17:32:52.076Z",
            "updatedAt": "2018-04-06T17:32:52.076Z",
            "carton": {
                "id": 63,
                "barcode": "AAAXZZYZZ",
                "profileId": 2,
                "warehouseId": null,
                "warehouse": null
            },
            "item": {
                "id": 10310,
                "code": "FGJ01SUPERB31",
                "sizeId": 2,
                "skuId": 3308
            },
            "innerGrade": null,
            "innerSource": null
        }
    ]
}
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       inners: null
*      }
**/
 router.get('/all',innerController.all)

 /**
  * @api {get} inner/input-scan Input scan (with carton box)
  * @apiGroup Inner
  * @apiUse useToken
  * @apiParam {String} cartonBarcode carton barcode
  * @apiParam {Object[]} innerCodes inner barcode and item code.

  example: `[{"barcode": "CODE123",  "itemCode": "FGJ01SUPERB31"}, {"barcode": "CODE124",  "itemCode": "FGJ01SUPERB31"}]`
  *
  * @apiUse successBoolean
  * @apiSuccessExample {json} success example
  {
    "success": true
  }
  * @apiErrorExample {json} exist example
  {
    "success": false,
    "errors": {
        "message": "innerbox already exist"
    }
  }
  */
router.post('/input-scan', innerController.inputScan)

 /**
  * @api {get} inner/ping/:barcode Ping an inner box
  * @apiGroup Inner
  * @apiUse useToken
  *
  * @apiUse successBoolean
  * @apiSuccess {String} exist inner exists in database or not
  * @apiSuccessExample {json} success example
  {
    "success": true,
    "exist": true
  }
  * @apiErrorExample {json} already exist
  {
    "success": true,
    "exist": false
  }
  */
router.get('/ping/:barcode/', innerController.ping)

/**
 * @api {get} inner/:barcode Get inner detail by barcode

 * @apiGroup Inner
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} carton carton object
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "carton": {
        "id": 13,
        "barcode": "AAAA",
        "warehouseId": null,
        "createdAt": "2018-04-05T14:12:55.879Z",
        "updatedAt": "2018-04-05T14:12:55.879Z"
    }
 }
 */
router.get('/:barcode', innerController.detail)


module.exports = router;
