#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 postgresql://"$POSTGRES_USER":"$POSTGRES_PASSWORD"@localhost/"$POSTGRES_DB"<<-EOSQL
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
