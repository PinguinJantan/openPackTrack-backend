let models = require('../models')

module.exports = {

  create: function (req,res) {
      var result = {
        success: false,
        status: "ERROR",
        deliveryOrder: null
      }
      models.DeliveryOrder.create({
        number: req.body.number
      }).then(deliveryOrder=>{
        result.success= true
        result.status= "OK"
        result.deliveryOrder = deliveryOrder
        res.json(result)
      }).catch(err=>{
        result.message=err.message
        res.json(result)
        console.log("Error when trying create new deliveryOrder: ",err);
      })
  },
    all: function (req,res) {
      var result={
        success: false,
        status: "ERROR",
        deliveryOrder: null
      }
      models.DeliveryOrder.findAll()
      .then(deliveryOrder=>{
        result.success= true
        result.status="OK"
        result.deliveryOrder= deliveryOrder
        res.json(result)
      }).catch(err=>{
        result.message= err.message
        res.json(result)
        console.log("Error when trying show all deliveryOrder: ",err);
      })
    }

}
