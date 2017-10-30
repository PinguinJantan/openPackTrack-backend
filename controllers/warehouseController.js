let models = require('../models')

module.exports = {
  create: function(req,res){
    var result= {
      success: false,
      status: "ERROR",
      warehouse: null
    }
    models.Warehouse.create({
      name: req.body.name,
      address: req.body.address
    }).then(warehouse=>{
      result.success = true
      result.status = "OK"
      result.warehouse = warehouse
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to create new warehouse : ', err)
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },
  all: function (req,res) {
    var result={
      success: false,
      status: "ERROR",
      warehouse: null
    }
    models.Warehouse.findAll({
      include: [{model: models.Carton}]
    }).then(warehouse=>{
      result.success = true
      result.status = "OK"
      result.warehouse = warehouse
      res.json(warehouse)
    }).catch(err=>{
      console.log("Error when trying list all warehouse: ",err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  

  }
}
