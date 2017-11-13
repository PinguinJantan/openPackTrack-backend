let models = require('../models')

module.exports = {
  create: function(req,res,next){
    var result = {
      success: false,
      status: "ERROR",
      item: null
    }
    models.Item.create({
      sku: req.body.sku,
      categoryId: req.body.categoryId,
      name: req.body.name,
      color: req.body.color,
      size: req.body.size,
      gender: req.body.gender
    }).then(item=>{
      result.success = true
      result.status = "OK"
      result.item = item
      res.json(result)
    }).catch(err => {
      console.log('Error when trying to create new item : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })

  },
  all: function(req,res,next){
    var result = {
      success: false,
      status: "ERROR",
      item: null
    }
    models.Item.findAll({
      include: [{model: models.Category} ]
      }
    )
    .then(item=>{
      result.success = true
      result.status = "OK"
      result.item = item
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to show all item : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  }

}
