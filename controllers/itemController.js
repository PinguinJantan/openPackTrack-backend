const paginate = require('express-paginate');

let models = require('../models')

module.exports = {
  // tambah item baru
  create: function(req,res,next){
    var result = {
      success: false,
      status: "ERROR",
      item: null
    }
    models.Item.create({
      code: req.body.code,
      sizeId: req.body.sizeId,
      skuId: req.body.skuId
    }).then(item=>{
      result.success = true
      result.status = "OK"
      result.item = item
      res.json(result)
    }).catch(err => {
      console.log('Error when trying to create new item : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })

  },

  // ambil semua item
  all: function(req,res,next){
    var result = {
      success: false,
      status: "ERROR",
      item: null
    }
    models.Item.findAll({
      include: [
        { model: models.Sku,
          as: 'sku',
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: [
            { model: models.Category, as: 'category'},
            { model: models.Gender, as: 'gender' },
            { model: models.Color, as: 'color' },
          ]
        }
      ]}
    )
    .then(items=>{
      let mappedItem = items.map(function(item){
        let newItemObj = JSON.parse(JSON.stringify(item));
        // newItemObj.Sku.Category = (newItemObj.Sku.Category ? newItemObj.Sku.Category.name : null)
        // newItemObj.Sku.Gender = (newItemObj.Sku.Gender ? newItemObj.Sku.Gender.name : null)
        // newItemObj.Sku.Color = (newItemObj.Sku.Color ? newItemObj.Sku.Color.name : null)
        return newItemObj
      })
      result.success = true
      result.status = "OK"
      result.item = mappedItem
      res.json(result)
    }).catch(err=>{
      console.log('Error when trying to show all item : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },

  // ambil dengan paginasi
  paginatedAll: function(req,res,next){
    var result = {
      success: false,
      status: "ERROR",
      pagination: null,
      item: null
    }
    models.Item.findAll({
      include: [
        { model: models.Size,
          as: 'size',
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        },
        { model: models.Sku,
          as: "sku",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: [
            { model: models.Category,
              as: 'category',
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            },
            { model: models.Gender,
              as: 'gender',
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            },
            { model: models.Color,
              as: 'color',
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            },
          ]
        }
      ],
      limit: req.query.limit,
      offset: req.skip,
      }
    )
    .then(items=>{
      models.Item.count()
      .then(itemCount=>{
        pageCount = Math.ceil(itemCount / req.query.limit)
        result.success = true
        result.status = "OK"
        result.pagination = {
          itemTotal: itemCount,
          pageCount: pageCount,
          currentPage: req.query.page,
          hasNextPage: paginate.hasNextPages(req)(pageCount),
          hasPrevPage: res.locals.paginate.hasPreviousPages
        }
        let mappedItem = items.map(function(item){
          let newItemObj = JSON.parse(JSON.stringify(item));
          delete newItemObj.skuId
          delete newItemObj.sizeId
          newItemObj.size = (newItemObj.size ? newItemObj.size.name : null)
          delete newItemObj.sku.categoryId
          newItemObj.sku.category = (newItemObj.sku.category ? newItemObj.sku.category.name : null)
          delete newItemObj.sku.colorId
          newItemObj.sku.color = (newItemObj.sku.color ? newItemObj.sku.color.name : null)
          delete newItemObj.sku.genderId
          newItemObj.sku.gender = (newItemObj.sku.gender ? newItemObj.sku.gender.name : null)
          return newItemObj
        })
        result.item = mappedItem
        res.json(result)
      })
    }).catch(err=>{
      console.log('Error when trying to show all item : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },

  // detail sebuah item
  detail: function(req, res, next){
    var result = {
      success: false,
      status: "ERROR",
      item: null
    }
    models.Item.find({
      include: [
        {
          model: models.Size,
          as: 'size',
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
        },
        {
          model: models.Sku,
          as: 'sku',
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: [
            {
              model: models.Category,
              as: 'category',
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              },
            },
            {
              model: models.Gender,
              as: 'gender',
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              },
            },
            {
              model: models.Color,
              as: 'color',
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              },
            },
          ]
        }
      ],
      where: {
        code: req.params.code
      }
    })
    .then(item=>{
      let newItemObj = JSON.parse(JSON.stringify(item));
      delete newItemObj.sizeId
      delete newItemObj.skuId
      delete newItemObj.sku.categoryId
      delete newItemObj.sku.colorId
      delete newItemObj.sku.genderId
      result.success = true,
      result.status = "OK",
      result.item = newItemObj
      res.json(result)
    })
    .catch(err=>{
      console.log('Error when trying to show detail item : ', err);
      if (err.errors) {
        result.errors = err.errors
      }
      res.json(result)
    })
  },

  // update sebuah item
  update: function(req, res, next){
    var result = {
      success: false,
      status: "ERROR",
    }

    // cek apakah parameter lengkap dan sesuai dengan tipedatanya
    // catatan: parseInt("5aaa") = 5
    if (parseInt(req.body.id) == req.body.id
        && req.body.code
        && req.body.sizeId
        && req.body.skuId) {
      models.Item.findById(req.body.id)
      .then(item=>{
        if (item) {
          item.code = req.body.code
          item.sizeId = req.body.sizeId
          item.skuId = req.body.skuId
          item.save().then(()=>{
            result.success = true
            result.status = "OK"
            result.item = item
            res.json(result)
          })
          .catch(err=>{
            result.errors = err
            res.json(result)
          })
        }
        else {
          result.status = "NOT FOUND"
          result.itemId = parseInt(req.body.id)
          res.json(result)
        }
      })
      .catch(err=>{
        result.errors = err
        res.json(result)
      })
    }
    else {
      result.message = "parameter kurang benar"
      res.json(result)
    }
  },

  delete: function(req, res, next){
    var result = {
      success: false,
      status: "ERROR"
    }
    if (parseInt(req.body.id) == req.body.id) {
      models.Item.findById(req.body.id)
      .then(item=>{
        if (item) {
          item.destroy()
          .then(()=>{
            result.success = true
            result.status = "OK"
            result.message = "Item terhapus"
            result.item = item
            res.json(result)
          })
          .catch(err=>{
            res.json(err)
          })
        }
        else {
          result.status = "NOT FOUND"
          res.json(result)
        }
      })
      .catch(err=>{

      })
    }
  }

}
