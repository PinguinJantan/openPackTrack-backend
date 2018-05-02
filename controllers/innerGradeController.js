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
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to create new innerGrade : ', err)
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },
  all : function (req,res) {
    var result= {
      success: false,
      status: "ERROR",
      innerGrade: null
    }
    models.InnerGrade.findAll()
    .then(innerGrade=>{
      result.success = true
      result.status = "OK"
      result.innerGrade= innerGrade
      res.json(result)
    }).catch(err=>{
      console.log("Error when trying to show all innerGrade: ", err);
    })
  },
  detail: function(req,res){
    let result={
      success: false
    }
    if(req.params.id){
      models.InnerGrade.findById(req.params.id)
      .then(innerGrade=>{
        if(innerGrade.length==0){
          result.message= 'innerGrade not found'
        }
        result.innerGrade=innerGrade
        res.json(result)
      }).catch(err=>{
        result.errors=err.message
        res.json(result)
      })
    }else{
      result.message='required parameters'
      res.status(422).json(result)
    }
  },
  update: function(req,res){
    let result={
      success: false
    }
    if(req.body.id&&req.body.name){
      models.InnerGrade.findById(req.body.id)
      .then(innerGrade=>{
          innerGrade.name=req.body.name
          innerGrade.save()
          .then(()=>{
            result.success=true
            result.message='Update innerGrade with id '+req.body.id+' success'
            result.innerGrade= innerGrade
            res.json(result)
          }).catch((err) => {
            console.log(err);
            result.message=err.message
            res.json(result)
          })
      })
    }else{
      result.message='required parameters'
      res.status(422).json(result)
    }
  },
  delete: function(req,res){
    let result={
      success: false
    }
    if(req.body.id){
      models.InnerGrade.findById(req.body.id,{attributes:['id']})
      .then(innerGrade=>{
        if(innerGrade){
          innerGrade.destroy()
          .then(()=>{
            result.success = true
            result.message = "innerGrade deleted"
            res.json(result)
          }).catch(err=>{
            result.message=err.message
            res.json(result)
          })
        }else{
          result.message='warehouse with id '+req.body.id+'not found'
          res.json(result)
        }
      })
    }else{
      result.message='required parameters'
      res.status(422).json(result)
    }
  }
}
