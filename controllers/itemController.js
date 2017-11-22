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
      sku: req.body.sku,
      categoryId: req.body.categoryId,
      name: req.body.name,
      color: req.body.color,
      size: req.body.size,
      gender: req.body.gender
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
      include: [{model: models.Category} ]
      }
    )
    .then(item=>{
      result.success = true
      result.status = "OK"
      result.item = item
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
      attributes: ["id", "sku", "name", "color", "size", "gender"],
      include: [{model: models.Category, attributes: ["id", "name"]} ],
      limit: req.query.limit,
      offset: req.skip,
      }
    )
    .then(item=>{
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
        result.item = item
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
      where: {
        sku: req.params.sku
      }
    })
    .then(item=>{
      result.success = true,
      result.status = "OK",
      result.item = item
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
        && parseInt(req.body.sku) == req.body.sku
        && req.body.name
        && req.body.color
        && parseInt(req.body.size) == req.body.size
        && req.body.gender
        && parseInt(req.body.category) == req.body.category) {
      models.Item.findById(req.body.id)
      .then(item=>{
        if (item) {
          item.sku = req.body.sku
          item.name = req.body.name
          item.color = req.body.color
          item.size = req.body.size
          item.gender = req.body.gender
          item.categoryId = req.body.category
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
  },

  //import
  // {
  //   "fieldname": "ItemCSV",
  //   "originalname": "g4798.png",
  //   "encoding": "7bit",
  //   "mimetype": "image/png",
  //   "destination": "/tmp/",
  //   "filename": "90c65d3089e8cb095970ecc25ba4015c",
  //   "path": "/tmp/90c65d3089e8cb095970ecc25ba4015c",
  //   "size": 60296
  // }
  import: function(req, res, next){
    var result = {
      success: false,
      status: "ERROR"
    }

    if (req.file) {
      let fs = require('fs');
      let papa = require('papaparse');
      let content = fs.readFileSync(req.file.path, {encoding: 'binary'})
      papa.parse(content, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(csvResults){
          res.json(csvResults)

          //delete file
          fs.unlink(req.file.path, err=>{
            if (err && err.code == 'ENOENT') {
              console.log("file ", req.file.pat, "doesn't exist");
            }
            if (err) {
              console.log("error: ", err);
            }
            else {
              console.log("temporary file deleted");
            }
          })
        }
      })
    }
    else {
      result.message = "No file provided"
      res.json(result)
    }
  }

}
