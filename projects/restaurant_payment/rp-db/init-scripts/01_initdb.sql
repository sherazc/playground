-- This script is just to initialize database if the database is not already been created
-- Other initialization and DB versioning will done by https://flywaydb.org/
CREATE DATABASE IF NOT EXISTS system_db;
CREATE DATABASE IF NOT EXISTS customer_db;

CREATE USER IF NOT EXISTS 'rpdbuser'@'%';
GRANT ALL PRIVILEGES ON system_db.* TO 'rpdbuser'@'%' ;
GRANT ALL PRIVILEGES ON customer_db.* TO 'rpdbuser'@'%';
ALTER USER 'rpdbuser'@'%' identified by 'password';
