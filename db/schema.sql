CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
id INTEGER auto_increment,
burger_name VARCHAR(255) not null,
devoured BOOLEAN default false,
PRIMARY KEY(id)
);

