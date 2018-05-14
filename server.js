const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Using Handlebars here
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });

//DB Connection
const connection = require("./config/connection");
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.listen(port, function() {
  console.log("listening on port", port);
});



//Basic routes 
// Serve index.handlebars to the root route
app.get("/", function(req, res) {
  connection.query("SELECT * FROM things;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }
    res.render("index", { things: data });
  });
});

app.post("/new", function(req, res) {
  connection.query(
    "INSERT INTO things (thing) VALUES (?)",
    [req.body.thing],
    function(err, result) {
      if (err) {
        return res.status(500).end();
      }
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    }
  );
});

// Update a todo
app.put("/things/:id", function(req, res) {
  connection.query(
    "UPDATE things SET thing = ? WHERE id = ?",
    [req.body.thing, req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server faliure
        return res.status(500).end();
      } else if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

app.delete("things/:id", function(req, res) {
  connection.query("DELETE FROM things WHERE id = ?", [req.params.id], function(
    err,
    result
  ) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    } else if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
