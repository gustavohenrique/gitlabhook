var app = require('./app');
var port = process.env.PORT || 18000;
var ip = process.env.EXTERNAL_IP || '0.0.0.0';

app.listen(port, ip, function () {
  console.log('Hook is running on http://%s:%s', ip, port);
});
