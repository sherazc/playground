drop database if exists employeedb;

create database employeedb;

use employeedb;

drop table if exists employee;

create table employee (id integer auto_increment, name varchar(255), salary integer(10), primary key (id));

insert into employee (id, name, salary) values (10, 'Sheraz', 100);

select id, name, salary from employee;