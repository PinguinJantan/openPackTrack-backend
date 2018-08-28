let models = require('../models')

module.exports = {
  create: function(req,res){
    let result= {
      success: false,
      status: "ERROR",
      innerSource: null
    }
    if(req.body.name){
      models.InnerSource.create({
        name: req.body.name
      }).then(innerSource=>{
        result.success = true
        result.status = "OK"
        result.innerSource = innerSource
        res.json(result)
      }).catch(err=>{
        console.log('Error when trying to create new innerSource : ', err)
        if (err.errors) {
          result.errors = err.errors
        }
        res.status(500).json(result)
      })
    }else {
      result.message = "Invalid Parameter"
      res.status(412).json(result)
    }
  },
  all: function (req,res) {
    var result= {
      success: false,
      status: "ERROR",
      innerSource: null
    }
    models.InnerSource.findAll()
    .then(innerSource=>{
      result.success= true
      result.status= "OK"
      result.innerSource = innerSource
      res.json(result)
    }).catch(err=>{
      console.log("Error when trying show all innerGrade : ",err);
      if(err.errors){
        result.error = err.error
      }
      res.status(500).json(result)
    })
  }
}
