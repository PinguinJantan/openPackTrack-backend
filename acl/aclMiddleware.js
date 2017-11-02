module.exports = {
  isAllowedToAccess: function(resource){
    return function(req, res, next){
    //   let acl = req.app.get('acl')
    //
    //   acl.isAllowed(req.decoded.username, resource, req.method, function(err, allowed){
    //     console.log(allowed);
    //     if (err) {
    //       res.json({
    //         success: false,
    //         message: err
    //       })
    //     }
    //     else if (allowed) {
    //       next()
    //     }
    //     else {
    //       console.log("user id " + req.decoded.userId + " denied: " + err);
    //       res.json({
    //         success: false,
    //         message: "Permission denied",
    //         decoded: req.decoded
    //       })
    //     }
    //   })
    //
    next()
    }
  },
}
