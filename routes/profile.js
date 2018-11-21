var express = require('express');
var router = express.Router();

let profileController = require('../controllers/profileController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/profile/create Create
  * @apiGroup profile
  * @apiUse useToken
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "count": 10
  *      "type": solid
  *  }
  * @apiUse successBoolean
  * @apiSuccess {Object} created profile object
  * @apiParam {integer} count jumlah sepatu dalam carton
  * @apiParam {enum} type type profile (solid,mix)
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *     {
            "success": true,
            "profile": {
            "message": "Create success"
                "id": 2,
                "count": 12,
                "type": "mix",
                "updatedAt": "2018-03-21T14:45:37.969Z",
                "createdAt": "2018-03-21T14:45:37.969Z"

  *     },
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       item: null
  *      }
**/
router.post('/create',profileController.create)
/**
* @api {get} api/profile/list List profile
* @apiGroup profile
* @apiUse useToken
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*       {
          "success": true,
          "profiles": [
            {
              "id": 4,
              "name": "Solid Super STAR",
              "mixAmount": null,
              "type": "solid",
              "createdAt": "2018-07-29T13:03:40.000Z",
              "updatedAt": "2018-07-29T13:03:40.000Z",
              "profileItem": [
                {
                  "itemId": 10310,
                  "amount": 12,
                  "item": {
                    "skuId": 3308,
                    "sizeId": 2,
                    "sku": {
                      "name": "SUPER STAR B JR"
                    },
                    "size": {
                      "name": "31"
                    }
                  }
                }
              ]
            }
          ]
*       }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       error: {}
*      }
**/
router.get('/list',profileController.all)

/**
 * @api {post} profile/update Update a profile
 * @apiGroup profile
 * @apiUse useToken
 *
 * @apiParam {Integer} id profile ID
 * @apiParam {integer} count jumlah sepatu dalam carton
 * @apiParam {enum} type type profile (solid,mix)
 * @apiParam {integer} cartonId id carton
 * @apiUse successBoolean
 * @apiSuccess {Object} profile updated profile data
 * @apiSuccessExample {json} success example
 {
       "success": true,
       "message": 'Update Success',
       "profile": {
          "id": 2,
          "count": "10",
          "type": "mix",
          "createdAt": "2018-03-21T14:45:37.969Z",
          "updatedAt": "2018-03-21T15:04:37.347Z"
      }
 }

 @apiErrorExample {json} profile name already exist
 {
     "success": false,
     "profile": {

          }
 }
 */
router.post('/update', profileController.update)

/**
 * @api {delete} profile/delete Delete profile
 * @apiGroup profile
 * @apiUse useToken
 *
 * @apiParam {integer} id id profile
 * @apiUse successBoolean
 * @apiSuccess {String} message
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "message": "profile deleted"
 }
 */
router.delete('/delete', profileController.delete)

/**
 * @api {delete} profile/:id Detail profile
 * @apiGroup profile
 * @apiUse useToken
 *
 * @apiParam {integer} id id profile
 * @apiUse successBoolean
 * @apiSuccess {Object} profile profile data
 * @apiSuccessExample {json} success example
{
    "success": true,
    "profile": {
        "id": 17,
        "name": "Assort 1",
        "mixAmount": null,
        "type": "assort",
        "createdAt": "2018-08-05T14:03:13.689Z",
        "updatedAt": "2018-08-05T14:03:13.689Z",
        "profileItem": [
            {
                "id": 8,
                "itemId": 10314,
                "amount": 4,
                "item": {
                    "id": 10314,
                    "code": "FGJ01SUPERB35",
                    "sizeId": 133,
                    "skuId": 3308,
                    "barcode": "FGJ01SUPERB35",
                    "sku": {
                        "id": 3308,
                        "code": "FGJ01SUPERB",
                        "name": "SUPER STAR B JR",
                        "categoryId": 13,
                        "colorId": 23,
                        "genderId": 3
                    },
                    "size": {
                        "id": 133,
                        "name": "35"
                    }
                }
            },
            {
                "id": 7,
                "itemId": 10310,
                "amount": 8,
                "item": {
                    "id": 10310,
                    "code": "FGJ01SUPERB31",
                    "sizeId": 2,
                    "skuId": 3308,
                    "barcode": "FGJ01SUPERB31",
                    "sku": {
                        "id": 3308,
                        "code": "FGJ01SUPERB",
                        "name": "SUPER STAR B JR",
                        "categoryId": 13,
                        "colorId": 23,
                        "genderId": 3
                    },
                    "size": {
                        "id": 2,
                        "name": "31"
                    }
                }
            }
        ]
    }
}
 * @apiErrorExample {json} Internal Server Error
 {
    "success": false,
    "message": "..."
}
 */
router.get('/:id', profileController.detail)

module.exports = router;
