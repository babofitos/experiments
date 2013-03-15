// var users = require('../../data/users')
var collection = require('../../db/index')

function loadUser (req, res, next) {
  var user = req.user = users[req.params.name]

    if (!user) {
      res.send('Not Found', 404)
    } else {
      next()
    }
}

module.exports = loadUser