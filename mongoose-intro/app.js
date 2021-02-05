const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitDB", {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name specified!"]
  },
  score: Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Person has no name"]
  },
  age: Number,
  favFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);


// const john = new Person({
//   name: "John",
//   age: 37
// });

//john.save();


// const apple = new Fruit({
//   name: "Apple",
//   score: 8,
//   review: "Very Healthy"
// });
//
// apple.save();

// const banana = new Fruit({
//   name: "Banana",
//   score: 4,
//   review: "Tastes nice in custard"
// });
//
const mango = new Fruit({
  name: "Mango",
  score: 10,
  review: "Very Tasty"
});
//
// const grapes = new Fruit({
//   name: "Grapes",
//   score:6,
//   review: "Sweet and Sour"
// });

// const peach = new Fruit({
//   name: "Peach",
//   score:6,
//   review: "peaches are great"
// });
//
// peach.save();
//
//
// const amy = new Person({
//   name: "Amy",
//   age: 22,
//   favFruit: peach
//
// });
//
// amy.save();

// Fruit.insertMany([banana, mango, grapes], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Sucessfully added the fruits");
//   }
// });

Person.updateOne({name: "John"}, {favFruit: mango}, function (err) {
  if(err){
    console.log(err);
  }else{
    console.log("Successfully Updated");
  }
});

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});
