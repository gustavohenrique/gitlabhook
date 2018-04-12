(function () {

  var router = require('express').Router();
  var api = require('./api');

  router.post(['/', '/v1'], api.hook);

  module.exports = router;

})();
