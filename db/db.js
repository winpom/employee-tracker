const pool = require('./pool');

const readDepartments = async () => {
    const query = 'SELECT * FROM departments';
    const { rows } = await pool.query(query);
    return rows;
  };
  
  const createDepartment = async (name) => {
    const query = `INSERT INTO departments (name) VALUES ('name')`;
    await pool.query(query, [name]);
  };
  
  const readRoles = async () => {
    const query = 'SELECT * FROM roles';
    const { rows } = await pool.query(query);
    return rows;
  };
  
  const createRole = async (title, salary, department_id) => {
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1)';
    await pool.query(query, [title, salary, department_id]);
  };
  
  const readEmployees = async () => {
    const query = 'SELECT * FROM employees';
    const { rows } = await pool.query(query);
    return rows;
  };
  
  const createEmployee = async (first_name, last_name, role_id, manager_id) => {
    const query = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id) 
    VALUES ('First Name', 'Last Name', role_id, manager_id)`;
    await pool.query(query, [first_name, last_name, role_id, manager_id]);
  };
  
  const updateRole = async (role_id) => {
    const query = `
    UPDATE employees
    SET role_id = new_role_id
    WHERE id = employee_id;`;
    await pool.query(query, [role_id]);
  };
  
  const departmentChoices = async () => {
    const departmentQuery = `SELECT id AS value, name FROM department`;
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
    departmentChoices,
    roleChoices,
    employeeChoices,
  };