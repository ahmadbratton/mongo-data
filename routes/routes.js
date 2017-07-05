const express = require("express");
const router = express.Router();
const mongodb = require('mongodb').MongoClient
const assert = require('assert');
var url = 'mongodb://localhost:27017/robots';
let collection;
let information;
let jobless;
let working;

const job = function (req,res,next) {
  let employed = function (db, callback) {
    collection = db.collection("info");
    collection.find({job: {$nin: [null]}}).toArray(function (err, docs) {
      working = docs;
      console.log(docs);
      callback(docs);
    })


  }
  mongodb.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("whats up mane");
    employed(db, function () {
      db.close();
      next();
    });
  });

}

const nojob = function (req,res,next) {
  let unemployed = function (db, callback) {
    collection = db.collection("info");
    collection.find({job: null}).toArray(function (err, docs) {
      jobless = docs;
      console.log(docs);
      callback(docs);
    })


  }
  mongodb.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("whats up mane");
    unemployed(db, function () {
      db.close();
      next();
    });
  });

}



const allware = function(req, res, next) {


  let getinfo = function (db, callback) {
    collection = db.collection("info");
    collection.find({}).toArray(function (err, docs) {
      information = docs;
      callback(docs);
    })


  }


  mongodb.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("whats up mane");
    getinfo(db, function () {


      db.close();
      next();
    });
  });


}



router.get("/", allware ,function (req , res) {
  // console.log("Here is the information: ", information);
  res.render("index", {users:information});

});

router.get("/unemployed", nojob, function (req,res) {
  res.render("index", {users:jobless});

});

router.get("/employed", job, function (req,res) {
  res.render("index", {users:working});
} );


module.exports = router;
