let models = require('../models')

module.exports = {
  create: function(req,res){
    var result={
      success: false,
      status: "ERROR",
      innerDeliveryOrder: null
    }
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
      console.log("Error when trying create new innerDeliveryOrder: ",err);
      res.json(result)
    })
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
      console.log("Error when trying create new innerDeliveryOrder: ",err);
      res.json(result)
    })
  }
}
