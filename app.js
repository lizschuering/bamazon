var mysql = require('mysql');
var inquirer = require('inquirer');
var currencyFormatter = require('currency-formatter');
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "liz",
  
    // Your password
    password: "thisIsThePassword",
    database: "bamazon_DB"
  });

connection.connect(function(err) {
    if (err) throw err;
    //Checking to make sure there was a successful connection
    // console.log("connected as id " + connection.threadId  + "\n");
    // connection.end();
    showInventory();
});

function showInventory() {
    var query = 'SELECT item_id, product_name, price FROM products';
    connection.query(query, function(err, res) {
        // Display all products in the inventory
        console.table("--------------------------------------------------------","Welcome to Bamazon! Check out our inventory. \n", res);
        
        // Trigger function that asks the customer what product they want to purchase
        itemOrder();
    });
}

function itemOrder() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer.prompt([{
            type: 'input',
            name: 'prodID',
            message: 'What is the ID number of the item you would like to purchase?',
        },
        {
            type: 'input',
            name: 'prodQuantity',
            message: 'How many items would you like to purchase?'
        }
        ]).then(function(value) {
            var prodID = parseInt(value.prodID);
            //console.log("This is the id the user chose: ", prodID);
            var prodQuantity = parseInt(value.prodQuantity);
            //console.log("This is the quantity the user chose: ", prodQuantity);
            var chosenProd;
            for (i = 0; i < res.length; i++) {
                if (res[i].item_id === prodID) {
                    chosenProd = res[i];
                }
            }
            //console.table("Here's the chosen item: ", chosenProd);

            if (chosenProd.stock_quantity >= prodQuantity) {
                
                var newQuant = chosenProd.stock_quantity - prodQuantity
                //console.log("Here's the new quantity: ",newQuant);
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQuant
                    },
                    {
                        item_id: prodID
                    }
                ],
                function(error) {
                    if (error) throw err;
                    var prodTotal = "$" + prodQuantity * chosenProd.price;
                    console.log("--------------------------------------------------------","\nOrder placed successfully! Your total is", currencyFormatter.format(prodTotal, { locale: 'en-US' }), "\n");
                    showInventory();
                  }
            )} else {
                console.log("--------------------------------------------------------","\nThere isn't enough inventory to fulfill you order. Please select another item.\n");
                showInventory();
            }
        });
    })
}