var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    afterConnection();
    orderProduct();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res){
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------");
    });
}

function orderProduct() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: function() {
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item_id);
                    }
                    return choiceArray;
                },
                message: "What product would you like to order?"
            },
            {
                name: "item",
                type: "input",
                message: "How many would you like?"
            }
        ])
        .then(function(answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === answer.choice) {
                    chosenItem = results[i];
                }
            }
        });
    });
}