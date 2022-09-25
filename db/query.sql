SELECT role.id, role.title,department.name, role.salary 
FROM role
INNER JOIN department
ON department.id = role.department_id;


SELECT  
    employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, MANAGER.first_name AS Manager
FROM employee
INNER JOIN role
ON role.id = employee.role_id
INNER JOIN department
on role.department_id=department.id
LEFT JOIN employee MANAGER
ON employee.manager_id = MANAGER.id;