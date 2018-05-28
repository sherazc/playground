create table employee
(
	id integer primary key,
	firstname varchar(50),
	lastname varchar(50),
	salary double not null
);

insert into employee (id, firstname, lastname, salary)
values (100, 'fname 1', 'lname 1', 1000);


insert into employee (id, firstname, lastname, salary)
values (200, 'fname 2', 'lname 2', 2000);

insert into employee (id, firstname, lastname, salary)
values (300, 'fname 3', 'lname 3', 3000);

select * from employee;

