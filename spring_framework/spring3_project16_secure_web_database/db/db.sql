DROP TABLE SPRING_SECURE_USER_ROLE;

DROP TABLE SPRING_SECURE_USER;

CREATE TABLE SPRING_SECURE_USER (
	USER_ID INTEGER NOT NULL,
	USER_NAME VARCHAR(255) NOT NULL,
	USER_PASSWORD VARCHAR(255) NOT NULL,
	ENABLED INTEGER NOT NULL,
	PRIMARY KEY (USER_ID)
);

CREATE TABLE SPRING_SECURE_USER_ROLE (
	USER_ROLE_ID INTEGER NOT NULL,
	USER_ID INTEGER NOT NULL,
	AUTHORITY VARCHAR(255) NOT NULL,
	FOREIGN KEY (USER_ID) REFERENCES SPRING_SECURE_USER(USER_ID)
);

INSERT INTO SPRING_SECURE_USER (USER_ID, USER_NAME, USER_PASSWORD, ENABLED)
VALUES (100, 'sheraz', 'password', 1);

INSERT INTO SPRING_SECURE_USER_ROLE (USER_ROLE_ID, USER_ID, AUTHORITY)
VALUES (1000, 100, 'ROLE_USER');

SELECT * FROM SPRING_SECURE_USER;

SELECT * FROM SPRING_SECURE_USER_ROLE;
