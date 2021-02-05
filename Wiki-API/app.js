const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

articleSchema = mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("Article", articleSchema);



////////////////////////////////Requests targetting all Articles//////////////////////////////////////

app.route("/articles")
.get(function(req, res){
  Article.find({}, function(err, articlesFound){
    if(!err){
      res.send(articlesFound);
    }else {
      res.send(err);
    }
  });
})
.post(function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully addded new article.")
    }else{
      res.send(err);
    }
  });
})
.delete(function(req, res){
  Article.deleteMany({}, function(err){
    if (!err) {
      res.send("Successfully Deleted All Articles.");
    } else {
      res.send(err);
    }
  });
});



////////////////////////////////Requests targetting a specific Articles//////////////////////////////////////

app.route("/articles/:articleTitle")
.get(function(req, res){
  Article.findOne({title: req.params.articleTitle}, function(err, articleFound){
    if(articleFound){
      res.send(articleFound);
    } else {
      res.send("Article not found");
    }
  });
})
.put(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully Updated the Article.");
      } else {
        res.send(err);
      }
    }
  );
})
.patch(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully Updated the Article.");
      } else {
        res.send(err);
      }
    }
  );
})
.delete(function(req, res){
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if (!err) {
        res.send("Successfully Deleted the Article");
      } else {
        res.send(err);
      }
    }
  );
});

//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
