DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Klairs Gentle Black Deep Cleansing Oil", "cleanser", 22.90, 50),
("Klairs Rich Moist Foaming Cleanser", "cleanser", 18.00, 25),
("Klairs Supple Preparation Facial Toner", "toner", 22.00, 10),
("Klairs Rich Moist Soothing Serum", "serum", 22.00, 5),
("Klairs Freshly Juiced Vitamin Drop",  "serum",25.00, 20),
("Klairs Rich Moist Soothing Cream", "moisturizer", 23.00, 35),
("Klairs Midnight Blue Calming Cream", "moisturizer", 2.50, 40),
("Klairs Mochi BB Cushion", "makeup", 26.90, 10),
("Klairs Illuminating Supple Blemish Cream", "makeup", 24.50, 30),
("Klairs Creamy & Natural Fit Concealer", "makeup", 14.00, 10);