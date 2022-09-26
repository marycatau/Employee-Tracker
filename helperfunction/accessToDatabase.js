const mysql = require('mysql2/promise');

class accessToDatabase{
    //create the connection to database
    static connection(){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'employee_db',
            password: 'ch@n26646199',
        });

    }
    
    static async displayAllDepart(){
        const db = await accessToDatabase.connection();
        const sql =`SELECT * FROM department;`
        const [rows, fields] = await db.query(sql);
        //console.log(rows);
        return rows;
    }

    static async viewAllRole(){
        const db = await accessToDatabase.connection();
        const sql =`SELECT role.id, role.title,department.name AS department, role.salary 
        FROM role
        INNER JOIN department
        ON department.id = role.department_id;`
        const [rows, fields] = await db.query(sql);
        //console.log(rows);
        return rows;
    }

    static async viewAllEmployee(){
        const db = await accessToDatabase.connection();
        const sql =`SELECT  
        employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, MANAGER.first_name AS Manager
        FROM employee
        INNER JOIN role
        ON role.id = employee.role_id
        INNER JOIN department
        on role.department_id=department.id
        LEFT JOIN employee MANAGER
        ON employee.manager_id = MANAGER.id;`
        const [rows, fields] = await db.query(sql);
        //console.log(rows);
        return rows;
    }

    static async addADepart(name){
        const db = await accessToDatabase.connection();
        const sql =`INSERT INTO department (name)
        VALUES  ("`+ name +`");`
        const [rows, fields] = await db.query(sql);
        //console.log(rows);
        console.log('New department is added to database');
        return rows;
    }

    static async addARole(data){
        const db = await accessToDatabase.connection();
        const sql =`INSERT INTO role (title, department_id,salary) VALUES  ('`+data.title+`',` +data.departId+`, `+data.Salary+`);`
        const [rows, fields] = await db.query(sql);
        //console.log(rows);
        console.log('New Role is added to database');
        return rows;
    }

    static async addAnEmployee(data){
        const db = await accessToDatabase.connection();
        //INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  ('John', 'Doe',  1 ,NULL),
        const sql =`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  ('`+data.firstname+`', '`+data.lastname+`',`+data.roleId+ `,`+data.managerId+`);`
        const [rows, fields] = await db.query(sql);
        //console.log(rows);
        console.log('New Employee is added to database');
        return rows;
    }

    static async updateEmployee(data){
        const db = await accessToDatabase.connection();
        //UPDATE employee SET role_id = "strawberry" WHERE id = 1;
        const sql =`UPDATE employee SET role_id = "`+data.roleId+`" WHERE id =`+data.employeeId+`;`
        const [rows, fields] = await db.query(sql);
        //console.log(rows);
        console.log('Employee details is updated to database');
        return rows;
    }

    static async updateManager(data){
        const db = await accessToDatabase.connection();
        //UPDATE employee SET role_id = "strawberry" WHERE id = 1;
        const sql =`UPDATE employee SET manager_id = "`+data.managerId+`" WHERE id =`+data.employeeId+`;`
        const [rows, fields] = await db.query(sql);
        //console.log(rows);
        console.log('Manager details is updated to database');
        return rows;
    }

}


module.exports = accessToDatabase;