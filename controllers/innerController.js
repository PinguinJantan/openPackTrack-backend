let models = require('../models')

module.exports = {
  create: function(req,res){
    var result= {
      success: false,
      status: "ERROR",
      inner: null,
    }
    let isInStok = parseInt(req.body.isInStok)

    models.Inner.create({
      barcode: req.body.barcode,
      itemId: req.body.itemId,
      cartonId: req.body.cartonId,
      isInStok: isInStok,
      gradeId: req.body.gradeId,
      sourceId: req.body.sourceId
    }).then(inner=>{
      result.success = true
      result.status = "OK"
      result.inner = inner
      res.json(result)
    }).catch(err=>{
      if (err.errors) {
        result.errors = err.errors
      }
      result.message=err.message
      res.json(result)
      console.log('Error when trying to create new inner : ', err)
    })
  },
  all: function (req,res) {
    var result={
      success: false,
      status: "ERROR",
      inner: null
    }
    models.Inner.findAll({
      include: [{model: models.Carton,
                 include: [{model: models.Warehouse}]},
                 {model: models.Item,
                 include:[{model: models.Category}]},
                 {model: models.InnerGrade},
                 {model: models.InnerSource},
                 {model: models.Output}
               ]
    })
    .then(inner=>{
      result.success= true
      result.status= "OK"
      result.inner= inner
      res.json(result)
    }).catch(err=>{
      if(err.errors){
        result.errors = err.errors
      }
      result.message=err.message
      res.json(result)
      console.log(err);
    })
  }
}
