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
  *      "cartonId": 1
  *  }
  * @apiUse successBoolean
  * @apiSuccess {Object} created profile object
  * @apiParam {integer} count jumlah sepatu dalam carton
  * @apiParam {enum} type type profile (solid,mix)
  * @apiParam {integer} cartonId id carton
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *     {
            "success": true,
            "profile": {
            "message": "Create success"
                "id": 2,
                "count": 12,
                "cartonId": 1,
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
*    {
  *    "success": true,
       "profile": [
          {
              "id": 1,
              "count": 10,
              "cartonId": 1,
              "type": "solid",
              "createdAt": "2018-03-21T14:44:18.006Z",
              "updatedAt": "2018-03-21T14:44:18.006Z"
          },
          {
              "id": 2,
              "count": 12,
              "cartonId": 1,
              "type": "mix",
              "createdAt": "2018-03-21T14:45:37.969Z",
              "updatedAt": "2018-03-21T14:45:37.969Z"
          }
      ]
*   }
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       profile: null
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
          "cartonId": 1,
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
 * @api {get} profile/:profileId Detail profile
 * @apiGroup profile
 * @apiUse useToken
 *
 * @apiUse successBoolean
 * @apiSuccess {Object} profile profile data
 * @apiSuccessExample {json} success example
 {
     "success": true,
     "profile": {
                 "id": 1,
                 "count": 10,
                 "cartonId": 1,
                 "type": "solid",
                 "createdAt": "2018-03-21T14:44:18.006Z",
                 "updatedAt": "2018-03-21T14:44:18.006Z"
             },
 }
 * @apiErrorExample {json} not found
 {
    "success": false,
    "message": "profile not found"
}
 */
router.get('/', profileController.detail)

module.exports = router;
