const inquirer = require("inquirer");
const pool = require('./db/pool.js');
const { readDepartments,
    createDepartment,
    readRoles,
    createRole,
    readEmployees,
    createEmployee,
    updateRole,
    departmentChoices,
    roleChoices,
    employeeChoices } = require('./db/pool');
require('dotenv').config()

// Connect to database
pool.connect();

// Main Options
const mainOptions = {
    'View all employees': readEmployees,
    'Add an employee': createEmployee,
    'Update an employee role': updateRole,
    'View all roles': readRoles,
    'Add a role': createRole,
    'View all departments': readDepartments,
    'Add a department': createDepartment,
    'Exit': () => {
        console.log('Exiting application...');
        process.exit();
    }
};

const actions = {
    async readEmployees() {
        try {
            const employees = await readEmployees();
            console.log("Employee List:");
            console.table(employees);
            await init();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    async createEmployee() {
        try {
            const employeeInfo = await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the employee's first name?",
                    name: "firstName",
                },
                {
                    type: "input",
                    message: "What is the employee's last name?",
                    name: "lastName",
                },
                {
                    type: "list",
                    message: "What is the employee's role?",
                    name: "roleId",
                    choices: await roleChoices(),
                },
                {
                    type: "list",
                    message: "Who is the employee's manager?",
                    name: "managerId",
                    choices: await employeeChoices(),
                }
            ]);

            await createEmployee(employeeInfo.firstName, employeeInfo.lastName, employeeInfo.roleId, employeeInfo.managerId);
            console.log("Employee added successfully!");
            await init();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    async updateRole() {
        try {
            const roleInfo = await inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee's role would you like to update? (Use arrow keys)",
                    name: "roleUpdate",
                    choices: await employeeChoices(),
                },
                {
                    type: "list",
                    message: "Which role would you like to assign to the selected employee? (Use arrow keys)",
                    name: "assignRole",
                    choices: await roleChoices(),
                },
            ]);

            await updateRole(roleInfo.roleUpdate, roleInfo.assignRole,);
            console.log("Role updated successfully!");
            await init();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    async readRoles() {
        try {
            const roles = await readRoles();
            console.log("Role List:");
            console.table(roles);
            await init();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    async createRole() {
        try {
            const newRoleInfo = await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the name of the role?",
                    name: "roleName",
                },
                {
                    type: "input",
                    message: "What is the salary of the role?",
                    name: "roleSalary",
                },
                {
                    type: "list",
                    message: "What department does the role belong to? (Use arrow keys)",
                    name: "roleDept",
                    choices: await departmentChoices(),
                },
            ]);

            await createRole(newRoleInfo.roleName, newRoleInfo.roleSalary, newRoleInfo.roleDept);
            console.log("Role added successfully!");
            await init();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    async readDepartments() {
        try {
            const departments = await readDepartments();
            console.log("Department List:");
            console.table(departments);
            await init();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    async createDepartment() {
        try {
            const deptInfo = await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the name of the department?",
                    name: "departmentName",
                },
            ]);

            await createDepartment(deptInfo.departmentName);
            console.log("Department added successfully!");
            await init();
        } catch (error) {
            console.error('Error:', error);
        }
    },
};


async function init() {
    console.log(`
    _____ __  __ ____  _     _____   _______ _____   __  __    _    _   _    _    ____ _____ ____  
    | ____|  \/  |  _ \| |   / _ \ \ / / ____| ____| |  \/  |  / \  | \ | |  / \  / ___| ____|  _ \ 
    |  _| | |\/| | |_) | |  | | | \ V /|  _| |  _|   | |\/| | / _ \ |  \| | / _ \| |  _|  _| | |_) |
    | |___| |  | |  __/| |__| |_| || | | |___| |___  | |  | |/ ___ \| |\  |/ ___ \ |_| | |___|  _ < 
    |_____|_|  |_|_|   |_____\___/ |_| |_____|_____| |_|  |_/_/   \_\_| \_/_/   \_\____|_____|_| \_\
                                                                                                    
    `)
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [mainOptions]
        }
    ]);
    await actions[action]();
}

init();