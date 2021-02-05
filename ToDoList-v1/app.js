const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
let items = [];
let workItems =[];

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  let day = date.getDate();
  res.render("list", {listTitle: day, addItems: items});
});


app.post("/", function(req,res){
  let newItem = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(newItem);
    res.redirect("/work");
  }else{
    items.push(newItem);
    res.redirect("/");
  }
})


app.get("/work", function(req, res){
  res.render("list", {listTitle:"Work", addItems: workItems})
});


app.listen(3000, function(){
  console.log("Server is up on port 3000");
})
