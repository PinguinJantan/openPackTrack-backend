#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER optuser;
    CREATE DATABASE optbackend;
    GRANT ALL PRIVILEGES ON DATABASE optbackend TO optuser;
EOSQL
