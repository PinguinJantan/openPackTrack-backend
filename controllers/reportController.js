let models = require('../models')
let Sequelize = require('sequelize')
let paginate = require('express-paginate')

module.exports = {
  create: function(req,res){
    var result={
      success: false,
      status: 'ERROR',
      message: ''
    }
    models.Report.create()
    .then(report=>{
      result.success = true
      result.status = 'OK'
      result.message = 'Create Report Success'
      result.report= report
      res.json(result)
    }).catch(err=>{
      result.message= err.message
      res.status(400).json(result)
      console.log(err)
    })
  },
  all: function(req,res){
    let result={
      success: true,
      message: '',
      pagination: null
    }
    models.Report.findAll({
      include:[{model: models.InnerReport,
                attributes:{
                  exclude:['reportId']
                },
                as :'innerReport',
                include: [{model: models.Inner,
                          attributes:['barcode','createdAt','updatedAt'],
                          as: 'inner',
                          include:[
                            {model:models.Item,
                              attributes:['code'],
                              as: 'item'},
                            {model:models.Carton,
                              attributes:['barcode'],
                              as: 'carton'},
                            {model:models.InnerSource,
                              attributes:['name'],
                              as: 'innerSource'},
                            {model:models.InnerGrade,
                              attributes:['name'],
                              as: 'innerGrade'}]
                         }]
      }],
      limit: req.query.limit,
      offset: req.skip
    })
    .then(report=>{
      models.Report.count()
      .then(reportCount=>{
        pageCount= Math.ceil(reportCount/req.query.limit)
        result.success= true
        result.pagination={
          reportTotal: reportCount,
          pageCount: pageCount,
          currentPage: req.query.page,
          hasNextPage: paginate.hasNextPages(req)(pageCount),
          hasPrevPage: res.locals.paginate.hasPreviousPages
        }
        result.message='Request success'
        result.report=report
        res.json(result)
      })
      .catch(err=>{
        result.message=err.message
        res.status(400).json(result)
        console.log(err)
      })
    })
    .catch(err=>{
      result.message=err.message
      res.status(400).json(result)
      console.log(err)
    })
  }

}
