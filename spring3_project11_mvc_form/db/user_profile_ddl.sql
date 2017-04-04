drop sequence user_profile_sequence;

create sequence user_profile_sequence;

drop table user_address;


drop table user_contact;

create table user_contact (
	id integer primary key,
	user_id varchar(100) not null,
	user_password varchar(100) not null,
	first_name varchar(100),
	last_name varchar(100),
	unique (user_id)
);

create table user_address (
	id integer primary key,
	user_profile_id integer,
	address varchar(200),
	city varchar(100),
	state varchar(100),
	zip varchar(100),
	foreign key (user_profile_id) references user_contact(id)
);

insert into user_contact(id,user_id,user_password,first_name,last_name)
values(100, 'sheraz', 'password', 'Sheraz', 'Chaudhry');

select * from user_contact;

commit;