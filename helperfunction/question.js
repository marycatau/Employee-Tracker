const inquirer = require('inquirer');

class QuestionsHelper{

    static async displayMainMenu() {
        var option = await inquirer.prompt([{
            type: 'rawlist',
            name: 'mainOption',
            message: 'What do you like to do?',
            choices: ['View All Departments','View All Roles','View All Employee','Add A Departments','Add A Role','Add An Employee','Updated An Employee Role','Update Employee Manager','Exit']
          },
        ]);
        //console.log('You choice is:'+ option.mainOption);
        return option.mainOption;
    }

    static async askForDepartName() {
        var name = await inquirer.prompt([{
            type: 'input',
            name: 'departName',
            message: 'What department do you want to add?',
          },
        ]);
        //console.log('The department name is:'+ name.departName);
        return name.departName;
    }

    static async askForRoleName(alldepart) {
        var depart=[];
        for (var i=0; i<alldepart.length; i++){
            depart[i] = alldepart[i].name;
        }
        //console.log (depart);

        var newrole = await inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?',
          },
          {
            type: 'input',
            name: 'Salary',
            message: 'What is the salary of this position?',

          },
          {
            type: 'list',
            name: 'department',
            message: 'What department does this role belongs to?',
            choices: depart,

          }
        ]);

        for (var i=0; i<alldepart.length; i++){
            if (alldepart[i].name === newrole.department){
                newrole.departId = alldepart[i].id
            }
        }
        
        //console.log('The new role is:'+ newrole.title + newrole.Salary + newrole.department+newrole.departId);
        return newrole;
    }

    static async askForEmployeeDetail(allRole,allEmployee) {
        var roleList=[];
        for (var i=0; i<allRole.length; i++){
            roleList[i] = allRole[i].title;
        }
        //console.log (roleList);

        var employeeList=[];
        for (var i=0; i<allEmployee.length; i++){
            employeeList[i] = allEmployee[i].first_name +` `+ allEmployee[i].last_name;
        }
        employeeList.push('None');

        //console.log (employeeList);


        var newemployee = await inquirer.prompt([{
            type: 'input',
            name: 'firstname',
            message: 'What is the first name of the employee?',
          },
          {
            type: 'input',
            name: 'lastname',
            message: 'What is the last name of the employee?',

          },
          {
            type: 'list',
            name: 'title',
            message: 'What is the role of the employee?',
            choices: roleList,

          },
          {
            type: 'list',
            name: 'manager',
            message: 'What is the manager of the employee?',
            choices: employeeList,

          }
        ]);

        for (var i=0; i<allRole.length; i++){
            if (allRole[i].title === newemployee.title){
                newemployee.roleId= allRole[i].id
            }
        }

        for (var i=0; i<allEmployee.length; i++){
            if (allEmployee[i].first_name+` `+allEmployee[i].last_name === newemployee.manager){
                newemployee.managerId = allEmployee[i].id
            }
        }

        if (newemployee.manager==='None') newemployee.managerId=null;
        
        //console.log('The new employee detail is:'+ newemployee.firstname+ newemployee.lastname + newemployee.roleId+newemployee.managerId);
        return newemployee;
    }


    static async askForUpdateEmployeeRole(allRole,allEmployee) {
        var roleList=[];
        for (var i=0; i<allRole.length; i++){
            roleList[i] = allRole[i].title;
        }
        //console.log (roleList);

        var employeeList=[];
        for (var i=0; i<allEmployee.length; i++){
            employeeList[i] = allEmployee[i].first_name +` `+ allEmployee[i].last_name;
        }

        //console.log (employeeList);


        var update = await inquirer.prompt([
          {
            type: 'list',
            name: 'employee',
            message: 'Whoose role do you want to update?',
            choices: employeeList,

          },
          {
            type: 'list',
            name: 'title',
            message: 'Which role to you want to assign to the employee?',
            choices: roleList,

          }
        ]);

        for (var i=0; i<allRole.length; i++){
            if (allRole[i].title === update.title){
                update.roleId= allRole[i].id
            }
        }

        for (var i=0; i<allEmployee.length; i++){
            if (allEmployee[i].first_name+` `+allEmployee[i].last_name === update.employee){
                update.employeeId = allEmployee[i].id
            }
        }
        
        //console.log('The update employee detail is:'+ update.employee+update.roleId+update.employeeId+update.title);
        return update;
    }


    static async askForUpdateManager(allEmployee) {

      var employeeList=[];
      for (var i=0; i<allEmployee.length; i++){
          employeeList[i] = allEmployee[i].first_name +` `+ allEmployee[i].last_name;
      }

      //console.log (employeeList);


      var update = await inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Whoose manager do you want to update?',
          choices: employeeList,

        }
      ]);

      employeeList.splice(employeeList.indexOf(update.employee),1);

      var update1 = await inquirer.prompt([
        {
          type: 'list',
          name: 'manager',
          message: 'Who is the new manager of the employee?',
          choices: employeeList,

        }
      ]);


      for (var i=0; i<allEmployee.length; i++){
          if (allEmployee[i].first_name+` `+allEmployee[i].last_name === update.employee){
              update.employeeId = allEmployee[i].id
          }
          if (allEmployee[i].first_name+` `+allEmployee[i].last_name === update1.manager){
            update.managerId = allEmployee[i].id
          }
      }
      
      console.log('The manager detail is:'+ update.employee+update1.manager+update.employeeId+update.managerId);
      return update;
  }
}

module.exports = QuestionsHelper;