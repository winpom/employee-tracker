const inquirer = require('inquirer');
const pool = require('./pool');

async function readDepartments() {
  try {
    const query = 'SELECT * FROM departments';
    const { rows } = await pool.query(query);
    console.log("Department List:");
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createDepartment() {
  try {
    const deptInfo = await inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName",
      },
    ]);
    const { departmentName } = deptInfo;
    const query = 'INSERT INTO departments (name) VALUES ($1)';
    await pool.query(query, [departmentName]);
    console.log("Department added successfully!");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function readRoles() {
  try {
    const query = `SELECT 
    roles.id,
    roles.title,
    roles.salary,
    departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id;`;
    const { rows } = await pool.query(query);
    console.log("Role List:");
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createRole() {
  try {
    const deptQuery = 'SELECT id, name FROM departments';
    const deptResult = await pool.query(deptQuery);
    const deptChoices = deptResult.rows.map((row) => ({
      name: row.name,
      value: row.id
    }));

    questions = [      {
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
      choices: deptChoices,
    },
    ]

    const newRoleInfo = await inquirer.prompt(questions);

    const { roleName, roleSalary, roleDept } = newRoleInfo;

    const query = `
            INSERT INTO roles (title, salary, department_id) 
            VALUES ($1, $2, $3)
        `;
    await pool.query(query, [roleName, roleSalary, roleDept]);

    console.log("Role created successfully!");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function readEmployees() {
  try {
    const query = `SELECT 
    employees.id,
    employees.first_name,
    employees.last_name,
    roles.title, 
    departments.name AS department,
    roles.salary,
    CONCAT(manager.first_name,' ',manager.last_name) AS manager_name
    FROM departments
    JOIN roles
    ON departments.id=roles.department_id
    JOIN employees
    ON roles.id=employees.role_id
    LEFT JOIN employees manager
    ON employees.manager_id=manager.id;`;
    const { rows } = await pool.query(query);
    console.log("Employee List:");
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createEmployee() {
  try {
    const managerQuery = `SELECT id, CONCAT(employees.first_name, ' ', employees.last_name) AS manager_name FROM employees`;
    const managerResult = await pool.query(managerQuery);
    if (managerResult.rows.length === 0) {
      console.log("There are no managers available. Please add managers before adding employees.");
      mainMenu();
      return;
    }
    const employeeChoices = [
      { name: 'None', value: null },
      ...managerResult.rows.map((row) => ({
        name: row.manager_name,
        value: row.id
      }))
    ];

    const roleQuery = 'SELECT id, title FROM roles';
    const roleResult = await pool.query(roleQuery);
    const roleChoices = roleResult.rows.map((row) => ({
      name: row.title,
      value: row.id
    }));

    const questions = [
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
        choices: roleChoices,
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "managerId",
        choices: employeeChoices,
      }
    ];

    const employeeInfo = await inquirer.prompt(questions);

    const { firstName, lastName, roleId, managerId } = employeeInfo;

    const query = `
      INSERT INTO employees (first_name, last_name, role_id, manager_id) 
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [firstName, lastName, roleId, managerId]);

    console.log("Employee added successfully!");
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateRole() {
  try {
    // Fetch employee choices
    const employeeQuery = `SELECT id, CONCAT(employees.first_name, ' ', employees.last_name) AS employee_name FROM employees`;
    const employeeResult = await pool.query(employeeQuery);
    const employeeChoices = employeeResult.rows.map((row) => ({
      name: row.employee_name,
      value: row.id
    }));

    // Fetch role choices
    const roleQuery = 'SELECT id, title FROM roles';
    const roleResult = await pool.query(roleQuery);
    const roleChoices = roleResult.rows.map((row) => ({
      name: row.title,
      value: row.id
    }));

    const questions = [
      {
        type: "list",
        message: "Which employee's role would you like to update?",
        name: "roleUpdate",
        choices: employeeChoices,
      },
      {
        type: "list",
        message: "Which role would you like to assign to the selected employee?",
        name: "assignRole",
        choices: roleChoices,
      },
    ];

    const roleInfo = await inquirer.prompt(questions);

    const { roleUpdate, assignRole } = roleInfo;

    const query = `
      UPDATE employees
      SET role_id = $1
      WHERE id = $2;
    `;
    await pool.query(query, [assignRole, roleUpdate]);

    console.log("Role updated successfully!");
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  readDepartments,
  createDepartment,
  readRoles,
  createRole,
  readEmployees,
  createEmployee,
  updateRole,
};