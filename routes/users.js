
/*
 * GET users listing.
 */
// var users = require('../data/users.json')
var usersCollection = require('../db/index')
  , notLoggedIn = require('./middleware/not_logged_in')
  , loadUser = require('./middleware/load_user')
  , restrictUserToSelf = require('./middleware/restrict_user_to_self')

module.exports = function(app) {
  app.get('/users', function(req, res){
    usersCollection.findAll(function(err, users) {
      if (err) res.send('Something went wrong', 500)
      else res.render('users/index', {title: 'Users', users: users})
    })
  })

  app.get('/users/new', notLoggedIn, function(req, res) {
    res.render('users/new', {title: 'New User'})
  })

  app.get('/users/:name', loadUser, function(req, res, next) {
    res.render('users/profile', {title: 'User profile', user: req.user})
  })

  app.post('/users', notLoggedIn, function(req, res) {
    usersCollection.findByName(req.body.username, function(err, name) {
      if (err) res.send('Something went wrong', 500)
      else {
        if (name !== null) {
          res.send('Conflict', 409)
        } else {
          usersCollection.insert(req.body, function(err, result) {
            if (err) res.send('Something went wrong', 500)
            else {
              res.redirect('/users')
            }
          })
        }
      }
    })
  })
  
  app.del('/users/:name', loadUser, restrictUserToSelf, function(req, res, next) {
    usersCollection.delete(req.user.username, function(err, result) {
      if (err) res.send('Something went wrong', 500)
      else res.redirect('/users')
    })
  })
}
