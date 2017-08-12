drop table student_fee_paid;

drop table student_data;

drop table secure_user_role;

drop table secure_user;

create table secure_user (
	user_id integer not null auto_increment,
	user_name varchar(255) not null,
	user_password varchar(255) not null,
	enabled integer,
	primary key (user_id)
);

create table secure_user_role (
	user_role_id integer not null auto_increment,
	user_id integer,
	authority varchar(255),
	foreign key (user_id) references secure_user(user_id),
	primary key (user_role_id)
);

insert into secure_user (user_id, user_name, user_password, enabled)
values (100, 'admin', 'admin123', 1);

insert into secure_user_role (user_role_id, user_id, authority)
values (1000, 100, 'ROLE_USER');

insert into secure_user_role (user_role_id, user_id, authority)
values (1010, 100, 'ROLE_ADMIN');
-- changed

create table student_data (
	id integer primary key auto_increment,
	first_name varchar(255),
	last_name varchar(255),
	g_first_name varchar(255),
	g_last_name varchar(255),
	phone_number varchar(50),
	registration_date datetime,
	create_date datetime,
	dml_date datetime,
	fee integer
);

create table student_fee_paid (
	id integer primary key auto_increment,
	fee_paid_amount integer,
	student_id integer,
	fee_date datetime,
	dml_date datetime,
	foreign key (student_id) references student_data(id)
);

select * from student_data;

select * from student_fee_paid;


select * from student_data;