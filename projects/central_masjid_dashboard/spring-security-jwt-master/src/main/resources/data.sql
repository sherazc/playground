insert into hibernate_sequence values ( 1 );
insert into hibernate_sequence values ( 1 );

INSERT INTO user (id, username, password, salary, age) VALUES (1, 'user1', '$2a$04$uwl7jqrA0e7w3qvVugrS3ehX44iw.XKxKa73jgNL7SKAhRVI3TZnq', 3456, 33);
INSERT INTO user (id, username, password, salary, age) VALUES (2, 'user2', '$2a$04$uwl7jqrA0e7w3qvVugrS3ehX44iw.XKxKa73jgNL7SKAhRVI3TZnq', 7823, 23);
INSERT INTO user (id, username, password, salary, age) VALUES (3, 'user3', '$2a$04$uwl7jqrA0e7w3qvVugrS3ehX44iw.XKxKa73jgNL7SKAhRVI3TZnq', 4234, 45);

INSERT INTO role (id, description, name) VALUES (4, 'Admin role', 'ADMIN');
INSERT INTO role (id, description, name) VALUES (5, 'User role', 'USER');

INSERT INTO user_roles (user_id, role_id) VALUES (1, 4);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 5);
