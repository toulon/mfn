var Oldswitch = require('../models/oldswitch'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        SwitchPort: fields.string ({      label: 'Switchport'
    }),
        Location: fields.string ({      label: 'Location'
    }),
        Patch: fields.string ({      label: 'Patch'
    }),
        IPAddress: fields.string ({      label: 'Ipaddress'
    }),
        Vlan: fields.string ({      label: 'Vlan'
    }),
        Port: fields.string ({      label: 'Port'
    }),
        Notes: fields.string ({      label: 'Notes'
    }),
  })
  var page_title = "All Oldswitches"
  app.param('oldswitchId', function(req, res, next, id) {
    Oldswitch.findById(id, function(err, oldswitch) {
      if (err) {
        next(err);
      } else {
        res.locals.oldswitch = oldswitch;
        next();
      }
    });
  });
  
  app.get('/oldswitches', function(req, res) {
    Oldswitch.find({}, function(err, oldswitches) {
      res.render('oldswitch/index', { oldswitches : oldswitches });
    });
  });

  app.get('/oldswitches/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('oldswitch/create', {
          title : 'Oldswitches',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/oldswitches/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var oldswitch = Oldswitch(form.data);
        oldswitch.save(function(err) {
          if (err) {
            console.error(err);
            res.render('oldswitch/create')
          } else {
            res.redirect('/oldswitches');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var oldswitch = Oldswitch(form.data);
        oldswitch.save(function(err) {
          if (err) {
            console.error(err);
            res.render('oldswitch/create')
          } else {
            res.redirect('/oldswitches');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/oldswitches');
      }
    });
  });

  app.get('/oldswitches/:oldswitchId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.oldswitch);
    reg_form.handle(res.locals.oldswitch, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('oldswitch/edit', {
          title : 'Oldswitches',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('oldswitch/edit', {
          title : 'Oldswitches',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/oldswitches/:oldswitchId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.oldswitch);
        res.locals.oldswitch.save(function(err) {
          if (err) {
            console.error(err);
            res.render('oldswitch/edit');
          } else {
            res.redirect('/oldswitches');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.oldswitch);
        res.locals.oldswitch.save( function(err) {
          if (err) {
            console.error(err);
              res.render('oldswitch/edit');
          } else {
          res.redirect('/oldswitches');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//oldswitches');
      }
    });
  });

  app.get('/oldswitches/:oldswitchId/detail', function(req, res) {
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
        res.render('oldswitch/detail');
      }
    });
  });

  app.get('/oldswitches/:oldswitchId/delete', function(req, res) {
    res.render('oldswitch/delete');
  });

  app.post('/oldswitches/:oldswitchId/delete', function(req, res) {
    Oldswitch.remove({ _id : req.params.oldswitchId }, function(err) {
      res.redirect('/oldswitches');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Oldswitch',
  route : '/oldswitches'
}
