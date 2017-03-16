var path = require('path');


module.exports = function(app) {

  app.use('/api/activity', require('../api/activity'));
  app.use('/api/user', require('../api/user'));
  app.use('/images', require('../images'));

	// catch 404 and forward to Angular

  app.all('/*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });
};
