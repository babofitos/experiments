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

exports.findByName = function(name, cb) {
  db.collection('users', function(err, collection) {
    if (err) cb(err)
    else {
      collection.findOne({username: name}, function(err, item) {
        if (err) cb(err)
        else cb(null, item)
      })
    }
  })
}

exports.insert = function(doc, cb) {
  db.collection('users', function(err, collection) {
    if (err) cb(err)
    else {
      collection.insert(doc, {w:1}, function(err, result) {
        //result is an array of records inserted
        if (err) cb(err)
        else cb(null, result)
      })
    }
  })
}

exports.delete = function(username, cb) {
  db.collection('users', function(err, collection) {
    if (err) cb(err)
    else {
      collection.remove({username: username}, {w:1}, function(err, result) {
        if (err) cb(err)
        else cb(null, result)
      })
    }
  })
}

exports.verify = function(username, pass, cb) {
  db.collection('users', function(err, collection) {
    if (err) cb(err)
    else {
      collection.findOne({username: username, password: pass}, function(err, item) {
        if (err) cb(err)
        else cb(null, item)
      })
    }
  })
}