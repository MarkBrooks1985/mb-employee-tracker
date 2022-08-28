INSERT INTO department (name)
VALUES ("Accounting"),
        ("Finance"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("title 1", 1, 1),
        ("title 2", 2, 2),
        ("title 3", 3, 3);

        INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elizabeth", "Saltzman", 1, NULL),
        ("Josette", "Saltzman", 2, 1),
        ("Niklaus", "Mikaelson", 3, 2);
