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


insert into customer_db.customer(name)
values('Customer 1');

select * from customer_db.customer;

insert into system_db.company(name)
values('Company 1');

select * from system_db.Company;

drop table system_db.flyway_schema_history ;

select * from system_db.flyway_schema_history ;

drop table if exists companysdfs;


