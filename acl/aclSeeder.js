var nodeAcl = require('acl');
var mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, { useMongoClient: true }, (err) => {
  var acl = new nodeAcl(new nodeAcl.mongodbBackend(mongoose.connection.db, ''));

  Promise.all([
    acl.allow('admin', 'item', ['GET', 'POST', 'DELETE']),
    acl.allow('admin', 'input', ['GET', 'POST', 'DELETE']),
    acl.allow('admin', 'category', ['GET', 'POST', 'DELETE']),
    acl.allow('admin', 'user', ['GET', 'POST', 'DELETE']),
    acl.allow('basic', 'item', ['GET']),
    acl.addUserRoles('1', 'admin'),
    acl.addUserRoles('9', 'admin'),
    acl.addUserRoles('22', 'basic'),
  ])
    .then(() => {
      console.log('[SUKSES] Benih ACL sudah ditanam');
    })
    .catch((error) => {
      console.error('[error]', error);
    })
    .finally(() => {
      process.exit(0);
    });
});
