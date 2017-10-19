let models = require('../models')

module.exports = {
  usersWithRoles: function(req, res, next){

  },

  // tambah role
  addRole: function(req, res, next){
    let acl = req.app.get('acl')
    if (req.body.rolename) {
      acl.whatResources(req.body.rolename, (err, resources)=>{
        console.log(resources);
        if (!Object.keys(resources).length) {
          console.log("yes, the role not exist yet");
          let newAcl = {
            roles: req.body.rolename,
          }
          try {
            newAcl.allows = JSON.parse(req.body.permissions)
          } catch (e) {
            res.json({
              success: false,
              message: "Invalid JSON for permissions"
            })
          }
          console.log(JSON.stringify(newAcl));
          acl.allow([newAcl], err=>{
            if (err) {
              res.json({
                success: false,
                message: err
              })
            }
            else {
              res.json({
                success: true,
                message: "berhasil menambahkan role",
                permissions: newAcl
              })
            }
          })
        }
        else {
          res.json({
            success: false,
            message: "role already exist"
          })
        }
      })

    }
  },

  // assign role ke user
  addRoleToUser: function(req, res, next){

  }
}
