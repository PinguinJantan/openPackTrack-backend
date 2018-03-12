var express = require('express');
var router = express.Router();

let sizeController = require('../controllers/sizeController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))

router.get('/list', sizeController.list)

/**
 * @api {post} size/create Create new size
 * @apiGroup Size
 * @apiUse useToken
 *
 * @apiParam {Number} name unit size
 * @apiUse successBoolean
 * @apiSuccess {Object} size new size data
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "size": {
         "id": 26,
         "name": "37",
         "updatedAt": "2018-01-18T09:00:39.605Z",
         "createdAt": "2018-01-18T09:00:39.605Z"
     }
 }

 @apiErrorExample {json} Empty size
 {
     "success": false,
     "message": "Please don't give blank size"
 }

 @apiErrorExample {json} Size already exist
 {
     "success": false,
     "message": "Operation failed with error(s)",
     "errors": [
         {
             "message": "name must be unique",
             "type": "unique violation",
             "path": "name",
             "value": "1"
         }
     ]
 }
 */

router.post('/create', sizeController.create)

/**
 * @api {get} size/all Get all size (paginated)
 * @apiDescription to use the pagination: size/all?limit=x&page=y
 * @apiGroup Size
 * @apiUse useToken
 *
 * @apiParam {Number} [limit] limit size object per page
 * @apiParam {Number} [page] number of page to display
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} pagination Pagination detail
 * @apiSuccess {Object[]} sizes Sizes in current page
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "pagination": {
        "sizeTotal": 2,
        "pageCount": 1,
        "currentPage": 1,
        "hasNextPage": false,
        "hasPrevPage": false
    },
    "sizes": [
        {
            "id": 1,
            "name": "30",
            "createdAt": "2017-12-09T12:43:14.000Z",
            "updatedAt": "2017-12-09T12:43:14.000Z"
        },
        {
            "id": 2,
            "name": "31",
            "createdAt": "2017-12-09T12:43:14.000Z",
            "updatedAt": "2017-12-09T12:43:14.000Z"
        }
    ]
}
 */

router.get('/all', sizeController.all)

/**
 * @api {post} size/update update an exisiting size
 * @apiGroup Size
 * @apiUse useToken
 *
 * @apiParam {Number} id size ID
 * @apiParam {Number} name unit size
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} size updated size data
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "size": {
         "id": "1",
         "name": "30"
     }
 }

 @apiErrorExample {json} ID not a number
 {
     "success": false,
     "message": "Size ID must be a number"
 }

 @apiErrorExample {json} No size with given ID
 {
    "success": false,
    "message": "No size with ID 100"
 }
 */

router.post('/update', sizeController.update)

/**
 * @api {delete} size/delete Delete a size
 * @apiDescription if an exisiting size is deleted, sizeDeleted will be 1. if no size with given ID, sizeDeleted will be 0.
 * @apiGroup Size
 * @apiUse useToken
 *
 * @apiParam {Number} id size ID
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} sizeDeleted how many size deleted
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "sizeDeleted": 1
 }

 @apiErrorExample {json} Constraint Error
 {
 "success": false,
 "error": "SequelizeForeignKeyConstraintError",
 "message": "Size with id 4 is being used. Can't perform delete."
 }

 @apiErrorExample {json} ID not a number
 {
     "success": false,
     "message": "Size ID must be a number"
 }

 */

router.delete('/delete', sizeController.delete)

/**
 * @api {get} size/:sizeId Get size detail by ID
 * @apiDescription if size with given ID not found, the the size object will filled with null.
 * @apiGroup Size
 * @apiUse useToken
 *
 * @apiParam {Number} sizeId size ID
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} size size data
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "color": {
        "id": 1,
        "name": "30",
        "createdAt": "2017-12-09T12:43:14.000Z",
        "updatedAt": "2018-01-18T10:30:14.433Z"
    }
 }

 @apiErrorExample {json} ID not a number
 {
     "success": false,
     "message": "Size ID must be a number"
 }
 */

router.get('/:sizeId', sizeController.detail)

module.exports = router;
