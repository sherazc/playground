DROP SEQUENCE ID_SEQUENCE;

CREATE SEQUENCE ID_SEQUENCE 
START WITH 100 INCREMENT BY 1;

DROP TABLE CUSTOMER_ORDER;

CREATE TABLE CUSTOMER_ORDER
(
ID INTEGER PRIMARY KEY,
ORDER_NO VARCHAR(255),
PRODUCT_NAME VARCHAR(255),
PRICE DOUBLE,
QUANTITY INTEGER
);

insert into customer_order(id, order_no, product_name, price, quantity)
values(10, 'order10', 'product10', 10, 10);

insert into customer_order(id, order_no, product_name, price, quantity)
values(20, 'order20', 'product20', 20, 20);

insert into customer_order(id, order_no, product_name, price, quantity)
values(30, 'order30', 'product30', 30, 30);

insert into customer_order(id, order_no, product_name, price, quantity)
values(40, 'order40', 'product40', 40, 40);

select * from customer_order;
