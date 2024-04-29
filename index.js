const inquirer = require('inquirer');
const pool = require('./db/pool');
const { readDepartments,
    createDepartment,
    readRoles,
    createRole,
    readEmployees,
    createEmployee,
    updateRole,
    departmentChoices,
    roleChoices,
    employeeChoices } = require('./db/db.js');

// Connect to database
pool.connect();

// User Actions

async function mainMenu() {
    // Prompt user for action selection
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    console.log(action)

    // Perform action based on user selection
    switch (action) {
        case 'View all departments':
            await readDepartments();
            break;
        case 'View all roles':
            await readRoles();
            break;
        case 'View all employees':
            await readEmployees();
            break;
        case 'Add a department':
            await createDepartment();
            break;
        case 'Add a role':
            await createRole();
            break;
        case 'Add an employee':
            await createEmployee();
            break;
        case 'Update an employee role':
            await updateRole();
            break;
        case 'Exit':
            console.log('Exiting application...');
            process.exit();
    }

    // Restart the application
    mainMenu();
}

const actions = {
    async readEmployees() {
        try {
            const employees = await readEmployees();
            console.log("Employee List:");
            console.table(employees);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mainMenu();
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
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mainMenu();
        }
    },

    async updateRole() {
        try {
            const roleInfo = await inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee's role would you like to update?",
                    name: "roleUpdate",
                    choices: await employeeChoices(),
                },
                {
                    type: "list",
                    message: "Which role would you like to assign to the selected employee?)",
                    name: "assignRole",
                    choices: await roleChoices(),
                },
            ]);
            await updateRole(roleInfo.roleUpdate, roleInfo.assignRole);
            console.log("Role updated successfully!");
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mainMenu();
        }
    },

    async readRoles() {
        try {
            const roles = await readRoles();
            console.log("Role List:");
            console.table(roles);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mainMenu();
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
                    message: "What department does the role belong to?",
                    name: "roleDept",
                    choices: await departmentChoices(),
                },
            ])
            await createRole(newRoleInfo.roleName, newRoleInfo.roleSalary, newRoleInfo.roleDept)
            console.log("Role created successfully!");
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mainMenu();
        }
    },

    async readDepartments() {
        try {
            const departments = await readDepartments();
            console.log("Department List:");
            console.table(departments);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mainMenu();
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
            await createDepartment(deptInfo.departmentName)
            console.log("Department added successfully!");
        } catch (error) {
            console.error('Error:', error);
        } finally {
            mainMenu();
        }
    },
};

// Main Menu Options
const mainMenuOptions = {
    'View all employees': actions.readEmployees,
    'Add an employee': actions.createEmployee,
    'Update an employee role': actions.updateRole,
    'View all roles': actions.readRoles,
    'Add a role': actions.createRole,
    'View all departments': actions.readDepartments,
    'Add a department': actions.createDepartment,
    'Exit': () => {
        console.log('Exiting application...');
        process.exit();
    },
};

// function mainMenu() {
//     inquirer.prompt([{
//         type: 'list',
//         message: 'What would you like to do?',
//         name: 'action',
//         choices: mainMenuOptions,
//     }]).then((answer) => {
//         const action = answer.action;
//         actions[action]();
//     }).catch((error) => {
//         console.error('Error:', error);
//     });
// }

function init() {
    // console.log(`
    // ███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████     
    // ██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██          
    // █████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████       
    // ██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██          
    // ███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████     


    // ███    ███  █████  ███    ██  █████   ██████  ███████ ██████             
    // ████  ████ ██   ██ ████   ██ ██   ██ ██       ██      ██   ██            
    // ██ ████ ██ ███████ ██ ██  ██ ███████ ██   ███ █████   ██████             
    // ██  ██  ██ ██   ██ ██  ██ ██ ██   ██ ██    ██ ██      ██   ██            
    // ██      ██ ██   ██ ██   ████ ██   ██  ██████  ███████ ██   ██            

    // `);

    mainMenu();
}

init();