const paginate = require('express-paginate');

let models = require('../models')

module.exports = {
  create: function(req, res, next){
    var result = {
      success : false,
    }
    if (!req.body.name) {
      result.message = "Please don't give blank name"
      res.status(412).json(result)
    }
    else {
      models.Color.create({
        name: req.body.name
      }).then(color =>{
        result.success = true
        result.color = color
        res.json(result)
      }).catch(err=>{
        console.log('Error when trying to create new color: ', err);
        if (err.errors) {
          result.message = "Operation failed with error(s)"
          result.errors = err.errors
        }
        res.status(500).json(result)
      })
    }
  },

  // semua warna
  all: function(req,res,next){
    var result = {
      success: false,
      pagination: null,
      colors: null
    }
    models.Color.findAll({
      limit: req.query.limit,
      offset: req.skip,
      }
    )
    .then(colors=>{
      models.Color.count()
      .then(colorCount=>{
        pageCount = Math.ceil(colorCount / req.query.limit)
        result.success = true
        result.pagination = {
          total: colorCount,
          pageCount: pageCount,
          currentPage: req.query.page,
          hasNextPage: paginate.hasNextPages(req)(pageCount),
          hasPrevPage: res.locals.paginate.hasPreviousPages
        }
        result.colors = colors
        res.json(result)
      })
    }).catch(err=>{
      console.log('Error when trying to show all colors : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.status(500).json(result)
    })
  },

  list: function(req, res) {
    var result = {
      success: false
    }
    models.Color.findAll({
      attributes: ['id', 'name']
    })
    .then(colors => {
      result.success = true
      result.colors = colors
      res.json(result)
    })
    .catch(err => {
      if (err.errors) {
        result.error = err.errors
        res.status(500).json(result)
      }
    })
  },

  // detail warna
  detail: function(req, res){
    var result = {
      success: false,
    }
    if (isNaN(req.params.colorId)) {
      result.message = "Color ID must be a number"
      res.status(412).json(result)
    }
    else {
      models.Color.findById(req.params.colorId)
      .then(color=>{
        result.success = true
        result.color = color
        res.json(result)
      })
      .catch(err=>{
        result.error = err
        res.status(500).json(result)
      })
    }
  },

  // update warna
  update: function(req, res){
    var result = {
      success: false
    }
    if (!req.body.name) {
      result.message = "Please don't give blank name"
      res.status(412).json(result)
    }
    else if (isNaN(req.body.id)) {
      result.message = "Color ID must be a number"
      res.status(412).json(result)
    }
    else {
      var changes = {
        name: req.body.name
      }
      models.Color.update(changes, {
        where: {
          id: req.body.id
        }
      })
      .then(color=>{
        if (color[0] == 0) { // if id not found, result will be: [0]
          result.message = "No color with ID " + req.body.id
          res.status(422).json(result)
        }
        else {
          result.success = true
          result.color = {
            id: req.body.id,
            name: req.body.name
          }
          res.json(result)
        }
      })
      .catch(err=>{
        result.error = err
        res.status(500).json(result)
      })
    }
  },

  // Hapus warna
  delete: function(req, res){
    var result = {
      success: false
    }
    if (!req.body.id) {
      result.message = "Please specify the color ID to be deleted"
      res.status(412).json(result)
    }
    else if (isNaN(req.body.id)) {
      result.message = "Color ID must be a number"
      res.status(412).json(result)
    }
    else {
      models.Color.destroy({
        where: {
          id: req.body.id
        }
      })
      .then(colors=>{
        result.success = true
        result.colorDeleted = colors
        res.json(result)
      })
      .catch(err=>{
        if (err.name == "SequelizeForeignKeyConstraintError") {
          result.error = err.name
          result.message = "Color with id " + req.body.id + " is being used. Can't perform delete."
        }else{
          result.message=err.message
        }
        res.status(500).json(result)
      })
    }
  }
}
