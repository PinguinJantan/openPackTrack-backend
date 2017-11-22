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
  *      "sku": "FGJ01FOCUB",
  *      "categoryId": 4,
  *      "name": "castelo",
  *      "color": "Blue/Silver",
  *      "size": "49",
  *      "gender": "M"
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
  *      "success": true,
  *      "status": "OK",
  *      "item": {
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
  *       item: null
  *      }
**/
router.post('/create',itemController.create)
/**
* @api {get} api/item/all List item
* @apiGroup Item
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
*       item: null
*      }
**/
router.get('/all',itemController.all)

router.get('/paginated', itemController.paginatedAll)

router.get('/:sku', itemController.detail)

router.post('/update', itemController.update)

router.post('/import', upload.single('ItemCSV'), itemController.import)

module.exports = router;
