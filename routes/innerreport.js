var express = require('express');
var router = express.Router();

let innerReportController = require('../controllers/innerReportController')
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
router.post('/bulkcreate',innerReportController.bulkCreateOpname)

module.exports = router;
