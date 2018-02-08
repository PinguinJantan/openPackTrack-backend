require('dotenv').config()
module.exports =
{
  "secret" : process.env.SECRET_KEY,
  "development": {
    "username": process.env.PG_USERNAME || '',
    "password": process.env.PG_PASSWORD || '',
    "database": process.env.PG_DATABASE || 'openpacktrackdev',
    "host": process.env.PG_HOSTNAME || '',
    "dialect": "postgres",
    "logging": false,
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 60000
    }
  },
  "test": {
    "username": "bukalelang",
    "password": "bukalelang",
    "database": "bukalelang-db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.RDS_USERNAME || '',
    "password": process.env.RDS_PASSWORD || '',
    "database": process.env.RDS_DB_NAME || 'bukalelang-db',
    "host": process.env.RDS_HOSTNAME || '',
    "port": process.env.RDS_PORT || '5432',
    "dialect": "postgres"
  }
}
