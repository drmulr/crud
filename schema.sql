CREATE DATABASE dm_todo_db;
USE dm_todo_db;

CREATE TABLE things (
    id int NOT NULL AUTO_INCREMENT,
    thing varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO things (thing) VALUES ('This is a sample item. Maybe delete it?');
