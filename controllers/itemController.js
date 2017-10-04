let models = require('../models')

module.exports = {
  create: function(req,res,next){
    var result = {
      success: false,
      status: "ERROR",
      item: null
    }
    models.Items.create({
      sku: req.body.sku,
      barcode: req.body.barcode,
      categoryId: req.body.categoryId,
      name: req.body.name,
      color: req.body.color,
      size: req.body.size,
      genre: req.body.genre
    }).then(items=>{
      result.success = true
      result.status = "OK"
      result.item = items
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
      items: null
    }
    models.Items.findAll()
    .then(items=>{
      result.success = true
      result.status = "OK"
      result.items = items
      res.json(items)
    }).catch(err=>{
      console.log('Error when trying to create new item : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  }

}
