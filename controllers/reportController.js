let models = require('../models')
let Sequelize = require('sequelize')
module.exports = {
  bulkCreateOpname: function(req, res) {
    var result = {
      success: false,
      status: "ERROR",
      msg: "SOMETHING WRONG!!!"
    }
    models.Carton.findOne({
      where: {
        barcode: req.body.barcode
      },
      include: [{
        model: models.Inner,
        attributes: ['id']
      }]
    }).then(carton => {
      if (carton != null) {
        let inputInnerids = carton.Inners.map(inner => {
          return {
            innerId: inner.id
          }
        })
        const Op = Sequelize.Op
        let arrayInnerids = carton.Inners.map(inner => inner.id)
        console.log(arrayInnerids);
        models.Report.findAll({
          attributes: ['innerId'],
          where: {
            innerId: {
              [Op.any]: arrayInnerids
            }
          }
        }).then(report => {
          if (report.length == 0) {
            models.Report.bulkCreate(inputInnerids)
              .then(() => {
                result.success = true
                result.status = "OK"
                result.msg = "opname success"
                res.json(result)
              }).catch(err => {
                console.log(err);
                res.json(result)
              })
          } else {
            result.msg = "Input Duplicate Inner"
            res.json(result)
          }
        }).catch(err => {
          console.log(err);
          res.json(result)
        })
      } else {
        result.success = true
        result.status = "EMPTY"
        result.msg = "carton null"
        res.json(result)
      }
    }).catch(err => {
      console.log(err);
      res.json(result)
    })
  }

}
