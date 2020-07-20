use system_db;

drop table if exists config_properties_system;
drop table if exists config_properties_company;
drop table if exists company_invoice;
drop table if exists bank;
drop table if exists company_user_role;
drop table if exists company_user;
drop table if exists company;
drop table if exists pricing_plan;
drop table if exists user_role;


-- config_properties_system
create table if not exists config_properties_system (
    id integer auto_increment primary key,
    name varchar(255),
    value varchar(255),
    value_type varchar(255)
);


-- pricing_plan
create table if not exists pricing_plan (
    id integer auto_increment primary key,
    name varchar(255),
    price double,
    description varchar(1000),
    duration_days integer,
    active tinyint(1)
);


-- company
create table if not exists company (
    id integer auto_increment primary key,
    name varchar(255),
    phone varchar(255),
    active tinyint(1),
	current_pricing_plan_id integer
);

ALTER TABLE company 
ADD CONSTRAINT company_pricing_plan_fk 
FOREIGN KEY (current_pricing_plan_id) 
REFERENCES pricing_plan(id);


-- config_properties_company
create table if not exists config_properties_company (
    id integer auto_increment primary key,
    company_id integer,
    name varchar(255),
    value varchar(255),
    value_type varchar(255)
);

ALTER TABLE config_properties_company
ADD CONSTRAINT config_properties_company_fk 
FOREIGN KEY (company_id) 
REFERENCES company(id);


-- bank
create table if not exists bank (
    id integer auto_increment primary key,
    company_id integer,
    active tinyint(1),
	strip_account varchar(255)
);

ALTER TABLE bank 
ADD CONSTRAINT bank_company_fk 
FOREIGN KEY (company_id) 
REFERENCES company(id);


-- user_roles
create table if not exists user_role (
    id integer auto_increment primary key,
	name varchar(255)
);


-- company_user
create table if not exists company_user (
    id integer auto_increment primary key,
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255),
	password varchar(255),
	active tinyint(1),
	company_id integer
);

ALTER TABLE company_user
ADD CONSTRAINT company_user_company_fk 
FOREIGN KEY (company_id) 
REFERENCES company(id);


-- company_user_role
create table if not exists company_user_role (
    id integer auto_increment primary key,
	company_id integer,
	user_role_id integer
);

ALTER TABLE company_user_role
ADD CONSTRAINT company_user_role_company_user_fk 
FOREIGN KEY (company_id) 
REFERENCES company_user(id);

ALTER TABLE company_user_role
ADD CONSTRAINT company_user_role_user_role_fk 
FOREIGN KEY (user_role_id) 
REFERENCES user_role(id);


-- company_invoice
create table if not exists company_invoice (
    id integer auto_increment primary key,
	company_id integer,
	bank_id integer,
	pricing_plan_id integer,
	paid tinyint(1),
	payment_date datetime
);

ALTER TABLE company_invoice
ADD CONSTRAINT company_invoice_company_fk 
FOREIGN KEY (company_id) 
REFERENCES company(id);

ALTER TABLE company_invoice
ADD CONSTRAINT company_invoice_bank_fk 
FOREIGN KEY (bank_id) 
REFERENCES bank(id);

ALTER TABLE company_invoice
ADD CONSTRAINT company_invoice_pricing_plan_fk 
FOREIGN KEY (pricing_plan_id) 
REFERENCES pricing_plan(id);
