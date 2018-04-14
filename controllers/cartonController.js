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
      warehouseId: req.body.warehouseId,
      profileId: req.body.profileId
    }).then(carton=>{
      result.success = true
      result.status = "OK"
      result.carton = carton
      res.json(result)
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
        include: [{model: models.Profile,
                  as: 'profile',
                  attributes: {
                    exclude: ["createdAt", "updatedAt"]
                  }
                },
                {model: models.Warehouse,
                as:'warehouse',
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                  }
                }
              ],
        attributes:{
          exclude:["profileId","warehouseId"]
        }
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
  },

  detail: function(req, res){
    var result = {
      success: false,
      carton: null
    }
    models.Carton.find({
      where: {
        barcode: req.params.barcode
      }
    })
    .then(carton=>{
      if (carton) {
        result.success = true
        result.carton = carton
        res.json(result)
      }
      else {
        result.message = 'carton not found'
        res.json(result)
      }
    })
    .catch(err=>{
      if (err.errors) {
        result.errors = err.errors
      }
      else {
        result.error = err
      }
      res.json(result)
    })
  },

  ping: function(req, res){
    var result = {
      success: false
    }
    models.Carton.find({
      where: {
        barcode: req.params.barcode
      }
    })
    .then(carton=>{
      result.success = true
      if (carton) {
        result.exist = true
      }
      else {
        result.exist = false
      }
      res.json(result)
    })
    .catch(err=>{
      if(err.errors){
        result.errors = err.errors
      }
      else {
        result.errors = err
      }
      res.json(result)
    })
  }
}
