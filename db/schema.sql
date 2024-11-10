--DROP DB IF EXISTS
DROP DATABASE IF EXISTS minions;

--CREATE NEW DB
CREATE DATABASE minions;

--CONNECT TO DB
\c minions

--CREATE TABLE FOR DEPARTMENT
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

--CREATE TABLE FOR ROLES
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

--CREATE TABLE FOR MINIONS
CREATE TABLE minion (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    overlord_id INTEGER,
    CONSTRAINT fk_overlord FOREIGN KEY (overlord_id) REFERENCES minion(id) ON DELETE SET NULL
);