let models = require('../models')

module.exports = {
  create: function(req,res){
    var result={
      success: false,
      status: "ERROR",
      innerDeliveryOrder: null
    }
    if (req.body.quantity && req.body.innerId && req.body.deliveryOrderId){
      models.InnerDeliveryOrder.create({
        quantity: req.body.quantity,
        innerId: req.body.innerId,
        deliveryOrderId: req.body.deliveryOrderId
      }).then(innerDeliveryOrder=>{
        result.success= true
        result.status= "OK"
        result.innerDeliveryOrder= innerDeliveryOrder
        res.json(result)
      }).catch(err=>{
        result.message=err.message
        res.status(500).json(result)
        console.log("Error when trying create new innerDeliveryOrder: ",err);
      })
    } else {
      result.message = "Invalid Parameter"
      res.status(412).json(result)
    }
  },
  all: function(req,res){
    var result={
      success: false,
      status: "ERROR",
      innerDeliveryOrder: null
    }
    models.InnerDeliveryOrder.findAll({
      include:[{model: models.Inner},
               {model: models.DeliveryOrder}]
    })
    .then(innerDeliveryOrder=>{
      result.success= true
      result.status= "OK"
      result.innerDeliveryOrder= innerDeliveryOrder
      res.json(result)
    }).catch(err=>{
      result.message=err.message
      res.status(500).json(result)
      console.log("Error when trying create new innerDeliveryOrder: ",err);
    })
  }
}
