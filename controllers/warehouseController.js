let models = require('../models')

module.exports = {
  create: function(req,res){
    var result= {
      success: false,
      warehouse: null
    }
    models.Warehouse.create({
      name: req.body.name,
      address: req.body.address
    }).then(warehouse=>{
      result.success = true
      result.message='Create Success'
      result.warehouse = warehouse
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to create new warehouse : ', err)
      if (err.errors) {
        result.errors = err.errors
      }
      res.status(201).json(result)
    })
  },
  all: function (req,res) {
    var result={
      success: false,
      warehouse: null
    }
    models.Warehouse.findAll()
    .then(warehouse=>{
      result.success = true
      result.warehouse = warehouse
      res.json(warehouse)
    }).catch(err=>{
      console.log("Error when trying list all warehouse: ",err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },
  detail: function(req,res){
    let result={
      success: false
    }
    if(req.params.id){
      models.Warehouse.findById(req.params.id)
      .then(warehouse=>{
        if(warehouse.length==0){
          result.message= 'Warehouse not found'
        }
        result.warehouse=warehouse
        res.json(result)
      }).catch(err=>{
        result.errors=err.message
        res.json(result)
      })
    }else{
      result.message='required parameters'
      res.status(422).json(result)
    }
  },
  update: function(req,res){
    let result={
      success: false
    }
    if(req.body.id){
      models.Warehouse.findById(req.body.id)
      .then(warehouse=>{
        if(req.body.name){
          warehouse.name=req.body.name
        }
        if(req.body.address){
          warehouse.address=req.body.address
        }
        warehouse.save()
        .then(()=>{
          result.success=true
          result.message='Update warehouse with id '+req.body.id+' success'
          result.warehouse= warehouse
          res.json(result)
        }).catch((err) => {
          console.log(err);
          result.message=err.message
          res.json(result)
        })
      })
    }else{
      result.message='required parameters'
      res.status(422).json(result)
    }
  },
  delete: function(req,res){
    let result={
      success: false
    }
    if(req.body.id){
      models.Warehouse.findById(req.body.id,{attributes:['id']})
      .then(warehouse=>{
        if(warehouse){
          warehouse.destroy()
          .then(()=>{
            result.success = true
            result.message = "warehouse deleted"
            res.json(result)
          }).catch(err=>{
            result.message=err.message
            res.json(result)
          })
        }else{
          result.message='required parameters'
          res.status(422).json(result)
        }
      })
    }
  }
}
