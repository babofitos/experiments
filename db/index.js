var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server
  , Db = require('mongodb').Db

var db = new Db('testdb', new Server('localhost', 27017))

db.open(function(err, db) {
  if (err) throw err

  console.log('Connected to db')
})

exports.findAll = function(cb) {
  db.collection('users', function(err, collection) {
    if (err) cb(err)
    else {
      collection.find().toArray(function(err, items) {
        if (err) cb(err)
        else cb(null, items)
      })
    }
  })
}