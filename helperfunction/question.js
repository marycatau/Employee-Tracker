const inquirer = require('inquirer');

class QuestionsHelper{

    static async displayMainMenu() {
        var option = await inquirer.prompt([{
            type: 'rawlist',
            name: 'mainOption',
            message: 'What do you like to do?',
            choices: ['View All Departments','View All Roles','View All Employee','Add A Departments','Add A Role','Add An Employee','Updated An Employee Role']
          },
        ]);
        console.log('You choice is:'+ option.mainOption);
        return option.mainOption;
    }

    static async askForDepartName() {
        var name = await inquirer.prompt([{
            type: 'input',
            name: 'departName',
            message: 'What department do you want to add?',
          },
        ]);
        console.log('The department name is:'+ name.departName);
        return name.departName;
    }

}

module.exports = QuestionsHelper;