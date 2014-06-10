var Wap = require('../models/wap'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        serial: fields.string ({      label: 'Serial'
    }),
        mac: fields.string ({      label: 'Mac'
    }),
        model: fields.string ({      label: 'Model'
    }),
        label: fields.string ({      label: 'Label'
    }),
        location: fields.string ({      label: 'Location'
    }),
        note: fields.string ({      label: 'Note'
    }),
  })
  var page_title = "All Waps"
  app.param('wapId', function(req, res, next, id) {
    Wap.findById(id, function(err, wap) {
      if (err) {
        next(err);
      } else {
        res.locals.wap = wap;
        next();
      }
    });
  });
  
  app.get('/waps', function(req, res) {
    Wap.find({}, function(err, waps) {
      res.render('wap/index', { waps : waps });
    });
  });

  app.get('/waps/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('wap/create', {
          title : 'Waps',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/waps/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var wap = Wap(form.data);
        wap.save(function(err) {
          if (err) {
            console.error(err);
            res.render('wap/create')
          } else {
            res.redirect('/waps');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var wap = Wap(form.data);
        wap.save(function(err) {
          if (err) {
            console.error(err);
            res.render('wap/create')
          } else {
            res.redirect('/waps');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/waps');
      }
    });
  });

  app.get('/waps/:wapId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.wap);
    reg_form.handle(res.locals.wap, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('wap/edit', {
          title : 'Waps',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('wap/edit', {
          title : 'Waps',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/waps/:wapId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.wap);
        res.locals.wap.save(function(err) {
          if (err) {
            console.error(err);
            res.render('wap/edit');
          } else {
            res.redirect('/waps');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.wap);
        res.locals.wap.save( function(err) {
          if (err) {
            console.error(err);
              res.render('wap/edit');
          } else {
          res.redirect('/waps');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//waps');
      }
    });
  });

  app.get('/waps/:wapId/detail', function(req, res) {
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
        res.render('wap/detail');
      }
    });
  });

  app.get('/waps/:wapId/delete', function(req, res) {
    res.render('wap/delete');
  });

  app.post('/waps/:wapId/delete', function(req, res) {
    Wap.remove({ _id : req.params.wapId }, function(err) {
      res.redirect('/waps');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Wap',
  route : '/waps'
}
