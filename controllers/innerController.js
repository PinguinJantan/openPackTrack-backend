let models = require('../models')
let sequelize = require('sequelize')
const paginate = require('express-paginate');

module.exports = {
  create: function(req,res){
    var result= {
      success: false,
      status: "ERROR",
      inner: null,
    }
    let isInStok = parseInt(req.body.isInStok)

    models.Inner.create({
      barcode: req.body.barcode,
      itemId: req.body.itemId,
      cartonId: req.body.cartonId,
      isInStok: isInStok,
      gradeId: req.body.gradeId,
      sourceId: req.body.sourceId
    }).then(inner=>{
      result.success = true
      result.status = "OK"
      result.inner = inner
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to create new inner : ', err)
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },

  all: function (req,res) {
    var result = {
      success: false,
      pagination: null,
      inners: null
    }
    var allowedSort = ['updatedAt', 'item', 'carton', 'stock', 'grade', 'source']
    var order = []
    var allowedDirection = ['ASC', 'DESC']
    if (req.query.sortDirection) {
      req.query.sortDirection = req.query.sortDirection.toUpperCase()
    }
    if (allowedDirection.indexOf(req.query.sortDirection) == -1) {
      req.query.sortDirection = 'ASC'
    }
    if (allowedSort.indexOf(req.query.sortBy) == -1) {
      req.query.sortBy = 'updatedAt'
      order = [['updatedAt', req.query.sortDirection]]
    }
    else if (req.query.sortBy == 'item'){
      order = [[{model: models.Item}, 'code', req.query.sortDirection]]
    }
    else if (req.query.sortBy == 'carton') {
      order = [[{model: models.Carton}, 'barcode', req.query.sortDirection]]
    }
    else if (req.query.sortBy == 'stock') {
      order = [['isInStok', req.query.sortDirection]]
    }
    else if (req.query.sortBy == 'grade') {
      order = [[{model: models.InnerGrade}, 'name', req.query.sortDirection]]
    }
    else {
      order = [[{model: models.InnerSource}, 'name', req.query.sortDirection]]
    }
    if (req.query.search == null) {
      req.query.search = ''
    }
    var text = req.query.search
    models.Inner.findAndCountAll({
      logging: console.log,
      attributes: ['barcode', 'isInStok', 'createdAt', 'updatedAt'],
      include: [
        {
          model: models.Carton,
          include: [
            {
              model: models.Warehouse,
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              }
            }
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: models.Item,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: models.InnerGrade,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        {
          model: models.InnerSource,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      ],
      where: {
        $or: [
          sequelize.where(sequelize.col('Inner.barcode'), { $ilike: `%${text}%`}),
          sequelize.where(sequelize.col('Carton.barcode'), { $ilike: `%${text}%`}),
          sequelize.where(sequelize.col('Carton->Warehouse.name'), { $ilike: `%${text}%`}),
          sequelize.where(sequelize.col('Item.code'), { $ilike: `%${text}%`}),
        ]
      },
      limit: req.query.limit,
      offset: req.skip,
      order: order
    })
    .then(inners=>{
      pageCount = Math.ceil(inners.count / req.query.limit)
      result.success= true
      result.inners= inners.rows
      result.pagination = {
        innerTotal: inners.count,
        pageCount: pageCount,
        currentPage: req.query.page,
        hasNextPage: paginate.hasNextPages(req)(pageCount),
        hasPrevPage: res.locals.paginate.hasPreviousPages
      }
      res.json(result)
    }).catch(err=>{
      console.log("Error when trying show all inner: ", err);
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
