drop table if exists company;

create table if not exists company
(
    id integer auto_increment primary key,
    name varchar(255)
);

insert into company(name)
values('Company 100');