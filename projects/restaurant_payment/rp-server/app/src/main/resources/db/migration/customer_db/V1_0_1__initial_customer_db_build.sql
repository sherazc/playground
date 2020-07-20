use customer_db;

drop table if exists order_line_item;
drop table if exists product_image;
drop table if exists product;
drop table if exists customer_order;
drop table if exists customer;

-- customer
create table if not exists customer (
    id integer auto_increment primary key,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    phone varchar(255),
    password varchar(255),
    street varchar(255),
    city varchar(255),
    state varchar(255),
    zip varchar(255)
);


-- customer_order
create table if not exists customer_order (
    id integer auto_increment primary key,
    company_id integer,
    customer_id integer NOT NULL,
    paid tinyint(1),
    tip double,
    confirmation_number varchar(255)
);

ALTER TABLE customer_order
ADD CONSTRAINT customer_order_customer_fk 
FOREIGN KEY (customer_id) 
REFERENCES customer(id);


-- product
create table if not exists product (
    id integer auto_increment primary key,
    name varchar(255),
    price double,
    customer_id integer NOT NULL
);

-- order_line_item
create table if not exists order_line_item (
    id integer auto_increment primary key,
    customer_order_id integer,
    product_id integer,
    quantity integer,
    special_instruction varchar(1000)
);

ALTER TABLE order_line_item
ADD CONSTRAINT order_line_item_customer_order_fk 
FOREIGN KEY (customer_order_id) 
REFERENCES customer_order(id);

ALTER TABLE order_line_item
ADD CONSTRAINT order_line_item_product_fk 
FOREIGN KEY (product_id) 
REFERENCES product(id);

-- product_image
create table if not exists product_image (
    id integer auto_increment primary key,
    product_id integer,
    name varchar(255)
);

ALTER TABLE product_image
ADD CONSTRAINT product_image_product_fk 
FOREIGN KEY (product_id) 
REFERENCES product(id);
