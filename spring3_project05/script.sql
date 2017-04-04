drop table customer;

drop table address;

drop sequence id_sequence;

create sequence id_sequence;

create table address (
id integer primary key,
street varchar(250),
city varchar(250),
zip varchar(10)
);

create table customer (
id integer primary key,
name varchar(250) not null,
email varchar(250),
salary double,
location integer,
foreign key (location) references address(id));

insert into address (id, street, city, zip) values (100, '100 Street', 'Atlanta', '30100');

insert into address (id, street, city, zip) values (200, '200 Street', 'New York', '30200');

insert into address (id, street, city, zip) values (300, '300 Street', 'Alpharetta', '30300');

insert into address (id, street, city, zip) values (400, '400 Street', 'Roswell', '30400');


insert into customer (id, name, email, salary, location) values (1000, 'Name1000', 'email1000@email.com', 1000, 100);

insert into customer (id, name, email, salary, location) values (2000, 'Name2000', 'email2000@email.com', 1000, 200);

insert into customer (id, name, email, salary, location) values (3000, 'Name3000', 'email3000@email.com', 1000, 300);

insert into customer (id, name, email, salary, location) values (4000, 'Name4000', 'email4000@email.com', 1000, 400);

select * from address;

select * from customer;

