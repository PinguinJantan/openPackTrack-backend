let models = require('../models')

module.exports = {
  create: function(req,res,next){
    var result = {
      success : false
    }
    if(req.body.name){
      models.Category.create({
        name: req.body.name
      }).then(category =>{
        result.success = true
        result.category = category
        res.json(result)
      }).catch(err=>{
        console.log('Error when trying to create new item : ', err);
        if (err.errors) {
          result.errors = err.errors
        }
        res.status(500).json(result)
      })
    }else{
       result.message = "invalid parameter"
       res.status(412).json(result)
    }
  },

  all: function(req,res,next){
    var result = {
      success : false
    }
    models.Category.findAll()
    .then(categories=>{
      result.success = true
      result.categories = categories
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to show all categories : ', err);
      if (err.errors) {
        result.message = err.errors
      }
      res.status(500).json(result)
    })
  },

  detail: function(req, res){
    var result = {
      success: false
    }
    if (parseInt(req.params.categoryId) == req.params.categoryId){
      models.Category.findById(req.params.categoryId)
      .then(category=>{
        result.success = true
        if (!category) {
          result.message = "Category not found"
        }
        result.category = category
        res.json(result)
      })
      .catch(err=>{
        result.errors = err
        res.status(500).json(result)
      })
    }
    else {
      result.message = "invalid Category ID"
      res.status(412).json(result)
    }
  },

  update: function(req, res){
    var result = {
      success: false
    }
    if (parseInt(req.body.id) == req.body.id && req.body.name){
      models.Category.findById(req.body.id)
      .then(category=>{
        if (category) {
          category.name = req.body.name
          category.save().then(()=>{
            result.success = true
            result.category = category
            res.json(result)
          })
          .catch(err=>{
            if (err.errors) {
              result.errors = err.errors
            }
            else {
              result.errors = err
            }
            res.status(500).json(result)
          })
        }
        else {
          result.message = "no Category with id " + req.body.id
          result.itemId = parseInt(req.body.id)
          res.status(412).json(result)
        }
      })
      .catch(err=>{
        if (err.errors) {
          result.errors = err.errors
        }
        else {
          result.errors = err
        }
        res.status(500).json(result)
      })
    }
    else {
      result.message = "invalid parameter"
      res.status(412).json(result)
    }
  },

  delete: function(req, res){
    var result = {
      success: false
    }
    if (parseInt(req.body.id) == req.body.id){
      models.Category.findById(req.body.id, {
        attributes: ["id"]
      })
      .then(category=>{
        if (category) {
          category.destroy()
          .then(()=>{
            result.success = true
            result.message = "Category deleted"
            res.json(result)
          })
          .catch(err=>{
            if (err.name == "SequelizeForeignKeyConstraintError") {
              result.message = "Foreign Key constraint error"
              res.status(500).json(result)
            }
            else {
              result.errors = err
              res.status(500).json(result)
            }
          })
        }
        else {
          result.message = "Category not found"
          res.status(422).json(result)
        }
      })
      .catch(err=>{
        result.errors = err
        res.json(result)
      })
    }
    else {
      result.message = "invalid Category ID"
      res.status(412).json(result)
    }
  }
}
