var express = require('express');
var router = express.Router();

let returController = require('../controllers/returController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/retur/create Create
  * @apiGroup retur
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "returnNumber": "987hy98123",
  *      "description": "karton rusak",
  *      "innerId" : "1"
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} retur array dari retur
  * @apiParam {string} returnNumber nomer retur
  * @apiParam {text} description deskripsi retur
  * @apiParam {integer} innerId id inner
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *     {
  *       "success": true,
  *       "status": "OK",
  *       "retur": {
  *           "id": 12,
  *           "returnNumber": "987hy98123",
  *           "description": "carton rusak",
  *           "innerId": 7,
  *           "updatedAt": "2017-11-06T07:01:32.361Z",
  *           "createdAt": "2017-11-06T07:01:32.361Z"
  *         }
  *     },
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       retur: null
  *      }
**/
router.post('/create',returController.create)
/**
* @api {get} api/retur/all List retur
* @apiGroup retur
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*    {
*     "success": true,
*    "status": "OK",
*    "retur": [
*        {
*            "id": 12,
*            "returnNumber": "987hy98123",
*            "description": "carton rusak",
*            "innerId": 7,
*            "createdAt": "2017-11-06T07:01:32.361Z",
*            "updatedAt": "2017-11-06T07:01:32.361Z",
*            "Inner": {
*                "id": 7,
*                "barcode": "1212kj2",
*                "itemId": 3,
*                "cartonId": 3,
*                "isInStok": true,
*                "gradeId": 3,
*                "sourceId": 1,
*                "createdAt": "2017-11-04T07:34:03.555Z",
*                "updatedAt": "2017-11-04T07:34:03.555Z"
*            }
*        },
*        {
*            "id": 9,
*            "returnNumber": "987hy98123",
*            "description": "barang returan",
*            "innerId": 7,
*            "createdAt": "2017-11-04T08:51:13.195Z",
*            "updatedAt": "2017-11-04T08:51:13.195Z",
*            "Inner": {
*                "id": 7,
*                "barcode": "1212kj2",
*                "itemId": 3,
*                "cartonId": 3,
*                "isInStok": true,
*                "gradeId": 3,
*                "sourceId": 1,
*                "createdAt": "2017-11-04T07:34:03.555Z",
*                "updatedAt": "2017-11-04T07:34:03.555Z"
*            }
*        },
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       item: null
*      }
**/
router.get('/all',returController.all)

module.exports = router;
