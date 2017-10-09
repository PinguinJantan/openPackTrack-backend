module.exports = {
  isAllowedToAccess: function(resource){
    return function(req, res, next){
      let acl = req.app.get('acl')
      acl.isAllowed(req.decoded.username, resource, req.method, function(err, allowed){
        if (err) {
          res.json({
            success: false,
            message: err
          })
        }
        else if (allowed) {
          next()
        }
        else {
          res.json({
            success: false,
            message: "Permission denied"
          })
        }
      })
      // old code
      // acl.isAllowed(req.decoded.username, resource, ['GET'], function(err, allowed){
      //   if (err) {
      //     res.json(err)
      //   }
      //   else if (allowed) {
      //     next()
      //   }
      //   else{
      //     req.allowed = allowed
      //     res.json({
      //       status: 'error',
      //       message: 'Permission denied'
      //     })
      //   }
      // })
      // console.log("masuk middleware");
    }
  },
}
