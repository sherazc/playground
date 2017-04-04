drop view if exists patient;

drop view if exists physician;

drop table if exists contact_appointment;

drop table if exists contact_availability;

drop table if exists contact; 

drop table if exists contact_type;

drop table if exists state;

create table state (
	state_id varchar(2),
	state_name varchar(50),
	primary key (state_id)
);

create table contact_type (
	id integer auto_increment,
	type varchar(255),
	primary key  (id)
);

create table contact (
	id integer auto_increment,
	email varchar(255),
	user_id varchar(255),
	password varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	street varchar(255),
	city varchar(255),
	state_id varchar(2),
	zip varchar(15),
	phone varchar(50),
	longitude double,
	latitude double,
	contact_type_id integer,
	date_created datetime,
	dml_date datetime,
	primary key  (id),
	foreign key (contact_type_id) references contact_type(id),
	foreign key (state_id) references state(state_id)
);

create table contact_availability (
	id integer auto_increment,
	contact_id integer,
	start_time datetime,
	end_time datetime,
	per_visit_duration integer, -- in minutes
	repeat_cron varchar(50),
	primary key  (id),
	foreign key (contact_id) references contact(id)
);

create table contact_appointment (
	id integer auto_increment,
	contact_id integer,
	contact_availability_id integer,
	queue_slot integer,
	primary key (id),
	foreign key (contact_id) references contact(id),
	foreign key (contact_availability_id) references contact_availability(id)
);

create or replace view physician as
(
select * from contact where contact_type_id = (select id from contact_type where type = 'Physician')
);

create or replace view patient as
(
select * from contact where contact_type_id = (select id from contact_type where type = 'Patient')
);


insert into contact_type (id, type) values (100, 'Physician');

insert into contact_type (id, type) values (200, 'Patient');

insert into state (state_id, state_name) values('GA', 'Georgia'); 

select * from state;

select * from contact_type;

select * from contact;

select * from patient;

select * from physician;
