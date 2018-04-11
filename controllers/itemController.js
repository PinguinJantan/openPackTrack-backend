const paginate = require('express-paginate');

let sequelize = require('sequelize');
let models = require('../models')
let bulk = require('../modules/bulk')

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
    console.log(req.query);
    models.Item.findAndCountAll({
      logging: console.log,
      where: {
        $or: [
          // https://stackoverflow.com/questions/33271413/sequelize-or-clause-with-multiple-models
          sequelize.where(sequelize.col('size.name'), { $ilike: `%${text}%`}),
          sequelize.where(sequelize.col('sku.name'), { $ilike: `%${text}%`}),
          sequelize.where(sequelize.col('Item.code'), { $ilike: `%${text}%`}),
          sequelize.where(sequelize.col('sku->color.name'), { $ilike: `%${text}%`}),
        ]
      },
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
      order: [[req.query.sortBy, req.query.sortDirection]]
      }
    )
    .then(data=>{
      var items = data.rows
      var itemCount = data.count
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
      if(item){
        let newItemObj = JSON.parse(JSON.stringify(item));
        delete newItemObj.sizeId
        delete newItemObj.skuId
        delete newItemObj.sku.categoryId
        delete newItemObj.sku.colorId
        delete newItemObj.sku.genderId
        result.success = true
        result.item = newItemObj
        res.json(result)
      }
      else {
        result.success = true
        result.message = "Item not found"
        res.json(result)
      }
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
      success: false
    }
    console.log(req);
    if (req.file) {
      let fs = require('fs');
      let papa = require('papaparse');
      let content = fs.readFileSync(req.file.path, {encoding: 'binary'})
      papa.parse(content, {
        header: true,
        // dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(csvResults){
          var sizes = csvResults.data.map((item, idx, array)=>{
            if(item["Size"]){
              return item["Size"]
            }
            else {
              return "Tidak tersedia"
            }
          })
          var uniqueSizes = new Set(sizes)
          var uniqueSizesArray = Array.from(uniqueSizes)
          var sizesObjects = uniqueSizesArray.map(s=>{
            return {name: s}
          })
          // todo: finish this
          // ALTER SEQUENCE "Sizes_id_seq" RESTART WITH 21;
          bulk.findOrCreate(models.Size, sizesObjects, ["id", "name"])
          .then(sizeInstances=>{
            // todo: colors
            var colors = csvResults.data.map((item, idx, array)=>{
              if(item["Color"]){
                return item["Color"]
              }
              else {
                return "Tidak tersedia"
              }
            })
            var uniqueColors = new Set(colors)
            var uniqueColorsArray = Array.from(uniqueColors)
            var colorsObjects = uniqueColorsArray.map(c=>{
              return {name: c}
            })
            bulk.findOrCreate(models.Color, colorsObjects, ["id", "name"])
            .then(colorInstances=>{
              var categories = csvResults.data.map((item, idx, array)=>{
                if(item["Kategori Code"]){
                  return item["Kategori Code"]
                }
                else {
                  return "Tidak tersedia"
                }
              })
              var uniqueCategories = new Set(categories)
              var uniqueCategoriesArray = Array.from(uniqueCategories)
              var categoryObjects = uniqueCategoriesArray.map(c=>{
                return {name: c}
              })
              bulk.findOrCreate(models.Category, categoryObjects, ["id", "name"])
              .then(categoryInstances=>{
                // todo: sku
                // https://stackoverflow.com/questions/18773778/create-array-of-unique-objects-by-property
                var flags = {}
                var anySkuEmpty = false
                var uniqueItems = csvResults.data.filter(item=>{
                  if(item["SKU"] && item["SKU Name"]){
                    if (flags[item["SKU"]]) {
                      return false
                    }
                    else {
                      flags[item["SKU"]] = true
                      return true
                    }
                  }
                  else {
                    anySkuEmpty = true
                    return false
                  }
                })
                if (anySkuEmpty) {
                  result.message = "There are some item with empty SKU"
                  res.json(result)
                }
                else {
                  models.Gender.findAll({
                    attributes: ["id", "name"]
                  })
                  .then(genders=>{
                    var skus = uniqueItems.map(item=>{
                      var thisCategory = categoryInstances.filter(cat=>{
                        return cat.name == item["Kategori Code"]
                      })
                      var undefinedColor = colorInstances.filter(col=>{
                        return col.name == "Tidak tersedia"
                      })
                      var thisColor = colorInstances.filter(col=>{
                        return col.name == item["Color"]
                      })
                      // console.log("color", thisColor.length);
                      if (thisColor.length == 0) {
                        thisColor = undefinedColor
                      }
                      var genderName = thisCategory[0].name.split(",")[1]
                      var thisGender = genders.filter(gen=>{
                        return gen.name == genderName
                      })

                      return {
                        code: item["SKU"],
                        name: item["SKU Name"],
                        categoryId: thisCategory[0].id,
                        colorId: thisColor[0].id,
                        genderId: thisGender[0].id
                      }
                    })

                    var skuCodes = skus.map(sku=>{
                      return {code: sku.code}
                    })
                    bulk.upsert(models.Sku, skus, skuCodes, ["id", "code"])
                    .then(skuInstances=>{
                      var uniqueFlags = {}
                      var anyItemEmpty = false
                      var uniqueItemsEntry = csvResults.data.filter(item=>{
                        if(item["Item Code"] && item["Item Name"]){
                          if (uniqueFlags[item["Item Code"]]) {
                            return false
                          }
                          else {
                            uniqueFlags[item["Item Code"]] = true
                            return true
                          }
                        }
                        else {
                          anyItemEmpty = true
                          return false
                        }
                      })
                      if (anyItemEmpty) {
                        result.message = "There are some items with empty SKU"
                        res.json(result)
                      }
                      else {
                        var items = uniqueItemsEntry.map(itemEntry=>{
                          var thisSku = skuInstances.filter(sku=>{
                            return sku.code == itemEntry["SKU"]
                          })
                          var thisSize = sizeInstances.filter(size=>{
                            return size.name == itemEntry["Size"]
                          })
                          var undefinedSize = sizeInstances.filter(size=>{
                            return size.name == "Tidak tersedia"
                          })
                          if (thisSize.length == 0) {
                            thisSize = undefinedSize
                          }

                          return {
                            code: itemEntry["Item Code"],
                            sizeId: thisSize[0].id,
                            skuId: thisSku[0].id
                          }
                        })
                        var itemCodes = items.map(item=>{
                          return {code: item.code}
                        })
                        bulk.itemUpsert(models.Item, items, itemCodes)
                        .then(rowProcessed=>{
                          result.success = true
                          result.message = "Imported"
                          result.importedItems = rowProcessed
                          res.json(result)
                        })
                        .catch(err=>{
                          result.errors = err
                          res.json(result)
                        })
                      }
                    })
                    .catch(err=>{
                      result.errors = err
                      res.json(result)
                    })
                  })
                  .catch(err=>{
                    result.errors = err
                    res.json(result)
                  })
                }
              })
              .catch(err=>{
                result.errors = err
                res.json(result)
              })
            })
          })
          .catch(e=>{
            res.json(result)
          })

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
      res.status(412).json(result)
    }
  },

  // ekspor
  export: function(req, res){
    let papa = require('papaparse');
    var result = {
      success: false
    }
    var itemsToExport = {
      data: [],
      fields: ['Item Code', 'Item Name', 'SKU', 'SKU Name',
               'Kategori Code', 'Color', 'Size']
    }
    models.Item.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
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
              model: models.Color,
              as: 'color',
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              },
            },
          ]
        }
      ],
    })
    .then(items=>{
        items.forEach(item=>{
          var row = [
            item.code,
            `${item.sku.name} ${item.size.name}`,
            item.sku.code,
            item.sku.name,
            item.sku.category.name,
          ]
          if (item.sku.color.name == 'Tidak tersedia') {
            row.push('')
          }
          else {
            row.push(item.sku.color.name)
          }
          row.push(item.size.name)
          itemsToExport.data.push(row)
        })
        var csv = papa.unparse(itemsToExport)
        res.set({
          "Content-Disposition": 'attachment; filename="item-packtrack-'+new Date(Date.now()).toLocaleString() + '.csv"',
          "Content-Type": "text/csv",
        })
        res.send(csv)
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

}
