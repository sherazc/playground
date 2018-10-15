drop table if exists icna_register_user;
drop table if exists icna_register;

create table icna_register(
    id integer auto_increment primary key,
    email varchar(255),
    first_name varchar(255),
    last_name varchar(255),
    street varchar(255),
    city varchar(255),
    state varchar(255),
    zip varchar(255)
);

create table icna_register_user(
    id integer auto_increment primary key,
    user_id varchar(255),
    user_password varchar(255)
);

insert into icna_register_user(user_id, user_password)
values ('admin', 'admin');
