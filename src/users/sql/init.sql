/*
    Inserting a few demo users into the database, and returning their id-s;
    NOTES:
    - You can do multiple separate inserts, if you want, but using
      a single concatenated insert is significantly faster.
    - We only add schema here to demonstrate the ability of class QueryFile
      to pre-format SQL with static formatting parameters when needs to be.
    See also:
    https://github.com/vitaly-t/pg-promise/wiki/Performance-Boost
*/

INSERT INTO ${schema~}.users(email, firstname) VALUES
('th1@hotmail.com', 'Demo1'), -- user 1;
('th2@hotmail.com', 'Demo2'), -- user 2;
('th3@hotmail.com', 'Demo3'), -- user 3;
('th4@hotmail.com', 'Demo4'), -- user 4;
('th5@hotmail.com', 'Demo5') -- user 5;
RETURNING id
