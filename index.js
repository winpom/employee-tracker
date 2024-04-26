const inquirer = require("inquirer");
const pool = require('./db/pool.js');
require('dotenv').config()

// Connect to database
pool.connect();

// Questions for user
const questions = [{
    type: "list",
    message: "What would you like to do? (Use arrow keys)",
    name: "open",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"], 
},
{
    when: input => {
        return input.open == "Add Department"
    },
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName",
},
{
    when: input => {
        return input.open == "Add Role"
    },
    type: "input",
    message: "What is the name of the role?",
    name: "roleName",
},
{
    when: input => {
        return input.roleName == true
    },
    type: "input",
    message: "What is the salary of the role?",
    name: "roleSalary",
},
{
    when: input => {
        return input.roleSalary == true
    },
    type: "list",
    message: "What department does the role belong to? (Use arrow keys)",
    name: "roleDept",
    choices: await departmentChoices(),
    when(answers) {
        return answers.task === ''
    }
},
{
    when: input => {
        return input.open == "Add Employee"
    },
    type: "input",
    message: "What is the employee's first name?",
    name: "employeeFirstName",
},
{
    when: input => {
        return input.employeeFirstName == true
    },
    type: "input",
    message: "What is the employee's last name?",
    name: "employeeLastName",
},
{
    when: input => {
        return input.employeeLastName == true
    },
    type: "list",
    message: "What is the employee's role? (Use arrow keys)",
    name: "empRole",
    choices: await roleChoices(),
    when(answers) {
        return answers.task === ''
    },
},
{
    when: input => {
        return input.empRole == true
    },
    type: "list",
    message: "Who is the employee's manager? (Use arrow keys)",
    name: "empManager",
    choices: await employeeChoices(),
    when(answers) {
        return answers.task === ''
    },
},
{
    when: input => {
        return input.open == "Update Employee Role"
    },
    type: "list",
    message: "Which employee's role would you like to update? (Use arrow keys)",
    name: "empRoleUpdate",
    choices: await employeeChoices(),
    when(answers) {
        return answers.task === ''
    },
},
{
    when: input => {
        return input.empRoleUpdate == true
    },
    type: "list",
    message: "Which role would you like to assign to the selected employee? (Use arrow keys)",
    name: "assignRole",
    choices: await roleChoices(),
    when(answers) {
        return answers.task === ''
    },
},
];

const departmentChoices = async () => {
    const departmentQuery = `SELECT id AS value, name FROM department;`;
    const departments = await connection.query(departmentQuery);
    return departments[0];
};

const roleChoices = async () => {
    const roleQuery = `SELECT id AS value, name FROM roles;`;
    const roles = await connection.query(roleQuery);
    return roles[0];
};

const employeeChoices = async () => {
    const employeeQuery = `SELECT id AS value, name FROM employees;`;
    const employees = await connection.query(employeeQuery);
    return employees[0];
};

const init = () => {
    inquirer
        .prompt(questions)
        .catch((error) => {
            console.error('Error:', error);
        });
}

init();