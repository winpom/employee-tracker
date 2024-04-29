const inquirer = require('inquirer');
const pool = require('./db/pool');
const { readDepartments,
    createDepartment,
    readRoles,
    createRole,
    readEmployees,
    createEmployee,
    updateRole} = require('./db/db.js');

// Connect to database
pool.connect();

// Main Menu function
async function mainMenu() {
    // Prompt user for action selection
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'Add an employee',
                'Update an employee role',
                'View all roles',
                'Add a role',
                'View all departments',
                'Add a department',
                'Exit'
            ]
        }
    ]);

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
    mainMenu();
}

init();