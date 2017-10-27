var express = require('express');
var router = express.Router();

let authController = require('../controllers/authController')

/* GET users listing. */

/**
  * @api {post} auth/register Registrasi
  * @apiGroup Auth
  * @apiParamExample {json} Request-Example:
  *     {
  *       "name" : "jhon doe",
  *       "username" : "jhondoe",
  *       "password" : "secret",
  *       "email" : "jhondoe@example.co.id",
  *       "identityNumber" : "113211019"
  *     }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {Array} user array dari user
  * @apiParam {string} name nama pengguna
  * @apiParam {string} username username pengguna
  * @apiParam {string} password password pengguna
  * @apiParam {string} email email pengguna
  * @apiParam {string} identityNumber nomer induk pengguna
  * @apiSuccessExample {json} Success
  *     HTTP/1.1 200 OK
  *   {
  *    "success": true,
  *    "status": "OK",
  *    "user": {
  *        "id": 6,
  *        "username": "jhondoe",
  *        "name": "jhon doe",
  *        "identityNumber": "113211019",
  *        "email" : "jhondoe@example.co.id",
  *        "password": "24775f5b6ec07ec7863edca4405c29d4dade8c39392cb142c55796d5725783f444e207010622966d2945def2477e76fb796801b54cb465b7590728ee6d422ca8",
  *        "updatedAt": "2017-10-27T07:12:18.295Z",
  *        "createdAt": "2017-10-27T07:12:18.295Z"
  *      }
  *    }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *       success: false,
  *       status: "ERROR",
  *       user: null
  *      }

**/
router.post('/register', authController.register);
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
  * @apiSuccess {string} message pesan dari server
  * @apiSuccess {string} token token setelah berhasil login
  * @apiSuccessExample {json} Success
  *     HTTP/1.1 200 OK
  *   {
  *    "success": true,
  *    "status": "OK",
  *    "message": "Login success boskuh",
  *    "user": {
  *      "name": "jhondoe",
  *      "username": "jhondoe",
  *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlyZmFuIiwiaWF0IjoxNTA5MDg4NDIzLCJleHAiOjE1MDkxNzQ4MjN9.PtvYELiK4Uyaw2phiyxOrBQJTC8BNNPVVgT1zinCk8g"
  *       }
  *     }
  * @apiErrorExample {json} Wrong password
  *     HTTP/1.1/ 200 OK
  *     {
  *       success: false,
  *       "status": "ERROR",
  *       message: "Authentication failed. Wrong password."
  *     }
**/
router.post('/login',authController.login);

module.exports = router;
