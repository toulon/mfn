var Waptracker = require('../models/waptracker'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        name: fields.string ({      label: 'Name'
    }),
        tdate: fields.date ({      label: 'Tdate'
    }),
        location: fields.string ({      label: 'Location'
    }),
        issue: fields.string ({      label: 'Issue'
    }),
  })
  var page_title = "All Waptrackers"
  app.param('waptrackerId', function(req, res, next, id) {
    Waptracker.findById(id, function(err, waptracker) {
      if (err) {
        next(err);
      } else {
        res.locals.waptracker = waptracker;
        next();
      }
    });
  });
  
  app.get('/waptrackers', function(req, res) {
    Waptracker.find({}, function(err, waptrackers) {
      res.render('waptracker/index', { waptrackers : waptrackers });
    });
  });

  app.get('/waptrackers/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('waptracker/create', {
          title : 'Waptrackers',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/waptrackers/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var waptracker = Waptracker(form.data);
        waptracker.save(function(err) {
          if (err) {
            console.error(err);
            res.render('waptracker/create')
          } else {
            res.redirect('/waptrackers');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var waptracker = Waptracker(form.data);
        waptracker.save(function(err) {
          if (err) {
            console.error(err);
            res.render('waptracker/create')
          } else {
            res.redirect('/waptrackers');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/waptrackers');
      }
    });
  });

  app.get('/waptrackers/:waptrackerId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.waptracker);
    reg_form.handle(res.locals.waptracker, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('waptracker/edit', {
          title : 'Waptrackers',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('waptracker/edit', {
          title : 'Waptrackers',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/waptrackers/:waptrackerId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.waptracker);
        res.locals.waptracker.save(function(err) {
          if (err) {
            console.error(err);
            res.render('waptracker/edit');
          } else {
            res.redirect('/waptrackers');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.waptracker);
        res.locals.waptracker.save( function(err) {
          if (err) {
            console.error(err);
              res.render('waptracker/edit');
          } else {
          res.redirect('/waptrackers');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//waptrackers');
      }
    });
  });

  app.get('/waptrackers/:waptrackerId/detail', function(req, res) {
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
        res.render('waptracker/detail');
      }
    });
  });

  app.get('/waptrackers/:waptrackerId/delete', function(req, res) {
    res.render('waptracker/delete');
  });

  app.post('/waptrackers/:waptrackerId/delete', function(req, res) {
    Waptracker.remove({ _id : req.params.waptrackerId }, function(err) {
      res.redirect('/waptrackers');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Waptracker',
  route : '/waptrackers'
}
