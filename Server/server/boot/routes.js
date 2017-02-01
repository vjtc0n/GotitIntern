/**
 * Created by vjtc0n on 7/20/16.
 */
module.exports = function (app) {
  //Node Express here
  var router = app.loopback.Router();
  /*router.get('/ping', function(req, res) {
    res.send('pongaroo');
  });

*/


  app.use(router);
};
