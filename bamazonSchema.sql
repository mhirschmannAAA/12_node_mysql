DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id int not null auto_increment,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price int default 0,
    stock_quantity int default 0,
    primary key (item_id)
);