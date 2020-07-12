CREATE DATABASE IF NOT EXISTS system_db;
CREATE DATABASE IF NOT EXISTS customer_db;

CREATE USER 'rpdbuser'@'%' identified by 'password';
GRANT ALL PRIVILEGES ON system_db.* TO 'rpdbuser'@'%';
GRANT ALL PRIVILEGES ON customer_db.* TO 'rpdbuser'@'%';
