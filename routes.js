(function () {

  var router = require('express').Router();
  var api = require('./api');

  router.get('/', api.healthcheck);
  router.post('/', api.hook);

  module.exports = router;

})();
