let models = require('../models')

module.exports = {
  create: function(req,res){
    var result = {
      success : false
    }
    if(req.body.count&&req.body.cartonId&&req.body.type){
      models.Profile.create({
        count: req.body.count,
        cartonId: req.body.cartonId,
        type: req.body.type
      }).then(profile=>{
        result.success= true
        result.message='Create Success'
        result.profile=profile
        res.json(result)
      }).catch(err=>{
        console.log(err);
        if(err.errors){
          result.message=err.message
        }
        res.json(result)
      })
    } else {
      result.message = "Invalid Parameter"
      res.status(412).json(result)
    }
  },

  all: function(req,res,next){
    var result = {
      success : false
    }
    models.Profile.findAll()
    .then(profile=>{
      result.success = true
      result.profile = profile
      res.json(result)
    }).catch(err=>{
      console.log(err);
      if (err.errors) {
        result.message = err.errors
      }
      res.status(500).json(result)
    })
  },
  detail: function(req,res){
    let result={
      success: false
    }
    if(parseInt(req.query.profileId)==req.query.profileId){
      models.Profile.findById(req.query.profileId)
      .then(profile=>{
        if(!profile){
          result.message= 'Profile not found'
        }
        result.profile= profile
        res.json(result)
      })
      .catch(err=>{
        result.errors=err.message
        res.json(result)
      })
    }else{
      result.message='invalid Profile ID'
      res.status(412).json(result)
    }
  },
  update: function(req,res){
    let result={
      success: false
    }
    if(parseInt(req.body.id)== req.body.id){
      models.Profile.findById(req.body.id)
      .then(profile=>{
        if(profile){
          if(req.body.name){
            profile.name=req.body.name
          }
          if(req.body.count){
            profile.count=req.body.count
          }
          if(req.body.cartonId){
            profile.cartonId=req.body.cartonId
          }
          if(req.body.type){
            profile.type=req.body.type
          }
          profile.save().then(()=>{
            result.success = true
            result.message='Update Success'
            result.profile = profile
            res.json(result)
          })
          .catch(err=>{
            console.log(err);
            result.message=err.message
            res.status(500).json(result)
          })
        }else{
          result.message='no profile with id '+ req.body.id
          res.status(412).json(result)
        }
      })
      .catch(err=>{
        console.log(err);
        result.message=err.message
        res.status(500).json(result)
      })
    }else{
      result.message='invalid Profile ID'
      res.status(412).json(result)
    }
  },
  delete: function(req,res){
    let result={
      success: false
    }
    if(parseInt(req.body.id)==req.body.id){
      models.Profile.findById(req.body.id,{
        attributes:['id']
      })
      .then(profile=>{
        if(profile){
          profile.destroy()
          .then(()=>{
            result.success = true
            result.message = "Profile deleted"
            res.json(result)
          }).catch(err=>{
            result.message=err.message
            res.status(500).json(result)
          })
        }else{
          result.message = 'Profile with ID '+req.body.id+' not found'
          res.status(412).json(result)
        }
      })
    }else{
      result.message = "invalid Profile ID"
      res.status(412).json(result)
    }
  }

}
