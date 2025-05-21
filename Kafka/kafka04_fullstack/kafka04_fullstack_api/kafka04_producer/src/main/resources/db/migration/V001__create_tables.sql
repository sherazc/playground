CREATE TABLE register_user
(
    id            integer GENERATED ALWAYS AS IDENTITY NOT NULL,
    user_name     varchar NULL,
    "password"    varchar NULL,
    register_time timestamp NULL,
    CONSTRAINT register_user_pk PRIMARY KEY (id)
);
