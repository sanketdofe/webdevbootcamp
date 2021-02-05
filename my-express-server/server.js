//jshint esversion:6

const express = require("express");
const app = express();


app.get("/", function(req, res) {
  res.send("<h1>Hello</h1>");
});

app.get("/about", function(req, res){
  res.send("Nicky here");
});

app.get("/kick", function(req, res){
  res.send("I am a believer!!");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
