INSERT INTO department (name)
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

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Jeffrey', 'Bezos', 4),
       ('Walter', 'White', 2),
       ('Timothy', 'Apple', 4),
       ('Jon', 'Snow', 5),
       ('The', 'Hulk', 1),
       ('Hakuna', 'Matata', 3),
       ('Weird', 'Al', 1);
       