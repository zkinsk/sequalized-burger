// Import MySQL connection.
var connection = require("../config/connection.js");

// selectAll()
// insertOne()
// updateOne()


function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};


// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  create: function(table, cols, vals, cb) {
    let queryString = ` INSERT INTO ${table} (${cols}) VALUES (${printQuestionMarks(vals.length)}) `
    console.log(queryString);
    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  update: function(table, cols, vals, condition, cb) {
    console.log(table, cols, condition);
    let queryString = ` UPDATE ${table} SET ${cols} = ${vals} WHERE (${condition}) `
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  delete: function(table, condition, cb) {
    let queryString = `DELETE FROM ${table} WHERE ${condition}` 
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
