module.exports = function(Comment) {
  /*
  * Must change to source: body
  * */

  Comment.deleteMultipleComment = function (data, cb) {
    Comment.destroyAll({
      userId: data.userId,
      postId: data.postId
    }, function (err, info, count) {
      if (err) cb(err);
      cb(null, info, count)
    })
  };

  Comment.remoteMethod(
    'deleteMultipleComment',
    {
      http: {path: '/deleteMultipleComment', verb: 'delete'},
      accepts: [
        {arg: 'data', type: 'object', http: { source: 'body' } }
      ],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );

  Comment.deleteAllComment = function (cb) {
    Comment.destroyAll(function (err, info, count) {
      if (err) cb(err);
      cb(null, info, count)
    })
  };

  Comment.remoteMethod(
    'deleteAllComment',
    {
      http: {path: '/deleteAllComment', verb: 'delete'},
      accepts: [],
      returns: [
        {arg: 'result', type: 'object'}
      ]
    }
  );
};
