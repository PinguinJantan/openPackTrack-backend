# openPackTrack-backend
Open Source Product Tracking

### Prerequisites
- NodeJS : minimal v.6.9.x LTS | we recomended to install by [nvm](https://github.com/creationix/nvm) ways
- npm : minimal v. 3.1
- PostgreSQL : v. 9.5
- redis-server : v. 4.x
- sequelize-cli


### How to install

1. clone this project ```$ git clone ```
2. enter the project folder ```$ cd openPackTrack-backend```
3. duplicate _.env.example_ to _.env_ : ```$ cp .env.example .env```
4. setup environment variable
5. migrate database : ```$ sequelize db:migrate```
6. install dependencies ```$ npm install```

### Run project
```$ npm run dev```


### Run test
```$ npm test```


### Generate api documentation
for local development purpose only. Remember, don't commit generated docs.

install [apidocjs](http://apidocjs.com/#install) first

```$ apidoc -i . -o doc/ -e node_modules```
