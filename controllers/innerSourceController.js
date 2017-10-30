let models = require('../models')

module.exports = {
  create: function(req,res){
    var result= {
      success: false,
      status: "ERROR",
      innerSource: null
    }
    models.InnerSource.create({
      name: req.body.name
    }).then(innerSource=>{
      result.success = true
      result.status = "OK"
      result.innerSource = innerSource
      res.json(innerSource)
    }).catch(err=>{
      console.log('Error when trying to create new innerSource : ', err)
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  }
}
