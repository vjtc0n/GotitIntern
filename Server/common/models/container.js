module.exports = function(Container) {
  Container.getAFile = function (container, file, cb) {
    Container.getFile(container, file, function (err, files) {
      
      if (err) cb(err)
      if (!err) {
        cb(null, files)
      }
    })
  }

  Container.remoteMethod(
    'getAFile',
    {
      http: {path: '/getafile', verb: 'post'},
      accepts: [
        {arg: 'container', type: 'string', http: { source: 'query' } },
        {arg: 'file', type: 'string', http: { source: 'query' } }
      ],
      returns: [
        {arg: 'files', type: 'object'}
      ]
    }
  )
};
