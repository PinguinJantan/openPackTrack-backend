FROM postgres:11-alpine
COPY ./init-user-db.sh /docker-entrypoint-initdb.d/init-user-db.sh
