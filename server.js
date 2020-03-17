var express = require("express");
var app = express();
//var router = express.Router();

// set the view engine to ejs
app.set("view engine", "ejs");
// public folder to store assets
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
    res.render("pad");
});
app.get("/(:id)", function(req, res) {
    res.render("pad");
});

var port = process.env.PORT || 8000;
app.listen(port);
