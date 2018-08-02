let models = require('../models')

module.exports = {
  //TODO: sesuaikan dengan model baru
  create: function(req,res,next){
    var result = {
      success : false
    }
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
  },

  all: function(req,res,next){
    var result = {
      success : false
    }
    models.Profile.findAll({
      include: [{
        model: models.ProfileItem,
        as: 'profileItem',
        attributes: ['itemId', 'amount'],
        include: [{
          model: models.Item,
          as: 'item',
          attributes: ['skuId', 'sizeId'],
          include: [{
            model: models.Sku,
            as: 'sku',
            attributes: ['name']
          },{
            model: models.Size,
            as: 'size',
            attributes: ['name']
          }]
        }]
      }]
    })
    .then(profile=>{
      result.success = true
      result.profiles = profile
      res.json(result)
    }).catch(err=>{
      console.log(err);
      if (err.errors) {
        result.message = err.errors
      }
      res.json(result)
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
            res.json(result)
          })
        }else{
          result.message='no profile with id '+ req.body.id
          res.json(result)
        }
      })
      .catch(err=>{
        console.log(err);
        result.message=err.message
        res.json(result)
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
            res.json(result)
          })
        }else{
          result.message = 'Profile with ID '+req.body.id+' not found'
          res.json(result)
        }
      })
    }else{
      result.message = "invalid Profile ID"
      res.status(412).json(result)
    }
  }

}
