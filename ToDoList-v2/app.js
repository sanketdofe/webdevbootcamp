const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
//const date = require(__dirname + "/date.js");

//let day = date.getDate();

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin-nicky:sanket123@cluster0-tg2la.mongodb.net/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = mongoose.Schema({
  name: String
});
const Item = mongoose.model("Item", itemsSchema);



const item1 = new Item({
  name: "Welcome to your ToDoList"
});
const item2 = new Item({
  name: "Use + to add to your list"
});
const item3 = new Item({
  name: "<--Click this to check this item"
});
const defaultItems = [item1, item2, item3];



const listSchema = mongoose.Schema({
  name: String,
  items: [itemsSchema]
});
const List = mongoose.model("List", listSchema);




app.get("/", function(req, res){
  Item.find({}, function(err, items){
    if(items.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully Inserted.");
        }
      });
    }else{
      res.render("list", {listTitle: "Today", addItems: items});
    }
  });
});


app.get("/:customList", function(req, res){
  const customListName = _.capitalize(req.params.customList);
  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        //create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      }else {
        //show the existing list
        res.render("list", {listTitle: foundList.name, addItems: foundList.items});
      }
    }else {
      console.log(err);
    }
  });
});






app.post("/", function(req,res){
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});


app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if(err){
        console.log(err);
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/" + listName);
      }
    });
  }
});




// app.get("/work", function(req, res){
//   res.render("list", {listTitle:"Work", addItems: workItems})
// });


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is up");
});
