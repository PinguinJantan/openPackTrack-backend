const paginate = require('express-paginate');

let models = require('../models')

module.exports = {
  create: function(req, res){
    var result = {
      success: false
    }
    if (!req.body.name) {
      result.message = "Please don't give blank size"
      res.status(412).json(result)
    }
    else {
      models.Size.create({name: req.body.name})
      .then(size=>{
        result.success = true
        result.size = size
        res.json(result)
      })
      .catch(err=>{
        if (err.errors) {
          result.message = "Operation failed with error(s)"
          result.errors = err.errors
        }
        res.json(result)
      })
    }
  },

  // All size
  all: function(req, res){
    var result = {
      success: false,
      sizes: null
    }
    models.Size.findAll()
    .then(data=>{
      var sizeCount = data.length
      var sizes = data
      result.success = true
      result.sizes = sizes
      res.json(result)
    })
    .catch(err=>{
      result.message = "Error while trying to get sizes."
      if (err.errors) {
        result.errors = err.errors
      }
      res.status(500).json(result)
    })
  },

  // update
  update: function(req, res){
    var result = {
      success: false
    }
    if (!req.body.name) {
      result.message = "Please don't give blank size"
      res.json(result)
    }
    else if (isNaN(req.body.id)) {
      result.message = "Size ID must be a number"
      res.json(result)
    }
    else {
      var changes = {
        name: req.body.name
      }
      models.Size.update(changes, {
        where: {
          id: req.body.id
        }
      })
      .then(size=>{
        if (size[0] == 0) { // if id not found, result will be: [0]
          result.message = "No size with ID " + req.body.id
          res.status(422).json(result)
        }
        else {
          result.success = true
          result.size = {
            id: req.body.id,
            name: req.body.name
          }
          res.json(result)
        }
      })
      .catch(err=>{
        // todo: give a message
        // result.message = ""
        result.error = err
        res.status(500).json(result)
      })
    }
  },

  // delete
  delete: function(req, res){
    var result = {
      success: false
    }
    if (!req.body.id) {
      result.message = "Please specify the size ID to be deleted"
      res.status(412).json(result)
    }
    else if (isNaN(req.body.id)) {
      result.message = "Size ID must be a number"
      res.status(412).json(result)
    }
    else {
      models.Size.destroy({
        where: {
          id: req.body.id
        }
      })
      .then(sizes=>{
        result.success = true
        result.sizeDeleted = sizes
        res.json(result)
      })
      .catch(err=>{
        if (err.name == "SequelizeForeignKeyConstraintError") {
          result.error = err.name
          result.message = "Size with id " + req.body.id + " is being used. Can't perform delete."
        }
        res.status(500).json(result)
      })
    }
  },

  // detail warna
  detail: function(req, res){
    var result = {
      success: false,
    }
    if (isNaN(req.params.sizeId)) {
      result.message = "Size ID must be a number"
      res.status(412).json(result)
    }
    else {
      models.Size.findById(req.params.sizeId)
      .then(size=>{
        result.success = true
        result.color = size
        res.json(result)
      })
      .catch(err=>{
        // todo: add message
        result.error = err
        res.status(500).json(result)
      })
    }
  },

  // get size list
  list: function(req, res){
    var result = {
      success: false
    }
    models.Size.findAll({
      attributes: ["id", "name"]
    })
    .then(sizes=>{
      result.success = true
      result.sizes = sizes
      res.json(result)
    })
    .catch(err=>{
      result.message = ""
      result.errors = err
      res.status(500).json(result)
    })
  },

}
