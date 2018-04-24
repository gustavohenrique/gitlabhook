(function () {

  var spawn = require('child_process').spawn;
  var SCRIPT_DIR = '/opt/gitlabhook/deploy/';
  var CLONE_DIR = '/tmp/';

  function deploy (data) {
    function isPushed(branch, data) {
      return data['object_kind'] === 'push' && data['ref'] === 'refs/heads/' + branch;
    }

    function isMerged (data) {
      return data['object_attributes'] && data['object_attributes']['state'] === 'merged';
    }

    if (! isMerged(data) && ! isPushed('develop', data)) {
      console.log('It is not a MR merged and it is not pushed to branch develop');
      return;
    }
    try {
      var repo = data['project']['git_ssh_url'];
      var project = data['repository']['name'];
      var script = SCRIPT_DIR + project + '.sh'
      var child = spawn(script, [repo, CLONE_DIR, project]);
      process.stdin.pipe(child.stdin);
      child.stdout.on('data', function (res) {
        console.log('' + res);
      });
      child.stderr.on('error', function (err) {
        console.log('[ERROR]: ' + err);
      });

    }
    catch (e) {
      console.error(e.message);
    }
  }

  this.hook = function (req, res) {
    setImmediate(function () {
      deploy(req.body);
    });

    return res.status(200).json({});
  };

  this.healthcheck = function (req, res) {
    return res.send('ok')
  };

  module.exports = this;

})();
