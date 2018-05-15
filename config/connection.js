//Database Connection
var mysql = require("mysql");

//Import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE
});

// Export connection for our ORM to use.
module.exports = connection;