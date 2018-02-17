var express = require('express');
var router = express.Router();

let skuController = require('../controllers/skuController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))

/**
 * @api {post} sku/create Add new SKU
 * @apiGroup SKU
 * @apiUse useToken
 *
 * @apiParam {String} code SKU code
 * @apiParam {String} name SKU name
 * @apiParam {String} categoryId category ID
 * @apiParam {Number} colorId color ID
 * @apiParam {Number} genderId gender ID
 * @apiUse successBoolean
 * @apiSuccess {Object} sku created SKU
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "sku": {
         "id": 3501,
         "code": "FGW04IMUTZB",
         "name": "IMUTZ B",
         "categoryId": 2,
         "colorId": 1,
         "genderId": 2,
         "updatedAt": "2018-02-16T15:00:21.574Z",
         "createdAt": "2018-02-16T15:00:21.574Z"
     }
 }
 */

router.post('/create',skuController.create)
router.get('/all',skuController.paginatedAll)
router.get('/list', skuController.list)


module.exports = router;
