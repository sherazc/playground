drop table if exists hibernate_sequence;
drop table if exists role;
drop table if exists user;
drop table if exists user_roles;
create table hibernate_sequence (next_val bigint);

create table role (id bigint not null, description varchar(255), name varchar(255), primary key (id)) ;
create table user (id bigint not null, age integer, password varchar(255), salary bigint, username varchar(255), primary key (id));
create table user_roles (user_id bigint not null, role_id bigint not null, primary key (user_id, role_id));
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
