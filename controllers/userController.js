var jwt = require('jsonwebtoken')
let models = require('../models')

module.exports = {
  usersWithRoles: function(req, res, next){
    let mongo = req.app.get('mongo')
    models.User.findAll()
    .then(users=>{
      let allUsers = []
      mongo.collection("users").find({}).toArray((err, userRoles)=>{
        for (var i in users) {
          let someone = {
            name: users[i].name,
            username: users[i].username,
            hasRole: false,
            roles: []
          }
          for (var j in userRoles) {
            if (userRoles[j].key == users[i].id) {
              someone.hasRole = true
              someone.roles.push(Object.keys(userRoles[j]).slice(2))
            }
          }
          allUsers.push(someone)
        }
        res.json({
          success: true,
          users: allUsers
        })
      })
    })
  },

  // Detail data user
  userDetail: function(req, res, next){
    models.User.find({
      where: {
        username: req.params.username
      }
    })
    .then(user=>{
      if (user) {
        let mongo = req.app.get('mongo')
        mongo.collection("users").find({key: user.id.toString()}).toArray((err, userRoles)=>{
          console.log(userRoles);
          let someone = {
            success: true,
            user: {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              identityNumber: user.identityNumber,
              roles: Object.keys(userRoles[0]).slice(2)
            }
          }
          res.json(someone)
        })
      }
      else {
        res.json({
          success: false,
          message: "User " + req.params.username + " not found"
        })
      }
    })
  },

  // tambah role
  addRole: function(req, res, next){
    let acl = req.app.get('acl')
    if (req.body.rolename && req.body.permissions) {
      acl.whatResources(req.body.rolename.toLowerCase(), (err, resources)=>{
        console.log(resources);
        if (!Object.keys(resources).length) {
          console.log("yes, the role not exist yet");
          let newAcl = {
            roles: req.body.rolename.toLowerCase(),
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
    else {
      res.json({
        success: false,
        message: "missing parameter(s)"
      })
    }
  },

  // menghapus role dari ACL
  removeRole: function(req, res, next){
    let acl = req.app.get('acl')
    if (req.body.rolename) {
      if (req.body.rolename == "admin") {
        res.json({
          success: false,
          error: "Super User is protected by nature"
        })
      }
      else {
        acl.removeRole(req.body.rolename.toLowerCase(), err=>{
          if (err) {
            res.json({
              success: false,
              error: err
            })
          }
          else {
            res.json({
              success: true,
              message: "Berhasil menghapus role " + req.body.rolename
            })
          }
        })
      }
    }
    else {
      res.json({
        success: false,
        message: "missing parameter(s)"
      })
    }
  },

  // detail role
  roleDetail: function(req, res, next){
    let acl = req.app.get('acl')
    let result = {
      success: false,
    }
    acl.whatResources(req.params.roleName, (err, resources)=>{
      if (err) {
        res.json({
          success: false,
          message: err
        })
      }
      else if (Object.keys(resources).length === 0) {
        res.json({
          success: false,
          message: "Role " + req.params.roleName + " not found"
        })
      }
      else {
        let resourcesArray = []
        for (var key in resources) {
          console.log(key);
          resourcesArray.push({
            name: key,
            permission: resources[key]
          })
        }
        res.json({
          success: true,
          role: {
            name: req.params.roleName,
            resources: resourcesArray
          }
        })
      }
    })
  },

  // detail role resource tertentu
  roleDetailResource: function(req, res, next){
    let acl = req.app.get('acl')
    let result = {
      success: false,
    }
    acl.whatResources(req.params.roleName, (err, resources)=>{
      if (err) {
        res.json({
          success: false,
          message: err
        })
      }
      else if (Object.keys(resources).length === 0) {
        res.json({
          success: false,
          message: "Role " + req.params.roleName + " not found"
        })
      }
      else {
        let resource = {}
        let found = false
        for (var key in resources) {
          console.log(key);
          if (key == req.params.resource) {
            found = true
            result.success = true
            resource.name = key
            resource.permissions = resources[key]
            result.resource = resource
          }
        }
        if (found) {
          res.json(result)
        }
        else {
          result.message = "Resource " + req.params.resource + " not found or no access permission for " + req.params.roleName
          res.json(result)
        }
      }
    })
  },

  // assign role ke user
  addRoleToUser: function(req, res, next){
    let acl = req.app.get('acl')
    if (req.body.role && req.body.userId) {
      models.User.findById(req.body.userId).then(user=>{
        if (user) {
          acl.addUserRoles(req.body.userId, req.body.role, err=>{
            if (err) {
              res.json({
                success: false,
                errors: err
              })
            }
            else {
              res.json({
                success: true,
                message: "role successfully assigned to user",
                user: {
                  username: user.username,
                  name: user.name
                }
              })
            }
          })
        }
        else {
          res.json({
            success: false,
            message: "User not found",
          })
        }
      })

    }
    else {
      res.json({
        success: false,
        message: "missing parameter(s)",
      })
    }
  },

  // hapus role dari user
  // TODO: pikirkan tentang terhapusnya akun admin dari role admin
  removeRoleFromUser: function(req, res, next){
    let acl = req.app.get('acl')
    if (req.body.role && req. body.userId) {
      models.User.findById(req.body.userId).then(user=>{
        if (user) {
          acl.removeUserRoles(req.body.userId, req.body.role, err=>{
            if (err) {
              res.json({
                success: false,
                errors: err
              })
            }
            else {
              res.json({
                success: true,
                message: "role successfully removed from user"
              })
            }
          })
        }
        else {
          res.json({
            success: false,
            message: "User not found"
          })
        }
      })
    }
    else {
      res.json({
        success: false,
        message: "missing parameter(s)",
      })
    }
  },

  // ijinkan role akses ke resource
  allowRoleToResource: function(req, res, next){
    if (req.body.role && req.body.resource && req.body.permissions) {
      let acl = req.app.get('acl')
      acl.whatResources(req.body.role, (err, resources)=>{
        if (err) {
          res.json({
            success: false,
            error: err
          })
        }
        else if (Object.keys(resources).length === 0) {
          res.json({
            success: false,
            message: "Role " + req.body.role + " not found."
          })
        }
        else {
          try {
            let permissions = JSON.parse(req.body.permissions)
            // TODO: verifikasi apakah resource yang diberikan benar-benar ada
            acl.allow(req.body.role, req.body.resource, permissions, err=>{
              if (err) {
                res.json({
                  success: false,
                  error: err
                })
              }
              else {
                res.json({
                  success: true,
                  message: "izin akses diberikan",
                  acl: {
                    role: req.body.role,
                    resource: req.body.resource,
                    permissions: permissions
                  }
                })
              }
            })
          } catch (e) {
            res.json({
              success: false,
              message: "wrong permission format"
            })
          }
        }
      })
    }
    else {
      res.json({
        success: false,
        message: "incomplete inputs",
        data: {
          role: req.body.role,
          resource: req.body.resource,
          permissions: req.body.permissions
        }
      })
    }
  },

  //cabut permission role untuk resource
  revokeAccessRoleToResource: function(req, res, next){
    if (req.body.role && req.body.resource && req.body.permissions) {
      if (req.body.role == "admin") {
        res.json({
          success: false,
          message: "Super Role is protected by nature"
        })
      }
      else {
        let acl = req.app.get('acl')
        acl.whatResources(req.body.role, (err, resources)=>{
          if (err) {
            res.json({
              success: false,
              error: err
            })
          }
          else if (Object.keys(resources).length === 0) {
            res.json({
              success: false,
              message: "Role " + req.body.role + " not found."
            })
          }
          else {
            try {
              let permissions = JSON.parse(req.body.permissions)
              // TODO: verifikasi apakah resource yang diberikan benar-benar ada
              acl.removeAllow(req.body.role, req.body.resource, permissions, err=>{
                if (err) {
                  res.json({
                    success: false,
                    error: err
                  })
                }
                else {
                  res.json({
                    success: true,
                    message: "izin dicabut",
                    acl: {
                      role: req.body.role,
                      resource: req.body.resource,
                      permissions: permissions
                    }
                  })
                }
              })
            } catch (e) {
              res.json({
                success: false,
                message: "wrong permission format"
              })
            }
          }
        })
      }
    }
    else {
      res.json({
        success: false,
        message: "incomplete inputs",
        data: {
          role: req.body.role,
          resource: req.body.resource,
          permissions: req.body.permissions
        }
      })
    }
  },

  refreshToken: function(req, res) {
    var result = {
      success: false
    }
    var secret = req.app.get('superSecret')
    console.log(req.decoded.userId)
    var token = jwt.sign({userId: req.decoded.userId }, secret, { expiresIn: '1d'});
    if (token) {
      result.success = true
    }
    result.token = token
    res.json(result)
  },
}
