const paginate = require('express-paginate');
let models = require('../models')

module.exports = {
  create: function(req, res, next){
    var result = {
      success: false,
      status: "ERROR",
      sku: null
    }
    models.Sku.create({
      code: req.body.code,
      name: req.body.name,
      categoryId: req.body.categoryId,
      colorId: req.body.colorId,
      genderId: req.body.genderId
    }).then(sku=>{
      result.success = true
      result.status = "OK"
      result.sku = sku
      res.json(result)
    }).catch(err => {
      console.log('Error when trying to create new SKU : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },

  // paginated all
  paginatedAll: function(req, res, next){
    var result = {
      success: false,
      status: "ERROR",
      pagination: null,
      skus: null
    }
    models.Sku.findAll({
      attributes: ["id", "code", "name"],
      include: [
        {model: models.Category, attributes: ["id", "name"], as: 'category'},
        {model: models.Color, attributes: ["id", "name"], as: 'color'},
        {model: models.Gender, attributes: ["id", "name"], as: 'gender'}
      ],
      limit: req.query.limit,
      offset: req.skip,
      }
    )
    .then(skus=>{
      models.Sku.count()
      .then(skuCount=>{
        pageCount = Math.ceil(skuCount / req.query.limit)
        result.success = true
        result.status = "OK"
        result.pagination = {
          skuTotal: skuCount,
          pageCount: pageCount,
          currentPage: req.query.page,
          hasNextPage: paginate.hasNextPages(req)(pageCount),
          hasPrevPage: res.locals.paginate.hasPreviousPages
        }
        result.skus = skus
        res.json(result)
      })
    }).catch(err=>{
      console.log('Error when trying to show all SKUs : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  }
}
