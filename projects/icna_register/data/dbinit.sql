drop table if exists event_tracker_user;
drop table if exists event_tracker;

create table event_tracker(
id integer auto_increment primary key,
event_name varchar(255),
chapter_region varchar(255),
event_start_date datetime,
event_end_date datetime,
category varchar(255),
category_type varchar(255),
attendance varchar(255),
servings varchar(255),
location_types varchar(255),
street varchar(255),
city varchar(255),
state varchar(255),
zip varchar(255),
attendees varchar(255),
event_in_charge varchar(255),
speakers varchar(255),
expense double,
paid_by varchar(255),
income double,
donation varchar(255),
workers integer,
volunteers integer,
rating integer,
issues varchar(2000),
comments varchar(2000)
);

create table event_tracker_user(
    id integer auto_increment primary key,
    user_id varchar(255),
    user_password varchar(255)
);

insert into event_tracker_user(user_id, user_password)
values ('admin', 'admin');

insert into event_tracker
(event_name,
chapter_region,
event_start_date,
event_end_date,
category,
category_type,
attendance,
servings,
location_types,
street,
city,
state,
zip,
attendees,
event_in_charge,
speakers,
expense,
paid_by,
income,
donation,
workers,
volunteers,
rating,
issues,
comments)
values (
'event_name_1',
'chapter_region_1',
'2018-10-18 11:19:26',
'2018-10-18 11:19:26',
'category_1',
'category_type_1',
'attendance_1',
'servings_1',
'location_types_1',
'street_1',
'city_1',
'state_1',
'zip_1',
'attendees_1',
'event_in_charge_1',
'speakers_1',
100.55, -- expense
'paid_by_1',
'income_1',
101.55, -- donation
'workers_1',
10, -- workers
5, -- volunteers
'issues_1',
'comments_1'
);

