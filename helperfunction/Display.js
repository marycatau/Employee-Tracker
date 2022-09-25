const cTable = require('console.table');

class display{
    static displayfunction (data){
        const table = cTable.getTable(data);
        console.log(table);
    }

}


module.exports = display;