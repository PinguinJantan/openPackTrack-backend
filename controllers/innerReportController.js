let models = require('../models')
let Sequelize = require('sequelize')
module.exports = {
  bulkCreateOpname: function(req,res){
    var result= {
      success: false,
      status: 'ERROR',
      msg : 'SOMETHING WENT WRONG!!'
    }
     models.Carton.findOne({
        where: {
          barcode: req.body.barcode
        },
        include: [{
          model: models.Inner,
          attributes: ['id']
        }]
      })
      .then(carton=>{
        return {
          id: carton.id,
          barcode: carton.barcode,
          warehouseId: carton.warehouseId,
          reportId: req.body.reportId,
          Inners: carton.Inners
        }
      })
    .then(carton=>{
      if(carton != null){
        const Op = Sequelize.Op
        let arrayInnerids = carton.Inners.map(inner => inner.id)
        return models.InnerReport.findAll({
          where: {
            innerId: {
              [Op.any]: arrayInnerids,
            },
            reportId: carton.reportId
          }
        })
        .then(innerIds=>{
          if(innerIds.length ==0){
            return carton.Inners.map(inner => {
              return {
                innerId: inner.id,
                reportId: carton.reportId
              }
            })
          }else{
            result.msg= 'inner duplicate'
            return res.json(result)
          }
        })
      }else{
        result.msg= 'carton null'
        return res.json(result)
      }
    })
    .then(inputInnerReportids=>{
      return models.InnerReport.bulkCreate(inputInnerReportids)
    })
    .then(()=>{
      result.success = true
      result.status = "OK"
      result.msg = "opname success"
      res.json(result)
    }).catch(err => {
      console.log(err)
      res.json(result)
    })
  }
}
