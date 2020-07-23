const express = require('express');
const router = express.Router();
const loggerController = require('../controllers/loggerController');
const aclMiddleware = require('../acl/aclMiddleware');

router.use(aclMiddleware.isAllowedToAccess('item'));

/**
* @api {get} api/log Get logs
* @apiGroup Log
* @apiUse useToken
* @apiUse useSortDir
* @apiUse paginationParams
* @apiParam (Query string) {String} [search] search by `desc` field.
* @apiParam (Query string) {String} [sortBy] sort by `createdAt`, or `resource`.
* @apiParam (Query string) {String} [resource] get specific resource (table name).
* @apiParam (Query string) {Number} [resourceID] get specific resource ID (can be used without resource param).
* @apiSuccess {Object[]} data array of logs.
* @apiSuccess {json} data.diffPrev prev changed value.
* @apiSuccess {json} data.diffNext next changed value.
* @apiHeaderExample {json} Header-Example:
*     {
*       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDcwMzQwNzJ9.je4md5GBuTSFGNivBaT3Ju7-yjVjkVS99WSIiwk7wA4",
*     }
* @apiSuccessExample {json} Success
*     HTTP/1.1 200 OK
    {
        "success": true,
        "status": "SUCCESS",
        "pagination": {
            "total": 2,
            "pageCount": 1,
            "currentPage": 1,
            "hasNextPage": false,
            "hasPrevPage": false
        }
        "data": [
            {
                "id": 19,
                "diffPrev": {
                    "sizeId": 7
                },
                "diffNext": {
                    "sizeId": 6
                },
                "op": "update",
                "resource": "Items",
                "resourceID": 3,
                "desc": "edit",
                "ref": null,
                "refID": null,
                "createdAt": "2019-09-10T23:33:58.686Z",
                "updatedAt": "2019-09-10T23:33:58.687Z",
                "deletedAt": null
            },
            {
                "id": 22,
                "diffPrev": {
                    "sizeId": 6
                },
                "diffNext": {
                    "sizeId": 7
                },
                "op": "update",
                "resource": "Items",
                "resourceID": 3,
                "desc": "edit",
                "ref": null,
                "refID": null,
                "createdAt": "2019-09-11T16:19:31.352Z",
                "updatedAt": "2019-09-11T16:19:31.354Z",
                "deletedAt": null
            }
        ],
}
* @apiErrorExample {json} Internal Server Error
*     HTTP/1.1 500 Internal Server Error
*     {
*       success: false,
*       status: "ERROR",
*       data: null,
*       message: "error message",
*      }
**/
router.get('/', loggerController.all);

module.exports = router;
