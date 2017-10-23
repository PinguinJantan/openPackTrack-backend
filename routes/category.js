var express = require('express');
var router = express.Router();

let categoryController = require('../controllers/categoryController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('category'))


/* GET users listing. */
/**
  * @api {post} api/category/create Create
  * @apiGroup category
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "name": "running"
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} category array dari category
  * @apiParam {string} name nama category
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *     {
  *       "success": true,
  *       "status": "OK",
  *       "category": {
  *           "id": 22,
  *           "name": "running",
  *           "updatedAt": "2017-10-06T09:15:17.193Z",
  *           "createdAt": "2017-10-06T09:15:17.193Z"
  *     },
  *       "message": "Create success"
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       item: null
  *      }
**/
router.post('/create',categoryController.create)
/**
* @api {get} api/category/all List category
* @apiGroup category
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*    {
*    "success": true,
*    "status": "OK",
*    "category": [
*        {
*            "id": 4,
*            "name": "Tae Kwon Do",
*            "createdAt": "2017-10-03T12:02:22.377Z",
*            "updatedAt": "2017-10-03T12:02:22.377Z"
*        },
*        {
*            "id": 5,
*            "name": "Badminton",
*            "createdAt": "2017-10-03T12:02:22.377Z",
*            "updatedAt": "2017-10-03T12:02:22.377Z"
*        }
*    "message": ""
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       item: null
*      }
**/
router.get('/all',categoryController.all)

module.exports = router;
