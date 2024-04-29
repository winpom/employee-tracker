INSERT INTO departments (name)
VALUES ('CIA'),
       ('NSA'),
       ('FBI'),
       ('Homeland Security');

INSERT INTO roles (title, salary, department_id)
VALUES ('God', 999999999999, 2),
       ('President of the World', 10000000, 1),
       ('Lizard Pope', 150000, 4),
       ('Janitor', 54000, 3),
       ('Secret Agent', 36, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jeffrey', 'Bezos', 4, 7),
       ('Walter', 'White', 2, null),
       ('Timothy', 'Apple', 4, 5),
       ('Jon', 'Snow', 5, null),
       ('The', 'Hulk', 1, null),
       ('Hakuna', 'Matata', 3, null),
       ('Weird', 'Al', 1, null);
       