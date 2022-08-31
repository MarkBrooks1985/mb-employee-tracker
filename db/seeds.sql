/* inserts data into the department table */
INSERT INTO department (name)
VALUES ("Accounting"),
        ("Finance"),
        ("Sales");

/* inserts data into the role table */

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 4, 1),
        ("Accountent", 2, 2),
        ("Engineer", 3, 3);

/* inserts data into the employee table */

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elizabeth", "Saltzman", 1, NULL),
        ("Josette", "Saltzman", 2, 1),
        ("Niklaus", "Mikaelson", 3, 2);
