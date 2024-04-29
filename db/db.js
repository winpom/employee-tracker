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
    const query = 'SELECT * FROM roles';
    const { rows } = await pool.query(query);
    console.log("Role List:");
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createRole() {
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
    ]);

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
    const query = 'SELECT * FROM employees';
    const { rows } = await pool.query(query);
    console.log("Employee List:");
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createEmployee() {
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
    const roleInfo = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee's role would you like to update?",
        name: "roleUpdate",
        choices: await employeeChoices(),
      },
      {
        type: "list",
        message: "Which role would you like to assign to the selected employee?",
        name: "assignRole",
        choices: await roleChoices(),
      },
    ]);
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

const departmentChoices = async () => {
  const departmentQuery = `SELECT id AS value, name FROM departments`;
  const departments = await pool.query(departmentQuery);
  return departments.rows;
};

const roleChoices = async () => {
  const roleQuery = `SELECT id AS value, name FROM roles`;
  const roles = await pool.query(roleQuery);
  return roles.rows;
};

const employeeChoices = async () => {
  const employeeQuery = `SELECT id AS value, name FROM employees`;
  const employees = await pool.query(employeeQuery);
  return employees.rows;
};

module.exports = {
  readDepartments,
  createDepartment,
  readRoles,
  createRole,
  readEmployees,
  createEmployee,
  updateRole,
};