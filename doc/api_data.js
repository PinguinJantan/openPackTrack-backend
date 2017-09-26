define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>username pengguna</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password pengguna</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n{\n   success: true,\n   message: 'Login success boskuh',\n   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW5NaW51dGVzIjoxNDQwLCJpYXQiOjE1MDY0MTgwNzJ9.LKBsytXXmH_hu7Qa4w69v-ELojmjMmieViI2VDqUG8U'\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n  \"username\" : \"jhondoe\",\n  \"password\" : \"secret\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Wrong password",
          "content": "HTTP/1.1/ 200 OK\n{\n  success: false,\n  message: \"Authentication failed. Wrong password.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auth.js",
    "groupTitle": "Auth",
    "name": "PostLogin"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Registrasi",
    "group": "Auth",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\" : \"jhon doe\",\n  \"username\" : \"jhondoe\",\n  \"password\" : \"secret\",\n  \"email\" : \"jhondoe@example.co.id\",\n  \"identityNumber\" : \"113211019\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>nama pengguna</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>username pengguna</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password pengguna</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email pengguna</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "identityNumber",
            "description": "<p>nomer induk pengguna</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n{\n  success: true,\n  status: \"OK\"\n  user:  {\n     id: 12,\n     name: 'jhon doe',\n     email: 'jhondoe@example.co.id',\n     username: 'jhon',\n     identityNumber: '113211019',\n     password: 'secret',\n     updatedAt: 2017-09-26T09:22:56.631Z,\n     createdAt: 2017-09-26T09:22:56.631Z\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  success: false,\n  status: \"ERROR\",\n  user: null\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/auth.js",
    "groupTitle": "Auth",
    "name": "PostRegister"
  }
] });
