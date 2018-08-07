var express = require('express');
var router = express.Router();

let skuController = require('../controllers/skuController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))

/**
 * @api {post} sku/create Create new SKU
 * @apiGroup SKU
 * @apiUse useToken
 *
 * @apiParam {Number} code SKU code
 * @apiParam {String} name SKU name
 * @apiParam {Number} category Category
 * @apiParam {Number} color Color
 * @apiParam {Number} gender Gender
 * @apiUse successBoolean
 * @apiSuccess {Object} sku new SKU data
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "sku": {
        "id": 3503,
        "code": "FGW04IMUTZB",
        "name": "IMUTZ B",
        "categoryId": 2,
        "colorId": 1,
        "genderId": 2,
        "updatedAt": "2018-02-26T16:01:20.721Z",
        "createdAt": "2018-02-26T16:01:20.721Z"
    }
}

 @apiErrorExample {json} SKU already exist
 {
     "success": false,
     "errors": [
         {
             "message": "code must be unique",
             "type": "unique violation",
             "path": "code",
             "value": "FGW04IMUTZB"
         }
     ]
 }
 */

router.post('/create',skuController.create)

/**
 * @api {get} sku/all Get All SKU
 * @apiGroup SKU
 * @apiUse useToken
 *
 * @apiUse useSortDir
 * @apiUse paginationParams
 * @apiUse successBoolean
 * @apiParam {String} [search] string to search in `sku.name` dan `sku.code` field.
 * @apiParam {String} [sortBy] available: `updatedAt`, `code`, `name`.
 * @apiSuccess {Object} skus List of SKU
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "pagination": {
        "total": 217,
        "pageCount": 22,
        "currentPage": 1,
        "hasNextPage": true,
        "hasPrevPage": false
    },
    "skus": [
        {
            "id": 3260,
            "code": "FGM07JUNCR",
            "name": "JUNCTION R",
            "category": {
                "id": 21,
                "name": "FG,M,07"
            },
            "color": {
                "id": 53,
                "name": "WHITE/RED"
            },
            "gender": {
                "id": 1,
                "name": "M"
            }
        }
    ]
  }
 */
router.get('/all',skuController.paginatedAll)

/**
 * @api {get} sku/list Get SKU list
 * @apiGroup SKU
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} skus List of all SKUs
 * @apiSuccessExample {json} success example
 {
    "success": true,
    "skus": [
        {
            "id": 3260,
            "name": "JUNCTION R"
        },
        {
            "id": 3264,
            "name": "KJS TR"
        },
    ]
 }
 */
router.get('/list', skuController.list)

/**
 * @api {post} sku/update Update an SKU
 * @apiGroup SKU
 * @apiUse useToken
 *
 * @apiParam {Number} id SKU ID
 * @apiParam {Number} code SKU code
 * @apiParam {String} name SKU name
 * @apiParam {Number} categoryId Category ID
 * @apiParam {Number} colorId Color ID
 * @apiParam {Number} genderId Gender ID
 * @apiUse successBoolean
 * @apiSuccess {Object} sku updated SKU data
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "sku": {
         "id": 3497,
         "code": "FGW04IMUTZB",
         "name": "IMUTZ B",
         "categoryId": "2",
         "colorId": "1",
         "genderId": "2",
         "createdAt": "2018-01-28T13:51:38.461Z",
         "updatedAt": "2018-02-27T16:34:09.634Z"
     }
 }

 @apiErrorExample {json} SKU code already exist
 {
     "success": false,
     "errors": [
         {
             "message": "code must be unique",
             "type": "unique violation",
             "path": "code",
             "value": "FGW04IMUTZP"
         }
     ]
 }
 */
router.post('/update', skuController.update)

/**
 * @api {get} sku/:skuId Detail SKU
 * @apiGroup SKU
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} sku SKU data
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "sku": {
         "id": 3479,
         "code": "FGM07KJS3W",
         "name": "KJS3 W",
         "createdAt": "2018-01-28T13:51:38.390Z",
         "updatedAt": "2018-01-28T13:51:38.390Z",
         "category": {
             "id": 21,
             "name": "FG,M,07"
         },
         "color": {
             "id": 53,
             "name": "WHITE/RED"
         },
         "gender": {
             "id": 1,
             "name": "M"
         }
     }
 }
 * @apiErrorExample {json} not found
 {
    "success": true,
    "message": "SKU not found",
    "sku": null
}
 */
router.get('/:skuId', skuController.detail)

/**
 * @api {delete} sku/delete Delete SKU
 * @apiGroup SKU
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {String} message
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "message": "SKU deleted"
 }
 */
router.delete('/delete', skuController.delete)


module.exports = router;
