//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var crypto = req.body.Crypto;
  var fiat = req.body.Currency;
  var amount = req.body.amount;
  var options = {
    //base url
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    //for passing parameters
    qs : {
      from: crypto,
      to: fiat,
      amount: amount
    },
    //Api key for http get request
    headers: {
      'x-ba-key': 'ZjIzMDAzZWU2Y2E1NDc1MTk0NzAxYTk4M2YyZGE2ZjY'
    }
  };
  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    res.write("<p>The time is " + data.time + "</p>");
    res.write("<h1>The price of " + amount + crypto + " is " + price + fiat + "</h1>");
    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server is live on port 3000");
});
