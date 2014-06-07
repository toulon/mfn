var Ipmaster = require('../models/ipmaster'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        ip: fields.string ({      label: 'Ip'
    }),
        hostname: fields.string ({      label: 'Hostname'
    }),
        location: fields.string ({      label: 'Location'
    }),
        purpose: fields.string ({      label: 'Purpose'
    }),
        notes: fields.string ({      label: 'Notes'
    }),
        username: fields.string ({      label: 'Username'
    }),
        password: fields.string ({      label: 'Password'
    }),
  })
  var page_title = "All Ipmasters"
  app.param('ipmasterId', function(req, res, next, id) {
    Ipmaster.findById(id, function(err, ipmaster) {
      if (err) {
        next(err);
      } else {
        res.locals.ipmaster = ipmaster;
        next();
      }
    });
  });
  
  app.get('/ipmasters', function(req, res) {
    Ipmaster.find({}, function(err, ipmasters) {
      res.render('ipmaster/index', { ipmasters : ipmasters });
    });
  });

  app.get('/ipmasters/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('ipmaster/create', {
          title : 'Ipmasters',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/ipmasters/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var ipmaster = Ipmaster(form.data);
        ipmaster.save(function(err) {
          if (err) {
            console.error(err);
            res.render('ipmaster/create')
          } else {
            res.redirect('/ipmasters');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var ipmaster = Ipmaster(form.data);
        ipmaster.save(function(err) {
          if (err) {
            console.error(err);
            res.render('ipmaster/create')
          } else {
            res.redirect('/ipmasters');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/ipmasters');
      }
    });
  });

  app.get('/ipmasters/:ipmasterId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.ipmaster);
    reg_form.handle(res.locals.ipmaster, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('ipmaster/edit', {
          title : 'Ipmasters',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('ipmaster/edit', {
          title : 'Ipmasters',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/ipmasters/:ipmasterId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.ipmaster);
        res.locals.ipmaster.save(function(err) {
          if (err) {
            console.error(err);
            res.render('ipmaster/edit');
          } else {
            res.redirect('/ipmasters');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.ipmaster);
        res.locals.ipmaster.save( function(err) {
          if (err) {
            console.error(err);
              res.render('ipmaster/edit');
          } else {
          res.redirect('/ipmasters');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//ipmasters');
      }
    });
  });

  app.get('/ipmasters/:ipmasterId/detail', function(req, res) {
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
        res.render('ipmaster/detail');
      }
    });
  });

  app.get('/ipmasters/:ipmasterId/delete', function(req, res) {
    res.render('ipmaster/delete');
  });

  app.post('/ipmasters/:ipmasterId/delete', function(req, res) {
    Ipmaster.remove({ _id : req.params.ipmasterId }, function(err) {
      res.redirect('/ipmasters');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Ipmaster',
  route : '/ipmasters'
}
