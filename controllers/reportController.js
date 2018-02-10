let models = require('../models')
let Sequelize = require('sequelize')
module.exports = {
  create: function(req,res){
    var result={
      success: false,
      status: 'ERROR',
      msg: 'SOMETHING WENT WORNG!!!'
    }
    models.Report.create()
    .then(report=>{
      result.success = true
      result.status = 'OK'
      result.msg = 'Create Report Success'
      result.report= report
      res.json(result)
    }).catch(err=>{
      console.log(err)
      res.json(result)
    })
  }
  // bulkCreateOpname: function(req, res) {
  //   var result = {
  //     success: false,
  //     status: "ERROR",
  //     msg: "SOMETHING WENT WRONG!!!"
  //   }
  //   models.Carton.findOne({
  //     where: {
  //       barcode: req.body.barcode
  //     },
  //     include: [{
  //       model: models.Inner,
  //       attributes: ['id']
  //     }]
  //   }).then(carton => {
  //     if (carton != null) {
  //       if (carton.Inners.length != 0) {
  //         let inputInnerids = carton.Inners.map(inner => {
  //           return {
  //             innerId: inner.id
  //           }
  //         })
  //         const Op = Sequelize.Op
  //         let arrayInnerids = carton.Inners.map(inner => inner.id)
  //         console.log(arrayInnerids);
  //         models.Report.findAll({
  //           attributes: ['innerId'],
  //           where: {
  //             innerId: {
  //               [Op.any]: arrayInnerids
  //             }
  //           }
  //         }).then(report => {
  //           if (report.length == 0) {
  //             models.Report.bulkCreate(inputInnerids)
  //               .then(() => {
  //                 result.success = true
  //                 result.status = "OK"
  //                 result.msg = "opname success"
  //                 res.json(result)
  //               }).catch(err => {
  //                 console.log(err);
  //                 res.json(result)
  //               })
  //           } else {
  //             result.msg = "Input Duplicate Inner"
  //             res.json(result)
  //           }
  //         }).catch(err => {
  //           console.log(err);
  //           res.json(result)
  //         })
  //       } else {
  //         result.success = true
  //         result.status = "EMPTY"
  //         result.msg = "Carton Null"
  //         res.json(result)
  //       }
  //     } else {
  //       result.success = true
  //       result.status = "EMPTY"
  //       result.msg = "Carton not Found"
  //       res.json(result)
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //     res.json(result)
  //   })
  // },
  // report: function(req, res) {
  //   var result = {
  //     success: false,
  //     status: "ERROR",
  //     msg: "SOMETHING WENT WRONG!!!",
  //     report: null
  //   }
  //   models.Report.findAll({
  //     attributes: {exclude:['id','innerId','createdAt','updatedAt']},
  //       include: [{
  //         model: models.Inner
  //       }]
  //     })
  //     .then(report => {
  //       result.success = true
  //       result.status = "OK"
  //       result.msg = ""
  //       result.report = report
  //       res.json(result)
  //     }).catch(err => {
  //       console.log(err);
  //       res.json(result)
  //     })
  // }

}
