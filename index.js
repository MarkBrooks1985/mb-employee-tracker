// get the client
const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Pass123",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

// ask user bunch of questions.
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
          buildRoleArray();
          break;
      }
    });
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    startEmpDB();
  });
}

function viewAllRoles() {
  db.query(
    "SELECT * FROM role JOIN department ON role.department_id = department.id",
    function (err, results) {
      console.table(results);
      startEmpDB();
    }
  );
}

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

// have three questions (title, salary, department id) for add role

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

// employe same as role but have four questions (first, last, role id, manager id)
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

var employeeIDArray = [];

function buildEmployeeIDArray() {
  const query = `SELECT DISTINCT CONCAT(x.first_name, " ", x.last_name) AS employee_name, x.id AS employee_id
   FROM employee e
   LEFT JOIN employee x
   ON e.id = x.id`;
  db.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      employeeIDArray.push(res[i]);
    }
  });
}

function buildRoleArray() {
  const query = `SELECT id, title FROM role;`;
  const empQuery = `SELECT first_name, last_name AS employee_name FROM employee;`;
  db.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  });
}

// function updateEmployeeRole() {
//   var employeeDetails = []
//   db.query("SELECT DISTINCT CONCAT(x.first_name, " ", x.last_name) AS employee_name, x.id AS employee_id FROM employee e LEFT JOIN employee x ON e.id = x.id;");
// }

// function updateEmployee() {
//   db.query(
//     "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.id = role.id;",
//     (err, res) => {
//       if (err) throw err;

//       inquirer
//         .prompt([
//           {
//             name: "last_name",
//             type: "rawlist",
//             choices: function () {
//               var lastName = [];
//               for (var i = 0; i < res.length; i++) {
//                 lastName.push(res[i].lastName);
//               }
//               return lastName;
//             },
//             message: "What is the Employees last name",
//           },
//           {
//             name: "role",
//             type: "rawlist",
//             message: "What is the Employees New Role",
//             choices: addRole(),
//           },
//         ])
//         .then(function (answers) {
//           var roleId = addRole().indexOf(answers.role) + 1;
//           db.query(
//             "UPDATE employee SET WHERE ?",
//             {
//               lastName: answers.lastName,
//               roleId: roleId,
//             },
//             function (err) {
//               if (err) throw err;
//               console.table(answers);
//               startEmpDB();
//             }
//           );
//         });
//     }
//   );
// }

startEmpDB();
