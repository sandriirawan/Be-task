-- Active: 1686748002540@@127.0.0.1@5432@olshop
CREATE TABLE customer (
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  address VARCHAR(200) NOT NULL
);
CREATE TABLE category (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  category_image VARCHAR(255) NOT NULL
);

CREATE TABLE product (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  shop_name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  color VARCHAR(100) NOT NULL,
  product_image VARCHAR(255) NOT NULL,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES Category(category_id)
);


CREATE TABLE order_item (
  order_item_id SERIAL PRIMARY KEY,
  product_id INT,
  quantity INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE order_transaction (
  order_id SERIAL PRIMARY KEY,
  order_date DATE NOT NULL,
  customer_id INT,
  order_item_id INT,
  FOREIGN KEY (order_item_id) REFERENCES order_item(order_item_id)
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

ALTER TABLE order_item
DROP COLUMN buyer_id;


select * from order_item;
select * from order_transaction;
select * from customer;
select * from category;
select * from product;

SELECT * FROM order_transaction JOIN customer ON order_transaction.customer_id = customer.customer_id JOIN order_item ON order_transaction.order_item_id = order_item.order_item_id JOIN product ON order_item.product_id = product.product_id;


SELECT *
FROM order_transaction
JOIN customer ON order_transaction.customer_id = customer.customer_id
JOIN order_item ON order_transaction.order_item_id = order_item.order_item_id
JOIN product ON order_item.product_id = product.product_id
JOIN category ON product.category_id = category.category_id;

SELECT
  order_transaction.order_id,
  order_transaction.order_date,
  customer.customer_name,
  customer.email,
  customer.phone_number,
  customer.address,
  order_item.quantity,
  product.product_name,
  product.shop_name,
  product.price,
  product.color,
  product.product_image,
  category.category_name,
  category.category_image
FROM order_transaction
JOIN customer ON order_transaction.customer_id = customer.customer_id
JOIN order_item ON order_transaction.order_item_id = order_item.order_item_id
JOIN product ON order_item.product_id = product.product_id
JOIN category ON product.category_id = category.category_id;





ALTER TABLE orderItem Rename TO order_item;

