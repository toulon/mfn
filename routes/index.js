var path = require('path'),
    util = require('util'),
  fs = require('fs');

var mainRoutes = [];
address = '127.0.0.1',

  port = "8000";

var requireRoutes = function(dir, app) {
  var files = fs.readdirSync(dir).filter(function(file) {
    return path.join(__dirname, file) != __filename;
  });

  files.forEach(function(file) {
    var absolutePath = path.join(dir, file);

    var stat = fs.statSync(absolutePath);

    if (stat.isFile()) {
      try {
        var defineRoutes = require(absolutePath);
        defineRoutes(app);

        if (defineRoutes.meta) {
          mainRoutes.push(defineRoutes.meta);
        }
      } catch (e) {
        console.log('Could not require route "' + absolutePath + '" due to exception', e);
      }
    } else if (stat.isDirectory()) {
      // Scan the directory recursive
      requireRoutes(path.join(dir, file), app);
    }
  });
}

var routes = function(app) {
  requireRoutes(__dirname, app);

  // Defines the root page. can be safely removed!
  app.get('/', function(req, res) {
    res.render('index', { mainRoutes : mainRoutes });
  })
}

module.exports = routes;
