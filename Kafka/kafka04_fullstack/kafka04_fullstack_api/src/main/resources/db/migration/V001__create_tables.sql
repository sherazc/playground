CREATE TABLE register_user
(
    id            integer GENERATED ALWAYS AS IDENTITY,
    user_name     varchar NULL,
    user_password    varchar NULL,
    user_role     varchar NULL,
    register_time timestamp NULL,
    CONSTRAINT register_user_pk PRIMARY KEY (id)
);
