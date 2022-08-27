// get the client
const inquirer = require("inquirer");
const mysql = require("mysql2");

function startEmpDB() {
    type: "list",
    name: "action",
    choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "View All Employees by Department",
        "View All Employees by Roles",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee",
        "Exit"
    ]
};
