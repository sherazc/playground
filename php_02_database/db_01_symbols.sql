-- http://devzone.zend.com/12/php-101-part-8-databases-and-other-animals_part-1/

drop table symbols;

drop table user_time;

CREATE TABLE symbols (
id integer NOT NULL auto_increment,
country varchar(255) NOT NULL default '',
animal varchar(255) NOT NULL default '',
PRIMARY KEY  (id)
);

INSERT INTO symbols VALUES (1, 'America', 'eagle');

INSERT INTO symbols VALUES (2, 'China', 'dragon');

INSERT INTO symbols VALUES (3, 'England', 'lion');

INSERT INTO symbols VALUES (4, 'India', 'tiger');

INSERT INTO symbols VALUES (5, 'Australia', 'kangaroo');

INSERT INTO symbols VALUES (6, 'Norway', 'elk');

select * from symbols;

create table user_time(
id integer NOT NULL auto_increment,
create_date timestamp, 
dml_date timestamp,
PRIMARY KEY  (id)
);

select * from user_time;

