require('es6-promise').polyfill();
require('isomorphic-fetch');

module.exports = function(accessToken) {
  accessToken.createToken = function (data, cb) {
    fetch('https://graph.facebook.com/app?access_token=' + data.id)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        if (typeof json.error == 'undefined') {
          accessToken.create({
            userId: data.userId,
            id: data.id,
            ttl: data.ttl,
            created: new Date()
          }, function (err, token) {
            if (err) cb(err);
            cb(null, token)
          })
        } else {
          cb(json.error)
        }

      })
      .catch(function(error) {
        cb(error)
      });
  };

  accessToken.remoteMethod(
    'createToken',
    {
      http: {path: '/createToken', verb: 'post'},
      accepts: [
        {arg: 'data', type: 'object', http: { source: 'body' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );
};
