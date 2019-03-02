var express = require("express");
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Get all burgers from database for display
router.get("/", function(req, res) {
  burger.all(function(data) {
    console.log(data);
    let burgersToEat = [];
    let burgersAte = [];
    data.forEach(function(burger){
      if (burger.devoured){
        burgersAte.push(burger)
      }else{burgersToEat.push(burger)};
    })
    // console.log(data);
    burgersToEat.reverse();
    res.render("index", {title:"Eat Dat Burger", burgersToEat: burgersToEat, burgersAte: burgersAte});
    // res.render("index", {title:"Eat Dat Burger", burgers: data}); I tried to send just the data and let handlebars sort it with if & unless, 
    // but I couldn't get the else statements I have in there to work correctly with the if and unless statements
  });
});

// post a new burger to the database
router.post("/api/burger", function(req, res) {
  // console.log(req.body);
  burger.create([
    "burger_name"
  ], [
    req.body.newBurger,
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// patch route to update burger devoured boolean
router.patch("/api/burger", function(req, res) {
  // console.log(req.body);
  let condition = "id = " + req.body.ateID;
  let cols = "devoured";
  let vals = true;
  burger.update(cols, vals, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// reset the burger list & database back to the original 4 burgers that were entered
router.delete("/api/burger/", function(req, res) {
  burger.reset(function(result) {
      res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
