let models = require('../models')

module.exports = {

  create: function(req,res){
    var result = {
      success: false,
      status: "ERROR",
      output: null
    }
    if (req.body.deliveryOrderId && req.body.innerId){
      models.Output.create({
      deliveryOrderId: req.body.deliveryOrderId,
      innerId: req.body.innerId
      }).then(output=>{
      result.success= true
      result.status= "OK"
      result.output= output
      res.json(result)
    }).catch(err=>{
      console.log("Error when trying create new output: ",err);
      result.message=err.message
      res.status(500).json(result)
    })
    }else {
      result.message = "Invalid Parameter"
      res.status(412).json(result)
    }
  },
  all: function(req,res){
    var result={
      success: false,
      status: "ERROR",
      output: null
    }
    models.Output.findAll({
      include: [{model: models.Inner},
                {model: models.DeliveryOrder}]
    })
    .then(output=>{
      result.success= true
      result.status= "OK"
      result.output= output
      res.json(result)
    }).catch(err=>{
      console.log("Error when trying show all output: ",err);
      result.message = err.message
      res.status(500).json(result)
    })
  }

}
