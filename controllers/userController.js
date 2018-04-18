const paginate = require('express-paginate')
var jwt = require('jsonwebtoken')
let sequelize = require('sequelize')
let models = require('../models')

module.exports = {
  usersWithRoles: function(req, res, next){
    var result = {
      success: false
    }
    let mongo = req.app.get('mongo')
    if (req.query.search == null) {
      req.query.search = ''
    }
    if (req.query.withDeleted != 'true') {
      req.query.withDeleted = false
    }
    var text = req.query.search
    models.User.findAndCountAll({
      where: {
        $or: [
          sequelize.where(sequelize.col('User.name'), { $ilike: `%${text}%`}),
          sequelize.where(sequelize.col('User.username'), { $ilike: `%${text}%`}),
        ]
      },
      limit: req.query.limit,
      offset: req.skip,
      paranoid: !req.query.withDeleted
    })
    .then(data=>{
      var users = data.rows
      var userCount = data.count
      pageCount = Math.ceil(userCount / req.query.limit)
      let allUsers = []
      mongo.collection("users").find({}).toArray((err, userRoles)=>{
        if (err) {
          if (err.message) {
            result.message = err.message
          }
          else {
            result.error = err
          }
          return res.status(500).json(result)
        }
        for (var i in users) {
          let someone = {
            name: users[i].name,
            username: users[i].username,
            deletedAt: users[i].deletedAt,
            hasRole: false,
            roles: []
          }
          for (var j in userRoles) {
            if (userRoles[j].key == users[i].id) {
              someone.hasRole = true
              someone.roles = Object.keys(userRoles[j]).slice(2)
            }
          }
          allUsers.push(someone)
        }
        result.success = true
        result.pagination = {
          userTotal: userCount,
          pageCount: pageCount,
          currentPage: req.query.page,
          hasNextPage: paginate.hasNextPages(req)(pageCount),
          hasPrevPage: res.locals.paginate.hasPreviousPages
        }
        result.users = allUsers
        res.json(result)
      })
    })
    .catch(err=>{
      if (err.message) {
        result.message = err.message
      }
      else {
        result.error = err
      }
      return res.status(500).json(result)
    })
  },

  //update user detail
  updateUserDetail: function(req, res) {
    var result = {
      success: false
    }
    if (!req.body.name) {
      result.message = 'no name provided'
      res.status(412).json(result)
    }
    if (!req.body.username) {
      result.message = 'no username provided'
      res.status(412).json(result)
    }
    if (!req.body.email) {
      result.message = 'no email provided'
      res.status(412).json(result)
    }
    if (!req.body.identityNumber) {
      result.message = 'no identityNumber provided'
      res.status(412).json(result)
    }
    if(!req.body.id || parseInt(req.body.id) != req.body.id){
      result.message = 'no id provided'
      res.status(412).json(result)
    }

    models.User.findById(req.body.id)
    .then(user=>{
      user.name = req.body.name
      user.username = req.body.username
      user.email = req.body.email
      user.identityNumber = req.body.identityNumber
      return user.save()
    })
    .then(user=>{
      result.success = true
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
  },

  // Detail data user
  userDetail: function(req, res, next){
    var result = {
      success: false
    }
    models.User.find({
      where: {
        username: req.params.username
      }
    })
    .then(user=>{
      if (user) {
        let mongo = req.app.get('mongo')
        mongo.collection("users").find({key: user.id.toString()}).toArray((err, userRoles)=>{
          if (err) {
            if (err.message) {
              result.message = err.message
            }
            else {
              result.error = err
            }
            return res.status(500).json(result)
          }
          console.log(userRoles);
          let someone = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            identityNumber: user.identityNumber,
            roles: Object.keys(userRoles[0]).slice(2)
          }
          result.success = true
          result.user = someone
          res.json(result)
        })
      }
      else {
        result.message = "User " + req.params.username + " not found"
        res.json(result)
      }
    })
  },

  //delete user
  deactivateUser: function(req, res) {
    var result = {
      success: false
    }
    if (req.body.username) {
      models.User.destroy({
        where: {
          username: req.body.username
        }
      })
      .then(user=>{
        if (user) {
          result.success = true
          res.json(result)
        }
        else {
          result.message = 'username not found'
          res.json(result)
        }
      })
      .catch(err=>{
        if (err.message) {
          result.message = err.message
        }
        else {
          result.errors = err
        }
        res.json(result)
      })
    }
    else {
      result.message = 'no username provided'
      res.json(result)
    }
  },

  //reactivate user
  reactivateUser: function(req, res) {
    var result = {
      success: false
    }
    if (req.body.username) {
      models.User.findOne({
        where: {
          username: req.body.username
        },
        paranoid: false
      })
      .then(user=>{
        if (user) {
          return user.restore()
        }
        else {
          return Promise.reject({message: 'username not found'})
        }
      })
      .then(()=>{
        result.success = true
        res.json(result)
      })
      .catch(err=>{
        if (err.message) {
          result.message = err.message
        }
        else {
          result.errors = err
        }
        res.json(result)
      })
    }
    else {
      result.message = 'no username provided'
      res.json(result)
    }
  },

  //all roles
  allRoles: function(req, res) {
    var result = {
      success: false
    }
    let mongo = req.app.get('mongo')
    mongo.collection('roles').find({}).toArray((err, roles)=>{
      if (err) {
        res.json(err)
      }
      else {
        var roleNames = []
        roles.forEach(role=>{
          roleNames.push(role.key)
        })
        result.success = true
        result.roles = roleNames
        res.json(result)
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
