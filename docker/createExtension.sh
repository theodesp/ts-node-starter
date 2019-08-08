#!/bin/bash
set -e

RETRIES=5

until psql -v postgresql://"$POSTGRES_USER":"$POSTGRES_PASSWORD"@localhost/"$POSTGRES_DB" -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "Waiting for postgres server, $((RETRIES)) remaining attempts..."
  RETRIES=$((RETRIES-=1))
  sleep 1
done

createuser -P postgres

psql -v postgresql://"$POSTGRES_USER":"$POSTGRES_PASSWORD"@localhost/"$POSTGRES_DB"<<-EOSQL
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
