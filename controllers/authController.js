let models = require('../models')

module.exports = {
  register: function(req, res, next) {
    models.User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username
    }).then(user => {
      res.json(user)
    }).catch(err => {
      console.log('Error when trying to register : ', err);
    })
  }
}
