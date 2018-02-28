const paginate = require('express-paginate');
let models = require('../models')

module.exports = {
  create: function(req, res, next){
    var result = {
      success: false,
    }
    models.Sku.create({
      code: req.body.code,
      name: req.body.name,
      categoryId: req.body.categoryId,
      colorId: req.body.colorId,
      genderId: req.body.genderId
    }).then(sku=>{
      result.success = true
      result.sku = sku
      res.json(result)
    }).catch(err => {
      console.log('Error when trying to create new SKU : ', err);
      result.errors = []
      if (err.errors) {
        result.errors = err.errors
      }
      else if(err.parent) {
        if (err.parent.code) {
          result.errors.push({code: err.parent.code, message: 'NOT NULL violation'})
        }
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
  },

  // get sku list
  list: function(req, res){
    var result = {
      success: false
    }
    models.Sku.findAll({
      attributes: ["id", "name"]
    })
    .then(skus=>{
      result.success = true
      result.skus = skus
      res.json(result)
    })
    .catch(err=>{
      result.message = ""
      result.errors = err
      res.json(result)
    })
  },

  // edit
  update: function(req, res){
    var result = {
      success: false
    }

    // cek apakah parameter lengkap dan sesuai dengan tipedatanya
    // catatan: parseInt("5aaa") = 5
    if (parseInt(req.body.id) == req.body.id
        && req.body.code
        && req.body.categoryId
        && req.body.name
        && req.body.colorId
        && req.body.genderId) {
      models.Sku.findById(req.body.id)
      .then(sku=>{
        if (sku) {
          sku.code = req.body.code
          sku.categoryId = req.body.categoryId
          sku.name = req.body.name
          sku.colorId = req.body.colorId
          sku.genderId = req.body.genderId
          sku.save().then(()=>{
            result.success = true
            result.sku = sku
            res.json(result)
          })
          .catch(err=>{
            if (err.errors) {
              result.errors = err.errors
            }
            else {
              result.errors = err
            }
            res.json(result)
          })
        }
        else {
          result.message = "no sku with id " + req.body.id
          result.itemId = parseInt(req.body.id)
          res.json(result)
        }
      })
      .catch(err=>{
        if (err.errors) {
          result.errors = err.errors
        }
        else {
          result.errors = err
        }
        res.json(result)
      })
    }
    else {
      result.message = "invalid parameter"
      res.status(412).json(result)
    }
  },

  // detail
  detail: function(req, res){
    var result = {
      success: false
    }
    if (req.params.skuId == parseInt(req.params.skuId)) {
      models.Sku.findById(req.params.skuId, {
        attributes: ["id", "code", "name", "createdAt", "updatedAt"],
        include: [
          {model: models.Category, attributes: ["id", "name"], as: 'category'},
          {model: models.Color, attributes: ["id", "name"], as: 'color'},
          {model: models.Gender, attributes: ["id", "name"], as: 'gender'}
        ]
      })
      .then(sku=>{
        result.success = true
        if (!sku) {
          result.message = "SKU not found"
        }
        result.sku = sku
        res.json(result)
      })
      .catch(err=>{
        result.errors = err
        res.json(result)
      })
    }
    else {
      result.message = "invalid SKU ID"
      res.status(412).json(result)
    }
  },

  // delete
  delete: function(req, res){
    var result = {
      success: false
    }
    if (req.body.skuId == parseInt(req.body.skuId)) {
      models.Sku.findById(req.body.skuId, {
        attributes: ["id"]
      })
      .then(sku=>{
        if (sku) {
          sku.destroy()
          .then(()=>{
            result.success = true
            result.message = "SKU deleted"
            res.json(result)
          })
          .catch(err=>{
            if (err.name == "SequelizeForeignKeyConstraintError") {
              result.message = "Foreign Key constraint error"
              res.json(result)
            }
            else {
              result.errors = err
              res.json(result)
            }
          })
        }
        else {
          result.message = "SKU not found"
          res.json(result)
        }
      })
      .catch(err=>{
        result.errors = err
        res.json(result)
      })
    }
    else {
      result.message = "invalid SKU ID"
      res.status(412).json(result)
    }
  },
}
