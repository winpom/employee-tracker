const inquirer = require("inquirer");
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
        employeeChoices} = require('./db/db.js');

// Connect to database
pool.connect();

// Main Options
const mainMenuOptions = {
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
    readEmployees() {
        readEmployees()
            .then(employees => {
                console.log("Employee List:");
                console.table(employees);
                mainMenu();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },

    createEmployee() {
        inquirer.prompt([
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
                choices: roleChoices(),
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "managerId",
                choices: employeeChoices(),
            }
        ])
        .then(employeeInfo => {
            createEmployee(employeeInfo.firstName, employeeInfo.lastName, employeeInfo.roleId, employeeInfo.managerId)
                .then(() => {
                    console.log("Employee added successfully!");
                    mainMenu();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },

    updateRole() {
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee's role would you like to update? (Use arrow keys)",
                name: "roleUpdate",
                choices: employeeChoices(),
            },
            {
                type: "list",
                message: "Which role would you like to assign to the selected employee? (Use arrow keys)",
                name: "assignRole",
                choices: roleChoices(),
            },
        ])
        .then(roleInfo => {
            updateRole(roleInfo.roleUpdate, roleInfo.assignRole)
                .then(() => {
                    console.log("Role updated successfully!");
                    mainMenu();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },

    readRoles() {
        readRoles()
            .then(roles => {
                console.log("Role List:");
                console.table(roles);
                mainMenu();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },

    createRole() {
        inquirer.prompt([
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
                choices: departmentChoices(),
            },
        ])
        .then(newRoleInfo => {
            createRole(newRoleInfo.roleName, newRoleInfo.roleSalary, newRoleInfo.roleDept)
                .then(() => {
                    console.log("Role added successfully!");
                    mainMenu();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },

    readDepartments() {
        readDepartments()
            .then(departments => {
                console.log("Department List:");
                console.table(departments);
                mainMenu();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },

    createDepartment() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the department?",
                name: "departmentName",
            },
        ])
        .then(deptInfo => {
            createDepartment(deptInfo.departmentName)
                .then(() => {
                    console.log("Department added successfully!");
                    mainMenu();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
};


// async function mainMenu() {
//     try {
//         const { action } = await inquirer.prompt({
//             type: 'list',
//             message: 'What would you like to do?',
//             name: 'action',
//             choices: Object.keys(mainMenuOptions),
//         })
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

function mainMenu() {
    inquirer.prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: Object.keys(mainMenuOptions),
    }).then((answers) => {
      const action = answers.action;
      actions[action]();
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

function init() {
    console.log(`
    ███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████     
    ██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██          
    █████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████       
    ██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██          
    ███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████     
                                                                             
                                                                             
    ███    ███  █████  ███    ██  █████   ██████  ███████ ██████             
    ████  ████ ██   ██ ████   ██ ██   ██ ██       ██      ██   ██            
    ██ ████ ██ ███████ ██ ██  ██ ███████ ██   ███ █████   ██████             
    ██  ██  ██ ██   ██ ██  ██ ██ ██   ██ ██    ██ ██      ██   ██            
    ██      ██ ██   ██ ██   ████ ██   ██  ██████  ███████ ██   ██            
                                                                                                                                                                                                          
    `);
    require('dotenv').config()
    mainMenu();
}

init();