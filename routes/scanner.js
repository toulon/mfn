var Scanner = require('../models/scanner'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        IPAddress: fields.string ({      label: 'Ipaddress'
    }),
        model: fields.string ({      label: 'Model'
    }),
        serialNbr: fields.string ({      label: 'Serialnbr'
    }),
        browserVersion: fields.string ({      label: 'Browserversion'
    }),
        converted: fields.boolean ({      label: 'Converted'
    }),
        notes: fields.string ({      label: 'Notes'
    }),
  })
  var page_title = "All Scanners"
  app.param('scannerId', function(req, res, next, id) {
    Scanner.findById(id, function(err, scanner) {
      if (err) {
        next(err);
      } else {
        res.locals.scanner = scanner;
        next();
      }
    });
  });
  
  app.get('/scanners', function(req, res) {
    Scanner.find({}, function(err, scanners) {
      res.render('scanner/index', { scanners : scanners });
    });
  });

  app.get('/scanners/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('scanner/create', {
          title : 'Scanners',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/scanners/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var scanner = Scanner(form.data);
        scanner.save(function(err) {
          if (err) {
            console.error(err);
            res.render('scanner/create')
          } else {
            res.redirect('/scanners');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var scanner = Scanner(form.data);
        scanner.save(function(err) {
          if (err) {
            console.error(err);
            res.render('scanner/create')
          } else {
            res.redirect('/scanners');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/scanners');
      }
    });
  });

  app.get('/scanners/:scannerId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.scanner);
    reg_form.handle(res.locals.scanner, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('scanner/edit', {
          title : 'Scanners',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('scanner/edit', {
          title : 'Scanners',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/scanners/:scannerId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.scanner);
        res.locals.scanner.save(function(err) {
          if (err) {
            console.error(err);
            res.render('scanner/edit');
          } else {
            res.redirect('/scanners');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.scanner);
        res.locals.scanner.save( function(err) {
          if (err) {
            console.error(err);
              res.render('scanner/edit');
          } else {
          res.redirect('/scanners');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//scanners');
      }
    });
  });

  app.get('/scanners/:scannerId/detail', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("detail get - Success")
      },
      other: function (form) {
        console.log("detail get - Other")
      },
      empty: function (form) {
        console.log("Detail get - There was no form data in the request")
        form.bind(res)
        res.render('scanner/detail');
      }
    });
  });

  app.get('/scanners/:scannerId/delete', function(req, res) {
    res.render('scanner/delete');
  });

  app.post('/scanners/:scannerId/delete', function(req, res) {
    Scanner.remove({ _id : req.params.scannerId }, function(err) {
      res.redirect('/scanners');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Scanner',
  route : '/scanners'
}
