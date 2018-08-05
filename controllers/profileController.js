let models = require('../models')

module.exports = {
  //TODO: sesuaikan dengan model baru
  create: async function(req,res,next){
    var result = {
      success : false
    }
    var t
    try {
      var items = JSON.parse(req.body.items)
      console.log(items);
      t = await models.sequelize.transaction()
      var profile = await models.Profile.create({
        name: req.body.name,
        type: req.body.type,
        mixAmount: req.body.mixAmount
      }, {transaction: t})
      items = items.map((item) => {
        return {
          ...item,
          profileId: profile.id
        }
      })
      console.log(items);
      await models.ProfileItem.bulkCreate(items, {
        transaction: t
      })
      await t.commit()
      res.json(profile)
    }
    catch(err) {
      res.status(500).json(err.message)
      return
    }
    // models.Profile.create({
    //   name: req.body.name,
    //   type: req.body.type,
    //   mixAmount: req.body.mixAmount,
    // }).then(profile=>{
    //   result.success= true
    //   result.message='Create Success'
    //   result.profile=profile
    //   res.json(result)
    // }).catch(err=>{
    //   console.log(err);
    //   if(err.errors){
    //     result.message=err.message
    //   }
    //   res.json(result)
    // })
  },

  all: function(req,res,next){
    var result = {
      success : false
    }
    models.Profile.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
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
      result.message = err.message
      if (err.errors) {
        result.error = err.errors
      }
      res.json(result)
    })
  },
  detail: function(req,res){
    let result={
      success: false
    }
    if(parseInt(req.params.id)==req.params.id){
      models.Profile.findById(req.params.id, {
        include: [{
          model: models.ProfileItem,
          as: 'profileItem',
          attributes: { exclude: ['profileId', 'createdAt', 'updatedAt'] },
          include: [{
            model: models.Item,
            as: 'item',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
              model: models.Sku,
              as: 'sku',
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }, {
              model: models.Size,
              as: 'size',
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
          }]
        }]
      })
      .then(profile=>{
        result.success = true
        result.profile = profile
        res.json(result)
      })
      .catch(err=>{
        result.message = err.message
        res.json(result)
      })
    }else{
      result.message = 'invalid Profile ID'
      res.status(412).json(result)
    }
  },
  update: function(req,res){
    let result={
      success: false
    }
    // if(parseInt(req.body.id)== req.body.id){
    //   models.Profile.findById(req.body.id)
    //   .then(profile=>{
    //     if(profile){
    //       if(req.body.name){
    //         profile.name=req.body.name
    //       }
    //       if(req.body.mixAmount){
    //         profile.mixAmount=req.body.mixAmount
    //       }
    //       if(req.body.type){
    //         profile.type=req.body.type
    //       }
    //       profile.save().then(()=>{
    //         result.success = true
    //         result.message='Update Success'
    //         result.profile = profile
    //         res.json(result)
    //       })
    //       .catch(err=>{
    //         console.log(err);
    //         result.message=err.message
    //         res.json(result)
    //       })
    //     }else{
    //       result.message='no profile with id '+ req.body.id
    //       res.json(result)
    //     }
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //     result.message=err.message
    //     res.json(result)
    //   })
    // }else{
    //   result.message='invalid Profile ID'
    //   res.status(412).json(result)
    // }
    result.message = 'not implemeted'
    res.status(404).json(result)
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
