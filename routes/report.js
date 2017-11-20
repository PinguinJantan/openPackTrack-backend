var express = require('express');
var router = express.Router();

let reportController = require('../controllers/reportController')
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
  *      "warehouseId": 1
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} carton array dari carton
  * @apiParam {string} barcode nomor sku carton
  * @apiParam {integer} warehouseId id kategori carton
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *     "id": 9,
  *     "barcode": "1231231",
  *     "warehouseId": 1,
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
router.post('/opname',reportController.bulkCreateOpname)
module.exports = router;
