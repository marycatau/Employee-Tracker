const logo = require('asciiart-logo');
const question = require('./helperfunction/question');
const accessToDatabase = require('./helperfunction/accessToDatabase');
const display = require ('./helperfunction/Display');


function renderlogo(){
    console.log(logo({
        name: 'Employee Manager',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'bold-green',
        textColor: 'green',
    }).render());
}

async function mainoperation(option){
  switch(option) {
    case 'View All Departments':
      var result = await accessToDatabase.displayAllDepart();
      //console.log(result);
      display.displayfunction(result);
      break;
    case 'View All Roles':
      var result = await accessToDatabase.viewAllRole();
      //console.log(result);
      display.displayfunction(result);
      break;
    case 'View All Employee':
      var result = await accessToDatabase.viewAllEmployee();
      //console.log(result);
      display.displayfunction(result);
      break;
    case 'Add A Departments':
      var departname = await question.askForDepartName();
      //console.log(departname);
      await accessToDatabase.addADepart(departname);
      break;
    case 'Add A Role':
      var department = await accessToDatabase.displayAllDepart();
      //console.log(department);

      var newrole = await question.askForRoleName(department);
      //console.log(newrole);
      await accessToDatabase.addARole(newrole);
      break;


    case 'Add An Employee':
      var allRole = await accessToDatabase.viewAllRole();
      //console.log(allRole);

      var allEmployee = await accessToDatabase.viewAllEmployee();
      //console.log(allEmployee);

      var newemployee = await question.askForEmployeeDetail(allRole,allEmployee);
      //console.log(newemployee);
      await accessToDatabase.addAnEmployee(newemployee);
      break;


    case 'Updated An Employee Role':
      var allRole = await accessToDatabase.viewAllRole();
      //console.log(allRole);

      var allEmployee = await accessToDatabase.viewAllEmployee();
      //console.log(allEmployee);

      var update = await question.askForUpdateEmployeeRole(allRole,allEmployee);
      //console.log(update);
      await accessToDatabase.updateEmployee(update);
      break;

      case 'Update Employee Manager':
      var allEmployee = await accessToDatabase.viewAllEmployee();
      //console.log(allEmployee);

      var update = await question.askForUpdateManager(allEmployee);
      //console.log(update);
      await accessToDatabase.updateManager(update);
      break;

  }

}



async function Init(){
  renderlogo();
  var mainOption;
  while(mainOption !== 'Exit'){
  mainOption = await question.displayMainMenu();
  //console.log (mainOption);
  await mainoperation(mainOption);

}
}

Init();