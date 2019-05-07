/*
    Inserts a new user record.
    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/
INSERT INTO ${schema~}.users(firstname, lastname, email, password)
VALUES($1, $2, $3, $4)
RETURNING *
