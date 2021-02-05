//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function(){
  console.log("server is up on port 3000");
});

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;


  var data = {
      'members': [
        {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: fName,
          LNAME: lName
          }
        }
      ],
    };

    var jsonData = JSON.stringify(data);

  var options = {
    url: 'https://us19.api.mailchimp.com/3.0/lists/7a58a09682',
    method: 'POST',
    headers: {
      'Authorization': "nicky 99c41ebf317f456411f8f70c2d68ffac-us19"
    },
    body: jsonData
  };
  request(options, function(error, response, body){
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    } else {
      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});



app.post("/failure.html", function(req, res){
  res.redirect("/");
});
