--CONNECT  TO DB

\c minions

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES 
    ('Marketing Overlord', 95000, 1),
    ('Marketing', 30000, 1),
    ('Chief Inventor', 120000, 2),
    ('Workshop Lackey', 40000, 2),
    ('Money Laundering Overlord', 400000, 3),
    ('Money Launderer', 50000, 3),
    ('Propaganda Overlord', 350000, 4),
    ('Propaganda Artist', 50000, 4);

INSERT INTO minion
    (first_name, last_name, role_id, overlord_id)
VALUES
    ('Min', 'Farshaw', 1, NULL),
    ('Mat', 'Cauthon', 2, 1),
    ('Kaladin', 'Stormblessed', 3, NULL),
    ('Dalinar', 'Kholin', 4, 3),
    ('James', 'Holden', 5, NULL),
    ('Naomi', 'Nagata', 6, 5),
    ('Perrin', 'Aybara', 7, NULL),
    ('Elaine', 'Trakand', 8, 7);