let models = require('../models')

module.exports = {
  create: function(req,res){
    var result= {
      success: false,
      status: "ERROR",
      carton: null
    }
    models.Carton.create({
      barcode: req.body.barcode,
      warehouseId: req.body.warehouseId
    }).then(carton=>{
      result.success = true
      result.status = "OK"
      result.carton = carton
      res.json(carton)
    }).catch(err=>{
      console.log('Error when trying to create new carton : ', err)
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },
  all: function (req, res) {
    var result= {
      success: false,
      status: "ERROR",
      carton: null
    }
    models.Carton.findAll({
        include: [{model: models.Warehouse} ]
        }
    )
    .then(carton=>{
      result.success= true
      result.status= "OK"
      result.carton= carton
      res.json(result)
    })
    .catch(err=>{
      console.log('Error when trying to show all carton : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  }
}
