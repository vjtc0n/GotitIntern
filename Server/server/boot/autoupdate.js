/**
 * Created by vjtc0n on 2/1/17.
 */
var faker = require('faker');


var posts1 = [];
var posts2 =[];

for (var i = 0; i < 20; i++) {
  posts1.push({
    extension: "img",
    caption: "ABCDEF",
    size: 3,
    imgUrl: "http://img.k13cdn.net/f/2013/08/bai-kiem-tra-hoc-sinh-08082013.jpg"
  })
}

for (var i = 0; i < 20; i++) {
  posts2.push({
    extension: "img",
    caption: "ABCDEF",
    size: 3,
    imgUrl: "http://img.k13cdn.net/f/2013/08/bai-kiem-tra-hoc-sinh-08082013.jpg"
  })
}


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
    var dataLength = Object.keys(models).length;
    var i = 0;
    Object.keys(models).forEach(function(key) {
      if (typeof models[key].dataSource != 'undefined') {
        if (typeof datasources[models[key].dataSource] != 'undefined') {
          app.dataSources[models[key].dataSource].automigrate(key, function (err) {
            if (err) throw err;
            console.log('Model ' + key + ' migrated');
            i = i + 1;
            if (i == (dataLength - 1)) {
              createInstances()
            }
          });
        }
      }
    });
  }
  //TODO: change to autoUpdateAll when ready for CI deployment to production
  autoMigrateAll();
  //autoUpdateAll();
  function createInstances() {
    var Member = app.models.Member;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;


    Member.create([
      {username: 'Khanh', email: 'abc@g.co', password: 'luukhanhvi1@', userId: 1230367927053470, avatar_picture: "https://upload.wikimedia.org/wikipedia/commons/0/07/Avatar_girl_face.png"},
      {username: 'Khanh', email: 'abc1@g.co', password: 'luukhanhvi1@', userId: 15, avatar_picture: "https://upload.wikimedia.org/wikipedia/commons/0/07/Avatar_girl_face.png"},
      {username: 'Nhuan', email: 'abcd@g.com', password: '12345', userId: 19, avatar_picture: "https://upload.wikimedia.org/wikipedia/commons/0/07/Avatar_girl_face.png"}
    ], function (err, users) {
      if (err) throw err;

      users[0].posts.create(posts1, function (err, posts) {
        if (err) throw err;
      });

      users[1].posts.create(posts2, function (err, posts) {
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


};
