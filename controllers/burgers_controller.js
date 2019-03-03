var express = require("express");
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");

// Get all burgers from database for display
router.get("/", function(req, res) {
  db.Burger.findAll({}).then(function(data) {
    // console.log(data);
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
  });
});
//     // res.render("index", {title:"Eat Dat Burger", burgers: data}); I tried to send just the data and let handlebars sort it with if & unless, 
//     // but I couldn't get the else statements I have in there to work correctly with the if and unless statements
//   });
// });

// post a new burger to the database
router.post("/api/burger", function(req, res) {
  // console.log(req.body);
  let newBurger = req.body.newBurger;
  db.Burger.create({
    burger_name: newBurger
  }).then(function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// patch route to update burger devoured boolean
router.patch("/api/burger", function(req, res) {
  // console.log(req.body);
  db.Burger.update({
    devoured: true
  }, 
  {
    where: {id: req.body.ateID}
  }
  ).then(function(result) {
    res.json({ id: result.insertId });
  });
});

// reset the burger list & database back to the original 4 burgers that were entered
router.delete("/api/burger/", function(req, res) {
  console.log("destroy");
  db.Burger.destroy({
    where: { id: {gt: 4} } 
  }).then(function(result){
    db.Burger.update({
      devoured: false
    }, 
    {
      where: {id: {lte: 4}}
    }
    ).then(function(result) {
      res.json({ id: result.insertId });
    });
  })
});

// Export routes for server.js to use.
module.exports = router;
