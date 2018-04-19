var express = require('express');
var router = express.Router();

let categoryController = require('../controllers/categoryController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('category'))


/* GET users listing. */
/**
  * @api {post} api/category/create Create
  * @apiGroup Category
  * @apiUse useToken
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "name": "running"
  *  }
  * @apiUse successBoolean
  * @apiSuccess {Object} created category object
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
* @api {get} api/category/list List category
* @apiGroup Category
* @apiUse useToken
* @apiUse successBoolean
* @apiSuccess {Object[]} categories categories
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*    {
*    "success": true,
*    "categories": [
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
*     ]
*   }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       item: null
*      }
**/
router.get('/list',categoryController.all)

/**
 * @api {post} category/update Update a Category
 * @apiGroup Category
 * @apiUse useToken
 *
 * @apiParam {Number} id Category ID
 * @apiParam {String} name Category name
 * @apiUse successBoolean
 * @apiSuccess {Object} category updated Category data
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "category": {
         "id": 12,
         "name": "FG,M,04",
         "createdAt": "2018-01-28T13:51:38.461Z",
         "updatedAt": "2018-02-27T16:34:09.634Z"
     }
 }

 @apiErrorExample {json} Category name already exist
 {
     "success": false,
     "errors": [
         {
             "message": "name must be unique",
             "type": "unique violation",
             "path": "name",
             "value": "FG,M,04"
         }
     ]
 }
 */
router.post('/update', categoryController.update)

/**
 * @api {delete} category/delete Delete Category
 * @apiGroup Category
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {String} message
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "message": "Category deleted"
 }
 */
router.delete('/delete', categoryController.delete)

/**
 * @api {get} category/:categoryId Detail Category
 * @apiGroup Category
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} category Category data
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "category": {
         "id": 12,
         "name": "FG,M,04",
         "createdAt": "2018-01-28T13:51:38.390Z",
         "updatedAt": "2018-01-28T13:51:38.390Z",
     }
 }
 * @apiErrorExample {json} not found
 {
    "success": true,
    "message": "Category not found"
}
 */
router.get('/:categoryId', categoryController.detail)

module.exports = router;
