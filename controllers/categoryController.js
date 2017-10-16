let models = require('../models')

module.exports = {
  create: function(req,res,next){
    var result = {
      success : false,
      status : "ERROR",
      category : null,
      message: ""
    }
    models.Category.create({
      name: req.body.name
    }).then(category =>{
      result.success = true
      result.status = "OK"
      result.message = "Create success"
      result.category = category
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to create new item : ', err);
      if (err.errors) {
        result.massage = err.errors
      }
      res.json(result)
    })
  },
  all : function(req,res,next){
    var result = {
      success : false,
      status : "ERROR",
      category : null,
      message: ""
    }
    models.Category.findAll()
    .then(category=>{
      result.success = true
      result.status = "OK"
      result.category = category
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to show all category : ', err);
      if (err.errors) {
        result.message = err.errors
      }
      res.json(result)
    })
  }
}
