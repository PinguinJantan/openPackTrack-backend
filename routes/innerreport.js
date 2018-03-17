var express = require('express');
var router = express.Router();

let innerReportController = require('../controllers/innerReportController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* POST Inner Report Creating Opname. */
/**
  * @api {post} api/innerreport/scancarton Opname
  * @apiGroup Inner Report
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "cartonBarcode": "1212kj2",
  *      "reportId": 7
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} innerReport array dari inner
  * @apiParam {string} cartonBarcode barcode carton
  * @apiParam {integer} reportId id report
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *        "success": true,
           "message": "opname success",
           "status": "OK"
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       inner: null
  *      }
**/
router.post('/scancarton',innerReportController.bulkCreateOpname)

/* POST Inner Report Creating. */
/**
  * @api {post} api/innerreport/create Create With innerId
  * @apiGroup Inner Report
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "innerId": "9",
  *      "reportId": 7
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} innerReport array dari inner
  * @apiParam {string} innerId id inner
  * @apiParam {integer} reportId id report
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
        "success": true,
        "message": "create report success",
        "status": "OK",
        "innerReport": {
            "id": 215,
            "innerId": 9,
            "reportId": 13,
            "updatedAt": "2018-03-12T15:28:28.660Z",
            "createdAt": "2018-03-12T15:28:28.660Z"
        }
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       innerReport: null
  *      }
**/
router.post('/create',innerReportController.create)
/* GET Opname Listing. */
/**
  * @api {get} api/innerreport/all List Opname (paginated)
  * @apiGroup Inner Report
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {Array} pagination paginasi
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} innerReport array dari inner
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
        "success": true,
           "message": "Request success",
           "pagination": {
               "innerReportTotal": 16,
               "pageCount": 2,
               "currentPage": 1,
               "hasNextPage": true,
               "hasPrevPage": false
           },
           "status": "OK",
           "innerReport": [
               {
                   "id": 212,
                   "innerId": 7,
                   "reportId": 13,
                   "report": {
                       "id": 13,
                       "createdAt": "2017-12-12T09:53:00.979Z",
                       "updatedAt": "2017-12-12T09:53:00.979Z"
                   }
               },
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       innerReport: null
  *      }
**/
router.get('/all', innerReportController.all)

module.exports = router;
