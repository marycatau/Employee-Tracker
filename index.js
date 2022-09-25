

const logo = require('asciiart-logo');
const config = require('./package.json');
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
      //var departname = await question.displayMainMenu();


    case 'Add A Roles':

    case 'Add An Employee':

    case 'Updated An Employee Role':
      
  }

}



async function Init(){
  renderlogo();
  while(true){
  var mainOption = await question.displayMainMenu();
  //console.log (mainOption);
  await mainoperation(mainOption);

}
}

Init();