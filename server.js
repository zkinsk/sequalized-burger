var express = require("express");
var app = express();

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// This is the port that the express surver is going to listen to
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
var routes = require("./controllers/burgers_controller.js");
app.use(routes);



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});