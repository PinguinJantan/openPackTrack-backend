var express = require('express');
var router = express.Router();

let cartonController = require('../controllers/cartonController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/carton/create Create
  * @apiGroup Carton
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "barcode": "1231231",
  *      "warehouseId": 1,
  *      "profileId": 1
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} carton array dari carton
  * @apiParam {string} barcode nomor sku carton
  * @apiParam {integer} warehouseId id kategori carton
  * @apiParam {integer} profileId id profile carton
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *     "id": 9,
  *     "barcode": "1231231",
  *     "warehouseId": 1,
  *     "profileId": 1,
  *     "updatedAt": "2017-10-30T05:14:33.876Z",
  *     "createdAt": "2017-10-30T05:14:33.876Z"
  *   }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       carton: null
  *      }
**/
router.post('/create',cartonController.create)
/**
  * @api {get} api/carton/all List carton
  * @apiGroup Carton
  * @apiUse useToken
  * @apiUse useSortDir
  * @apiUse paginationParams
  * @apiUse successBoolean
  * @apiParam {String} [search] search by `carton.barcode` field.
  * @apiParam {String} [sortBy] sort by `updatedAt` or `barcode`.
  * @apiSuccess {Object[]} cartons carton objects
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiSuccessExample {json} Success
  {
      "success": true,
      "pagination": {
          "total": 7,
          "pageCount": 1,
          "currentPage": 1,
          "hasNextPage": false,
          "hasPrevPage": false
      },
      "cartons": [
          {
              "id": 3,
              "barcode": "CAAA",
              "createdAt": "2018-02-07T04:55:24.000Z",
              "updatedAt": "2018-02-07T04:55:24.000Z",
              "profile": {
                  "id": 2,
                  "count": 12,
                  "type": "solid"
              },
              "warehouse": {
                  "id": 2,
                  "name": "Main",
                  "address": "Jl Raya"
              }
          },
          {
              "id": 4,
              "barcode": "BOXAAA",
              "createdAt": "2018-03-21T15:09:58.314Z",
              "updatedAt": "2018-03-21T15:09:58.314Z",
              "profile": {
                  "id": 2,
                  "count": 12,
                  "type": "solid"
              },
              "warehouse": {
                  "id": 2,
                  "name": "Main",
                  "address": "Jl Raya"
              }
          },
          {
              "id": 12,
              "barcode": "MMMM",
              "createdAt": "2018-04-05T01:08:15.677Z",
              "updatedAt": "2018-04-05T01:08:15.677Z",
              "profile": {
                  "id": 2,
                  "count": 12,
                  "type": "solid"
              },
              "warehouse": null
          },
          {
              "id": 13,
              "barcode": "AAAA",
              "createdAt": "2018-04-05T14:12:55.879Z",
              "updatedAt": "2018-04-05T14:12:55.879Z",
              "profile": {
                  "id": 2,
                  "count": 12,
                  "type": "solid"
              },
              "warehouse": null
          },
          {
              "id": 53,
              "barcode": "AAAX",
              "createdAt": "2018-04-06T16:02:03.376Z",
              "updatedAt": "2018-04-06T16:02:03.376Z",
              "profile": {
                  "id": 2,
                  "count": 12,
                  "type": "solid"
              },
              "warehouse": null
          },
          {
              "id": 60,
              "barcode": "AAAXZZ",
              "createdAt": "2018-04-06T17:15:55.857Z",
              "updatedAt": "2018-04-06T17:15:55.857Z",
              "profile": {
                  "id": 2,
                  "count": 12,
                  "type": "solid"
              },
              "warehouse": null
          },
          {
              "id": 63,
              "barcode": "AAAXZZYZZ",
              "createdAt": "2018-04-06T17:32:52.046Z",
              "updatedAt": "2018-04-06T17:32:52.046Z",
              "profile": {
                  "id": 2,
                  "count": 12,
                  "type": "solid"
              },
              "warehouse": null
          }
      ]
  }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       carton: null
  *      }
**/
 router.get('/all',cartonController.all)

 /**
  * @api {get} api/carton/ping/:barcode Ping a carton box
  * @apiGroup Carton
  * @apiUse useToken
  *
  * @apiUse successBoolean
  * @apiSuccess {String} exist carton exists in database or not
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
 router.get('/ping/:barcode/', cartonController.ping)

 /**
  * @api {get} api/carton/:barcode Get carton detail by barcode
  * @apiGroup Carton
  * @apiUse useToken
  *
  * @apiUse successBoolean
  * @apiSuccess {Object} carton carton data
  * @apiSuccessExample {json} success example
  {
    "success": true,
    "carton": {
        "id": 4,
        "barcode": "BOXAAA",
        "warehouseId": 2,
        "createdAt": "2018-03-21T15:09:58.314Z",
        "updatedAt": "2018-03-21T15:09:58.314Z"
    }
  }
  */
 router.get('/:barcode', cartonController.detail)
 /* GET users listing. */
 /**
   * @api {post} api/carton/repack Repack
   * @apiGroup Carton
   * @apiHeader {String} token token untuk login user
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
   *     }
   * @apiParamExample {json} Request-Example:
   *  {
   *      "barcode": "1231231",
   *      "warehouseId": 1,
   *      "profileId": 1,
          "repackCartonId":[1,2]
   *  }
   * @apiSuccess {Boolean} success true jika berhasil
   * @apiSuccess {string} status "OK" jika berhasil
   * @apiSuccess {Array} carton array dari carton
   * @apiParam {string} barcode nomor sku carton
   * @apiParam {integer} warehouseId id kategori carton
   * @apiParam {integer} profileId id profile carton
   * @apiParam {object[]} repackCartonId array id carton yang di repack
   example:`[1,2]`
   * @apiSuccessExample {json} success
   *     HTTP/1.1 200 OK
   *    {
   *     "success": true
         "message": "repack success"
   *   }
   * @apiErrorExample {json} inner more than 12
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       success: false,
   *       message: "inner more than 12"
   *      }
 **/
 router.post('/repack',cartonController.repack)

module.exports = router;
