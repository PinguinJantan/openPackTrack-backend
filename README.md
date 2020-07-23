# openPackTrack-backend

Open Source Product Tracking

### Prerequisites

- NodeJS : minimal v.6.9.x LTS | we recomended to install by [nvm](https://github.com/creationix/nvm) ways
- npm : minimal v. 3.1
- PostgreSQL : v. 9.5
- sequelize-cli

### How to install

1. clone this project
2. enter the project folder `$ cd openPackTrack-backend`
3. duplicate _.env.example_ to _.env_ : `$ cp .env.example .env`
4. setup environment variable
5. install sequelize-cli: `$ npm install -g sequelize-cli`
6. install dependencies `$ npm install`
7. migrate database : `$ sequelize db:migrate`

### Seeders

1. run `$ sequelize db:seed:all`
2. run `$ npm run seed-acl`

### Run project

`$ npm run dev`

### Run test

`$ npm test`

### Generate api documentation

for local development purpose only. Remember, don't commit generated docs.

install [apidocjs](http://apidocjs.com/#install) first

`$ apidoc -i . -o doc/ -e node_modules`
