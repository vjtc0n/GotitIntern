/**
 * Created by vjtc0n on 2/1/17.
 */
var faker = require('faker');
module.exports = function(app) {
  var path = require('path');
  var models = require(path.resolve(__dirname, '../model-config.json'));
  var datasources = require(path.resolve(__dirname, '../datasources.json'));

  function autoUpdateAll(){
    Object.keys(models).forEach(function(key) {
      if (typeof models[key].dataSource != 'undefined') {
        if (typeof datasources[models[key].dataSource] != 'undefined') {
          app.dataSources[models[key].dataSource].autoupdate(key, function (err) {
            if (err) throw err;
            console.log('Model ' + key + ' updated');
          });
        }
      }
    });
  }

  function autoMigrateAll(){
    Object.keys(models).forEach(function(key) {
      if (typeof models[key].dataSource != 'undefined') {
        if (typeof datasources[models[key].dataSource] != 'undefined') {
          app.dataSources[models[key].dataSource].automigrate(key, function (err) {
            if (err) throw err;
            console.log('Model ' + key + ' migrated');
          });
        }
      }
    });
  }
  //TODO: change to autoUpdateAll when ready for CI deployment to production
  //autoMigrateAll();
  //autoUpdateAll();
  function createInstances() {
    var Member = app.models.Member;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;


    Member.create([
      {username: 'Khanh', email: 'abc@g.co', password: 'luukhanhvi1@', userId: 10, lastname: "Pham"},
      {username: 'Khanh', email: 'abc1@g.co', password: 'luukhanhvi1@', userId: 15},
      {username: 'Nhuan', email: 'abcd@g.com', password: '12345', userId: 19}
    ], function (err, users) {
      if (err) throw err;

      users[0].posts.create([
        {
          extension: "img",
          caption: "ABCDEF",
          size: 3,
          imgUrl: "http://img.k13cdn.net/f/2013/08/bai-kiem-tra-hoc-sinh-08082013.jpg"
        },
        {
          extension: "img",
          caption: "ABCDEF",
          size: 3,
          imgUrl: "http://img.k13cdn.net/f/2013/08/bai-kiem-tra-hoc-sinh-08082013.jpg"
        }
      ], function (err, posts) {
        if (err) throw err;
      });

      users[1].posts.create([
        {
          extension: "img",
          caption: "123456",
          size: 4,
          imgUrl: "http://www.studyitalian.it/images/test.jpg"
        },
        {
          extension: "img",
          caption: "123456",
          size: 4,
          imgUrl: "http://www.studyitalian.it/images/test.jpg"
        }
      ], function (err, posts) {
        if (err) throw err;
      });


      // create Role
      Role.create({
        name: 'admin'
      },function (err, role) {
        if (err) throw err;
        //console.log('role is ', role);

        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].userId
        }, function (err, principal) {
          if (err) throw err;
          //console.log('created principal', principal);
        });
      });

      /*Role.create({
       name: 'staff'
       },function (err, role) {
       if (err) throw err;
       //console.log('role is ', role);

       role.principals.create({
       principalType: RoleMapping.USER,
       principalId: users[0].user_id
       }, function (err, principal) {
       if (err) throw err;
       //console.log('created principal', principal);
       });
       });*/

    });

    var ObjectID = RoleMapping.getDataSource().connector.getDefaultIdType();
    RoleMapping.defineProperty('principalId', {
      type: ObjectID
    });

    RoleMapping.belongsTo(Member, {foreignKey: 'principalId'});
    Member.hasMany(RoleMapping, {foreignKey: 'principalId'});
    Role.hasMany(Member, {through: RoleMapping, foreignKey: 'roleId'});
  }

  //createInstances();

};
