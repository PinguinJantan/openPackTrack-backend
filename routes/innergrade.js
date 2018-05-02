var express = require('express');
var router = express.Router();

let innerGradeController = require('../controllers/innerGradeController')
let aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'))


/* GET users listing. */
/**
  * @api {post} api/innergrade/create Create
  * @apiGroup Inner Grade
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "name": "A",
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} innerGrade array dari innerGrade
  * @apiParam {string} name nama innerGrade
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  *     "success": true,
  *     "status": "OK",
  *     "innerGrade": {
  *        "id": 4,
  *        "name": "C",
  *        "updatedAt": "2017-10-30T09:02:58.603Z",
  *        "createdAt": "2017-10-30T09:02:58.603Z"
  *  }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       item: null
  *
**/
router.post('/create',innerGradeController.create)
/**
* @api {get} api/innergrade/all List innerGrade
* @apiGroup Inner Grade
* @apiHeader {String} token token untuk login user
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
*      "success": true,
*      "status": "OK",
*      "innerGrade": [
*        {
*            "id": 1,
*            "name": "A",
*            "createdAt": "2017-10-28T17:37:29.118Z",
*            "updatedAt": "2017-10-28T17:37:29.118Z"
*        },{
*            "id": 2,
*            "name": "B",
*            "createdAt": "2017-10-28T17:37:29.118Z",
*            "updatedAt": "2017-10-28T17:37:29.118Z"
*        },
*    ]
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       item: null
*      }
**/
 router.get('/all',innerGradeController.all)
 /**
 * @api {get} api/innergrade/:id Detail innerGrade
 * @apiGroup Inner Grade
 * @apiHeader {String} token token untuk login user
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
 *     }
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *      "success": true,
 *      "status": "OK",
 *      "innerGrade": {
 *            "id": 1,
 *            "name": "A",
 *            "createdAt": "2017-10-28T17:37:29.118Z",
 *            "updatedAt": "2017-10-28T17:37:29.118Z"
 *        }
 * @apiErrorExample {json} Internal Server Error
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       success: false,
 *       status: "ERROR",
 *       item: null
 *      }
 **/
 router.get('/:id',innerGradeController.detail)
 /**
  * @api {post} innergrade/update Update a innergrade
  * @apiGroup inner Grade
  * @apiUse useToken
  *
  * @apiParam {Integer} id innergrade ID
  * @apiParam {string} name nama innergrade
  * @apiUse successBoolean
  * @apiSuccess {Object} innerGrade updated innergrade data
  * @apiSuccessExample {json} success example
  {
        "success": true,
        "message": ''Update innerGrade with id 2 success'',
        "warehouse": {
              "id": 1,
              "name": "Grade A",
              "createdAt": "2018-03-21T14:44:18.006Z",
              "updatedAt": "2018-03-21T14:44:18.006Z"
       }
  }

  @apiErrorExample {json} innerGrade name already exist
  {
      "success": false,
      "innerGrade": warehouse with id 12 not found
  }
  */
 router.post('/update',innerGradeController.update)
 /**
  * @api {delete} innergrade/delete Delete warehouse
  * @apiGroup inner Grade
  * @apiUse useToken
  *
  * @apiParam {integer} id id inner grade
  * @apiUse successBoolean
  * @apiSuccess {String} message
  * @apiSuccessExample {json} success example
  {
      "success": true,
      "message": "innerGrade deleted"
  }
  */
 router.delete('/delete',innerGradeController.delete)

module.exports = router;
