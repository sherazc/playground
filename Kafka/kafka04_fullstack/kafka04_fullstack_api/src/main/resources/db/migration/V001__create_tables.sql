CREATE TABLE register_role
(
    id        integer PRIMARY KEY,
    role_name varchar NULL
);

CREATE TABLE register_user
(
    id               integer GENERATED ALWAYS AS IDENTITY,
    user_name        varchar   NULL,
    email            varchar   NULL,
    user_password    varchar   NULL,
    register_role_id integer   NULL,
    register_time    timestamp NULL,
    CONSTRAINT register_user_pk PRIMARY KEY (id),
    CONSTRAINT register_role_fk foreign key (register_role_id) references register_role (id)
);


INSERT INTO register_role (id, role_name)
values (100, 'BASIC_USER');

INSERT INTO register_role (id, role_name)
values (200, 'ADMIN');
