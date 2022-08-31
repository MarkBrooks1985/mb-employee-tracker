// required packages
const inquirer = require("inquirer");
const mysql = require("mysql2");

// connects to the database etc

const db = mysql.createConnection(
  {
    host: "localhost",

    user: "root",

    password: "Pass123",
    database: "employee_db",
  },
  console.log(`Connected to the Employee Database Systems.`)
);

// ascii art title that is logged and rendered to the terminal

console.log(
  " _____           _                    _____             _              _____         _             "
);
console.log(
  "|   __|_____ ___| |___ _ _ ___ ___   |_   _|___ ___ ___| |_ ___ ___   |   __|_ _ ___| |_ ___ _____ "
);
console.log(
  "|   __|     | . | | . | | | -_| -_|    | | |  _| .'|  _| '_| -_|  _|  |__   | | |_ -|  _| -_|     |"
);
console.log(
  "|_____|_|_|_|  _|_|___|_  |___|___|    |_| |_| |__,|___|_,_|___|_|    |_____|_  |___|_| |___|_|_|_|"
);
console.log(
  "            |_|       |___|                                                 |___|                  "
);

// function that starts the prompts

function startEmpDB() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      const resAction = response.action;
      switch (resAction) {
        case "View All Employees":
          viewAllEmp();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          callEmployee();
          break;
        case "exit":
          connection.end();
          console.log(
            "Connection Terminated, please input node index.js to reconnect"
          );
          break;
      }
    });
}

// function that views all employees

function viewAllEmp() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    startEmpDB();
  });
}

// function that views all departments

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    startEmpDB();
  });
}

// function that views all roles

function viewAllRoles() {
  db.query(
    "SELECT * FROM role JOIN department ON role.department_id = department.id",
    function (err, results) {
      console.table(results);
      startEmpDB();
    }
  );
}

// function that adds a department

function addDepartment() {
  const questions = [
    {
      type: "input",
      message: "What is the Departments name",
      name: "department",
    },
  ];
  inquirer.prompt(questions).then((response) => {
    db.query(
      "INSERT INTO department (name) VALUES (?)",
      [response.department],
      function (err, results) {
        console.table(results);
        startEmpDB();
      }
    );
  });
}

// function that adds a new role

function addRole() {
  const questions = [
    {
      type: "input",
      message: "What is the Roles name",
      name: "role",
    },
    {
      type: "input",
      message: "What is the Roles salary",
      name: "salary",
    },
    {
      type: "input",
      message: "What is the Roles department id",
      name: "department_id",
    },
  ];
  inquirer.prompt(questions).then((response) => {
    db.query(
      "INSERT INTO role (name) VALUES (?)",
      [response.department],
      function (err, results) {
        console.table(results);
        startEmpDB();
      }
    );
  });
}

// function that adds a new employee

function addEmployee() {
  const questions = [
    {
      type: "input",
      message: "What is the Employees first name",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is the Employees last name",
      name: "last_name",
    },
    {
      type: "input",
      message: "What is the Employees Role id",
      name: "role_id",
    },
    {
      type: "input",
      message: "What is the Employees Managers id",
      name: "manager_id",
    },
  ];
  inquirer.prompt(questions).then((response) => {
    db.query(
      "INSERT INTO role (name) VALUES (?)",
      [response.department],
      function (err, results) {
        console.table(results);
        startEmpDB();
      }
    );
  });
}

// function that updates an employees role

const callEmployee = () => {
  db.query("SELECT * FROM employee", (err, employees) => {
    if (err) console.log(err);
    employees = employees.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    db.query("SELECT * FROM role", (err, roles) => {
      if (err) console.log(err);
      roles = roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "selectEmployee",
            message: "Select the Employee you wish to update.",
            choices: employees,
          },
          {
            type: "list",
            name: "selectNewRole",
            message: "Please select the employees new role.",
            choices: roles,
          },
        ])
        .then((data) => {
          db.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: data.selectNewRole,
              },
              {
                id: data.selectEmployee,
              },
            ],
            function (err) {
              if (err) throw err;
            }
          );
          console.log("Database has been updated!");
          viewAllRoles();
        });
    });
  });
};

// the intial call to start the application

startEmpDB();
