const paginate = require('express-paginate')
let sequelize = require('sequelize')
let models = require('../models')
let customs = require('../modules/customs')

module.exports = {
  create: async function(req, res, next){
    var result = {
      success: false,
    }

    var category, color, gender = null
    try {
      category = await customs.findOrCreate(
        models.Category,
        {name: req.body.category},
        {name: req.body.category}
      )
      console.log(category)
      color = await customs.findOrCreate(
        models.Color,
        {name: req.body.color},
        {name: req.body.color}
      )
      console.log(color)
      gender = await customs.findOrCreate(
        models.Gender,
        {name: req.body.gender},
        {name: req.body.gender}
      )
      console.log(gender)
    }
    catch (err) {
      res.json(err)
      return
    }
    models.Sku.create({
      code: req.body.code,
      name: req.body.name,
      categoryId: category.id,
      colorId: color.id,
      genderId: gender.id
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
      res.status(500).json(result)
    })
  },

  // paginated all
  paginatedAll: function(req, res, next){
    var result = {
      success: false
    }
    var allowedSort = ['updatedAt', 'code', 'name']
    if (allowedSort.indexOf(req.query.sortBy) == -1) {
      req.query.sortBy = 'updatedAt'
    }
    var allowedDirection = ['ASC', 'DESC']
    if (req.query.sortDirection) {
      req.query.sortDirection = req.query.sortDirection.toUpperCase()
    }
    if (allowedDirection.indexOf(req.query.sortDirection) == -1) {
      req.query.sortDirection = 'ASC'
    }
    if (req.query.search == null) {
      req.query.search = ''
    }
    var text = req.query.search
    models.Sku.findAndCountAll({
      attributes: ["id", "code", "name"],
      include: [
        {model: models.Category, attributes: ["id", "name"], as: 'category'},
        {model: models.Color, attributes: ["id", "name"], as: 'color'},
        {model: models.Gender, attributes: ["id", "name"], as: 'gender'}
      ],
      where: {
        $or: [
          sequelize.where(sequelize.col('Sku.code'), { $ilike: `%${text}%`}),
          sequelize.where(sequelize.col('Sku.name'), { $ilike: `%${text}%`})
        ]
      },
      limit: req.query.limit,
      offset: req.skip,
      order: [[req.query.sortBy, req.query.sortDirection]]
      }
    )
    .then(skus=>{
      result.success = true
      pageCount = Math.ceil(skus.count / req.query.limit)
      result.success = true
      result.pagination = {
        total: skus.count,
        pageCount: pageCount,
        currentPage: req.query.page,
        hasNextPage: paginate.hasNextPages(req)(pageCount),
        hasPrevPage: res.locals.paginate.hasPreviousPages
      }
      result.skus = skus.rows
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to show all SKUs : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.status(500).json(result)
    })
  },

  // get sku list
  list: function(req, res){
    var result = {
      success: false
    }
    models.Sku.findAll({
      attributes: ["id", "name", "code"]
    })
    .then(skus=>{
      result.success = true
      result.skus = skus
      res.json(result)
    })
    .catch(err=>{
      result.message = ""
      result.errors = err
      res.status(500).json(result)
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
        res.status(500).json(result)
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
        res.status(500).json(result)
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
              res.status(500).json(result)
            }
          })
        }
        else {
          result.message = "SKU not found"
          res.status(422).json(result)
        }
      })
      .catch(err=>{
        result.errors = err
        res.status(500).json(result)
      })
    }
    else {
      result.message = "invalid SKU ID"
      res.status(412).json(result)
    }
  },
}
