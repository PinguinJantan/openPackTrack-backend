var express = require('express');
var router = express.Router();

let colorController = require('../controllers/colorController')
let aclMiddleware = require('../acl/aclMiddleware');

/**
 * @apiDefine useToken
 * @apiHeader {String} Authorization user login token
 */

 /**
  * @apiDefine successBoolean
  * @apiSuccess {Boolean} success operation success or not
  */

router.use(aclMiddleware.isAllowedToAccess('category'))

/**
 * @api {post} color/create Create new color
 * @apiGroup Color
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} color new color data
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "color": {
         "id": 10,
         "name": "Black / Blue",
         "updatedAt": "2018-01-15T13:14:09.172Z",
         "createdAt": "2018-01-15T13:14:09.172Z"
     }
 }

 @apiErrorExample {json} Empty name
 {
     "success": false,
     "message": "Please don't give blank name"
 }

 @apiErrorExample {json} Color already exist
 {
     "success": false,
     "message": "Operation failed with error(s)",
     "errors": [
         {
             "message": "name must be unique",
             "type": "unique violation",
             "path": "name",
             "value": "Red / Blue"
         }
     ]
 }
 */

router.post('/create', colorController.create)

/**
 * @api {post} color/all Get all colors (paginated)
 * @apiGroup Color
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} pagination Pagination detail
 * @apiSuccess {Object[]} colors Colors in current page
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "pagination": {
         "colorTotal": 2,
         "pageCount": 1,
         "currentPage": 1,
         "hasNextPage": false,
         "hasPrevPage": false
     },
     "colors": [
         {
             "id": 2,
             "name": "Black/Citroon",
             "createdAt": "2017-12-09T12:43:14.030Z",
             "updatedAt": "2017-12-09T12:43:14.030Z"
         },
         {
             "id": 3,
             "name": "Lime/Gray",
             "createdAt": "2017-12-09T12:43:14.030Z",
             "updatedAt": "2017-12-09T12:43:14.030Z"
         }
     ]
 }
 */

router.get('/all', colorController.all)

/**
 * @api {post} color/update update an exisiting color
 * @apiGroup Color
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} color updated color data
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "color": {
         "id": "1",
         "name": "Black / White"
     }
 }

 @apiErrorExample {json} ID not a number
 {
     "success": false,
     "message": "Color ID must be a number"
 }

 @apiErrorExample {json} No color with given ID
 {
    "success": false,
    "message": "No color with ID 100"
 }
 */

router.post('/update', colorController.update)

/**
 * @api {get} color/:colorId Get color detail by ID
 * @apiDescription if color with given ID not found, the the color object will filled with null.
 * @apiGroup Color
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} color color data
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "color": {
        "id": 1,
        "name": "Black/White",
        "createdAt": "2017-12-09T12:43:14.030Z",
        "updatedAt": "2017-12-09T12:43:14.030Z"
    }
 }

 @apiErrorExample {json} ID not a number
 {
     "success": false,
     "message": "Color ID must be a number"
 }
 */

router.get('/:colorId', colorController.detail)

/**
 * @api {delete} color/delete Delete a color
 * @apiDescription if an exisiting color is deleted, colorDeleted will be 1. if no color with given ID, colorDeleted will be 0.
 * @apiGroup Color
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} colorDeleted how many colors deleted
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "colorDeleted": 1
 }

 @apiErrorExample {json} Constraint Error
 {
 "success": false,
 "error": "SequelizeForeignKeyConstraintError",
 "message": "Color with id 4 is being used. Can't perform delete."
 }

 @apiErrorExample {json} ID not a number
 {
     "success": false,
     "message": "Color ID must be a number"
 }

 */

router.delete('/delete', colorController.delete)

module.exports = router
