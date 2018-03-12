var express = require('express');
var router = express.Router();

let reportController = require('../controllers/reportController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))
/* POST Create Report. */
/**
  * @api {post} api/report/create Create
  * @apiGroup Report
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {

  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} report
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *       "success": true,
          "status": "OK",
          "message": "Create Report Success",
          "report": {
              "id": 147,
              "updatedAt": "2018-03-12T14:35:16.771Z",
              "createdAt": "2018-03-12T14:35:16.771Z"
            }
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       report: null
  *      }
**/
router.post('/create',reportController.create)
/* GET listing Report. */
/**
  * @api {get} api/report/all List
  * @apiGroup Report
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {

  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} report
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
        "success": true,
           "message": "Request success",
           "pagination": {
               "reportTotal": 136,
               "pageCount": 14,
               "currentPage": 1,
               "hasNextPage": true,
               "hasPrevPage": false
           },
           "report": [
               {
                   "id": 17,
                   "createdAt": "2017-12-12T16:56:14.401Z",
                   "updatedAt": "2017-12-12T16:56:14.401Z",
                   "innerReport": [
                       {
                           "id": 195,
                           "innerId": 18,
                           "createdAt": "2018-02-10T08:00:14.384Z",
                           "updatedAt": "2018-02-10T08:00:14.384Z",
                           "inner": {
                               "barcode": "zxc",
                               "createdAt": "2017-12-11T17:32:28.054Z",
                               "updatedAt": "2017-12-11T17:32:28.054Z",
                               "item": {
                                   "code": "I122221"
                               },

  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       report: null
  *      }
**/
router.get('/all',reportController.all)
module.exports = router;
