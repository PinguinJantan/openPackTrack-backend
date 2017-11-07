var express = require('express');
var router = express.Router();

let outputController = require('../controllers/outputController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/output/create Create
  * @apiGroup output
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "sku": "FGJ01FOCUB",
  *      "categoryId": 4,
  *      "name": "castelo",
  *      "color": "Blue/Silver",
  *      "size": "49",
  *      "gender": "M"
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} output array dari output
  * @apiParam {string} sku nomor sku output
  * @apiParam {integer} categoryId id kategori output
  * @apiParam {string} name nama output
  * @apiParam {string} color warna output
  * @apiParam {string} size ukuran output
  * @apiParam {string} gender gender output (M,W,JR)
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *    {
  *      "success": true,
  *      "status": "OK",
  *      "output": {
  *          "id": 2,
  *          "sku": "FGJ01FOCUB",
  *          "categoryId": 4,
  *          "name": "castelo",
  *          "color": "Blue/Silver",
  *          "size": "49",
  *          "gender": "M",
  *          "updatedAt": "2017-10-05T13:03:50.747Z",
  *          "createdAt": "2017-10-05T13:03:50.747Z"
  *          }
  *      }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       output: null
  *      }
**/
router.post('/create',outputController.create)
/**
* @api {get} api/output/all List output
* @apiGroup output
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*     {
*        "id": 1,
*        "sku": "123134",
*        "categoryId": 4,
*        "name": "muller",
*        "color": "merah pink",
*        "size": "48",
*        "gender": "running",
*        "createdAt": "2017-10-23T03:37:16.542Z",
*        "updatedAt": "2017-10-23T03:37:16.542Z",
*        "Category": {
*            "id": 4,
*            "name": "Casual",
*            "createdAt": "2017-10-23T03:32:47.423Z",
*            "updatedAt": "2017-10-23T03:32:47.423Z"
*        }
*    },
*    {
*        "id": 3,
*        "sku": "123136",
*        "categoryId": 5,
*        "name": "castelo",
*        "color": "merah biru",
*        "size": "48",
*        "gender": "asd",
*        "createdAt": "2017-10-26T13:20:19.416Z",
*        "updatedAt": "2017-10-26T13:20:19.416Z",
*        "Category": {
*            "id": 5,
*            "name": "Hiking",
*            "createdAt": "2017-10-23T03:32:47.423Z",
*            "updatedAt": "2017-10-23T03:32:47.423Z"
*        }
*    }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       output: null
*      }
**/
router.get('/all',outputController.all)

module.exports = router;
