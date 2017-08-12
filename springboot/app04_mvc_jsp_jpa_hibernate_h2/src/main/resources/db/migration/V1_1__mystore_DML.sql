insert into address (id, street, city, state, zip) values (10, '10 Street', 'City 10', 'State 10', '10010');
insert into customer (id, address_id, name) values (10, 10, 'Customer 10');
insert into item (id, name, price) values (10, 'Item 10', 10);
insert into customer_order (id, customer_id) values (10, 10);
insert into customer_order_items (customer_order_id, items_id) values (10, 10);

insert into address (id, street, city, state, zip) values (20, '20 Street', 'City 20', 'State 20', '20020');
insert into customer (id, address_id, name) values (20, 20, 'Customer 20');
insert into item (id, name, price) values (20, 'Item 20', 20);
insert into customer_order (id, customer_id) values (20, 20);
insert into customer_order_items (customer_order_id, items_id) values (20, 20);
insert into customer_order_items (customer_order_id, items_id) values (20, 20);
insert into customer_order_items (customer_order_id, items_id) values (20, 10);

insert into address (id, street, city, state, zip) values (30, '30 Street', 'City 30', 'State 30', '30030');
insert into customer (id, address_id, name) values (30, 30, 'Customer 30');
insert into item (id, name, price) values (30, 'Item 30', 30);
insert into customer_order (id, customer_id) values (30, 30);
insert into customer_order_items (customer_order_id, items_id) values (30, 30);
insert into customer_order_items (customer_order_id, items_id) values (30, 30);
insert into customer_order_items (customer_order_id, items_id) values (30, 30);
insert into customer_order_items (customer_order_id, items_id) values (30, 10);
insert into customer_order_items (customer_order_id, items_id) values (30, 20);
