drop table if exists customer;

create table if not exists customer
(
    id integer auto_increment primary key,
    name varchar(255)
);

insert into customer(name)
values('Customer 200');