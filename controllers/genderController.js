let models = require('../models')

module.exports = {
  list: function(req, res) {
    var result = {
      success: false
    }
    models.Gender.findAll({
      attributes: ['id', 'name']
    })
    .then(genders => {
      result.success = true
      result.genders = genders
      res.json(result)
    })
    .catch(err => {
      if (err.errors) {
        result.error = err.errors
        res.status(500).json(result)
      }
    })
  },
}
