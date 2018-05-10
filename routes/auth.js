var express = require('express');
var router = express.Router();

let authController = require('../controllers/authController')

/* GET users listing. */

/**
  * @api {post} auth/login Login
  * @apiGroup Auth
  * @apiParamExample {json} Request-Example
  *     {
  *       "username" : "jhondoe",
  *       "password" : "secret"
  *     }
  * @apiParam {string} username username pengguna
  * @apiParam {string} password password pengguna
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {Object} user
  * @apiSuccess {string} user.name user full name
  * @apiSuccess {string} user.username username
  * @apiSuccess {string} user.token token setelah berhasil login
  * @apiSuccess {Number} user.expiresAt waktu token kadaluwarsa dalam format UNIX epoch time
  * @apiSuccessExample {json} Success
  *     HTTP/1.1 200 OK
  *   {
  *    "success": true,
  *    "status": "OK",
  *    "message": "Login success boskuh",
  *    "user": {
  *      "name": "jhondoe",
  *      "username": "jhondoe",
  *      "wareouseId": 1,
  *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlyZmFuIiwiaWF0IjoxNTA5MDg4NDIzLCJleHAiOjE1MDkxNzQ4MjN9.PtvYELiK4Uyaw2phiyxOrBQJTC8BNNPVVgT1zinCk8g"
  *       },
  *      "expiresAt": 1525700890
  *     }
  * @apiErrorExample {json} Wrong password
  *     HTTP/1.1/ 200 OK
  *     {
  *       success: false,
  *       "status": "ERROR",
  *       message: "Authentication failed. Wrong password."
  *     }
**/
router.post('/login', authController.login)

/**
 * @api {get} auth/ping Check access token validity
 * @apiGroup Auth
 *
 * @apiParam {String} accessToken user access token
 * @apiUse successBoolean
 * @apiSuccessExample {json} success example
 {
    "success": true
 }
 */
router.get('/ping', authController.ping)

module.exports = router;
