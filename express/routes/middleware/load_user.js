// var users = require('../../data/users')
var usersCollection = require('../../db/index')

function loadUser (req, res, next) {
  var user = req.params.name

  usersCollection.findByName(user, function(err, name) {
    if (err) next(err)
    else if (!name) {
      res.send('Not Found', 404)
    } else {
      req.user = name
      next()
    }
  })
}

module.exports = loadUser