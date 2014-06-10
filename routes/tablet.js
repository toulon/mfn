var Tablet = require('../models/tablet'),
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
        curdate: fields.date ({      label: 'Curdate'
    }),
        location: fields.string ({      label: 'Location'
    }),
        status: fields.string ({      label: 'Status'
    }),
  })
  var page_title = "All Tablets"
  app.param('tabletId', function(req, res, next, id) {
    Tablet.findById(id, function(err, tablet) {
      if (err) {
        next(err);
      } else {
        res.locals.tablet = tablet;
        next();
      }
    });
  });
  
  app.get('/tablets', function(req, res) {
    Tablet.find({}, function(err, tablets) {
      res.render('tablet/index', { tablets : tablets });
    });
  });

  app.get('/tablets/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('tablet/create', {
          title : 'Tablets',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/tablets/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var tablet = Tablet(form.data);
        tablet.save(function(err) {
          if (err) {
            console.error(err);
            res.render('tablet/create')
          } else {
            res.redirect('/tablets');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var tablet = Tablet(form.data);
        tablet.save(function(err) {
          if (err) {
            console.error(err);
            res.render('tablet/create')
          } else {
            res.redirect('/tablets');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/tablets');
      }
    });
  });

  app.get('/tablets/:tabletId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.tablet);
    reg_form.handle(res.locals.tablet, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('tablet/edit', {
          title : 'Tablets',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('tablet/edit', {
          title : 'Tablets',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/tablets/:tabletId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.tablet);
        res.locals.tablet.save(function(err) {
          if (err) {
            console.error(err);
            res.render('tablet/edit');
          } else {
            res.redirect('/tablets');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.tablet);
        res.locals.tablet.save( function(err) {
          if (err) {
            console.error(err);
              res.render('tablet/edit');
          } else {
          res.redirect('/tablets');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//tablets');
      }
    });
  });

  app.get('/tablets/:tabletId/detail', function(req, res) {
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
        res.render('tablet/detail');
      }
    });
  });

  app.get('/tablets/:tabletId/delete', function(req, res) {
    res.render('tablet/delete');
  });

  app.post('/tablets/:tabletId/delete', function(req, res) {
    Tablet.remove({ _id : req.params.tabletId }, function(err) {
      res.redirect('/tablets');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Tablet',
  route : '/tablets'
}
