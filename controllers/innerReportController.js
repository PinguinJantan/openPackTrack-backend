let models = require('../models')
let Sequelize = require('sequelize')
let paginate = require('express-paginate')

module.exports = {
  create: function(req,res){
    let result={
      success: false,
      message: ''
    }
    models.InnerReport.findOne({
      where: {
        innerId: req.body.innerId,
        reportId: req.body.reportId
      }
    })
    .then(innerReport=>{
      if(innerReport.length != 0){
        return innerReport
      }else{
        result.message= 'duplicate inner'
        return res.json(result)
      }
    })
    .then(innerReport=>{
     return models.InnerReport.create({
        innerId: req.body.innerId,
        reportId: req.body.reportId
      })
    })
    .then(innerReport=>{
      result.success= true
      result.status= 'OK'
      result.message='create report success'
      result.innerReport= innerReport
      res.status(200).json(result)
    })
    .catch(err=>{
      result.message=err.message
      res.status(400).json(result)
      console.log(err)
    })
  },
  all: function(req,res){
    let result={
      success: false,
      message: '',
      pagination: null
    }

    models.InnerReport.findAll({
      attributes: ['id','innerId','reportId'],
      include:[
        {model: models.Report, as :'report' }
      ],
      limit: req.query.limit,
      offset: req.skip
    })
    .then(innerReport=>{
      models.InnerReport.count()
      .then(innerReportCount=>{
        pageCount = Math.ceil(innerReportCount/req.query.limit)
        result.success= true
        result.status='OK'
        result.pagination={
          innerReportTotal: innerReportCount,
          pageCount : pageCount,
          currentPage: req.query.page,
          hasNextPage: paginate.hasNextPages(req)(pageCount),
          hasPrevPage: res.locals.paginate.hasPreviousPages
        }
        result.message='Request success'
        result.innerReport=innerReport
        res.json(result)
      })
    })
    .catch(err=>{
      res.status(400).json(result)
      console.log(err)
    })
  },

  bulkCreateOpname: function(req,res){
    var result= {
      success: false,
      message : 'SOMETHING WENT WRONG!!'
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
        if(carton==null){
          result.message= 'carton not found'
          res.json(result)
        }else{
          return {
            id: carton.id,
            barcode: carton.barcode,
            warehouseId: carton.warehouseId,
            reportId: req.body.reportId,
            Inners: carton.Inners
          }
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
            result.message= 'duplicate inner '
            return res.json(result)
          }
        })
      }else{
        result.message= 'carton null'
        return res.json(result)
      }
    })
    .then(inputInnerReportids=>{
      return models.InnerReport.bulkCreate(inputInnerReportids)
    })
    .then(()=>{
      result.success = true
      result.status = "OK"
      result.message = "opname success"
      res.json(result)
    }).catch(err => {
      result.message=err.message
      res.status(400).json(result)
      console.log(err)
    })
  }
}
