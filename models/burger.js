const orm = require("../config/orm");


const burger = {
  all: function(callback) {
    orm.all("burgers", function(res) {
      callback(res);
    });
  },

  create: function(cols, vals, callback) {
    orm.create("burgers", cols, vals, function(res) {
      callback(res);
    });
  },

  update: function(cols, vals, condition, callback) {
    orm.update("burgers", cols, vals, condition, function(res) {
      callback(res);
    });
  },

  reset: function(callback) {
    let condition1 = "id <= 4 "
    let vals = false;
    let cols = "devoured"
    orm.update("burgers", cols, vals, condition1, function(res1){
      console.log(res1);
    })
    let condition2 = "id > 4";
    orm.delete("burgers", condition2, function(res) {
      callback(res);
    });
  }
};

module.exports = burger;