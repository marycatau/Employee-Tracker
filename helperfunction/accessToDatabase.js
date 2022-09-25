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
        const sql =`SELECT role.id, role.title,department.name, role.salary 
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
        employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, MANAGER.first_name AS Manager
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

}


module.exports = accessToDatabase;