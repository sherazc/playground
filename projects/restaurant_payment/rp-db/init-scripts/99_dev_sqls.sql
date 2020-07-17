use customer_db;
drop table if exists customer;
create table if not exists customer
(
    id   integer auto_increment primary key,
    name varchar(255)
);

use system_db;
drop table if exists company;

create table if not exists company
(
    id   integer auto_increment primary key,
    name varchar(255)
);