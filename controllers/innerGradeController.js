let models = require('../models')

module.exports = {
  create: function(req,res){
    var result= {
      success: false,
      status: "ERROR",
      innerGrade: null
    }
    models.InnerGrade.create({
      name: req.body.name
    }).then(innerGrade=>{
      result.success = true
      result.status = "OK"
      result.innerGrade = innerGrade
      res.json(innerGrade)
    }).catch(err=>{
      console.log('Error when trying to create new innerGrade : ', err)
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  }
}
