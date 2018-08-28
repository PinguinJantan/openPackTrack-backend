let models = require('../models')

module.exports={
  create: function(req,res){
    let result={
      success: false,
      status: "ERROR",
      retur: null,
    }
    if(req.body,returnNumber&&req.body.description){
      models.Retur.create({
        returnNumber: req.body.returnNumber,
        description: req.body.description,
        innerId: req.body.innerId
      }).then(retur=>{
        result.success= true
        result.status= "OK"
        result.retur= retur
        res.json(result)
      }).catch(err=>{
        console.log("Error when trying create new retur: ",err);
        res.json(result)
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
      retur: null
    }
    models.Retur.findAll({
      include: [{model: models.Inner}]
    })
    .then(retur=>{
      result.success = true
      result.status = "OK"
      result.retur = retur
      res.json(result)
    }).catch(err=>{
      console.log("Error when trying show all retur : ",err)
      res.status(500).json(result)
    })
  }
}
