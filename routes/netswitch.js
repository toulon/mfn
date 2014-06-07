var Netswitch = require('../models/netswitch'),
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
        serial: fields.string ({      label: 'Serial'
    }),
        model: fields.string ({      label: 'Model'
    }),
        location: fields.string ({      label: 'Location'
    }),
        name: fields.string ({      label: 'Name'
    }),
        prodnbr: fields.string ({      label: 'Prodnbr'
    }),
        mac: fields.string ({      label: 'Mac'
    }),
  })
  var page_title = "All Netswitches"
  app.param('netswitchId', function(req, res, next, id) {
    Netswitch.findById(id, function(err, netswitch) {
      if (err) {
        next(err);
      } else {
        res.locals.netswitch = netswitch;
        next();
      }
    });
  });
  
  app.get('/netswitches', function(req, res) {
    Netswitch.find({}, function(err, netswitches) {
      res.render('netswitch/index', { netswitches : netswitches });
    });
  });

  app.get('/netswitches/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('netswitch/create', {
          title : 'Netswitches',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/netswitches/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var netswitch = Netswitch(form.data);
        netswitch.save(function(err) {
          if (err) {
            console.error(err);
            res.render('netswitch/create')
          } else {
            res.redirect('/netswitches');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var netswitch = Netswitch(form.data);
        netswitch.save(function(err) {
          if (err) {
            console.error(err);
            res.render('netswitch/create')
          } else {
            res.redirect('/netswitches');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/netswitches');
      }
    });
  });

  app.get('/netswitches/:netswitchId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.netswitch);
    reg_form.handle(res.locals.netswitch, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('netswitch/edit', {
          title : 'Netswitches',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('netswitch/edit', {
          title : 'Netswitches',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/netswitches/:netswitchId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.netswitch);
        res.locals.netswitch.save(function(err) {
          if (err) {
            console.error(err);
            res.render('netswitch/edit');
          } else {
            res.redirect('/netswitches');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.netswitch);
        res.locals.netswitch.save( function(err) {
          if (err) {
            console.error(err);
              res.render('netswitch/edit');
          } else {
          res.redirect('/netswitches');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//netswitches');
      }
    });
  });

  app.get('/netswitches/:netswitchId/detail', function(req, res) {
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
        res.render('netswitch/detail');
      }
    });
  });

  app.get('/netswitches/:netswitchId/delete', function(req, res) {
    res.render('netswitch/delete');
  });

  app.post('/netswitches/:netswitchId/delete', function(req, res) {
    Netswitch.remove({ _id : req.params.netswitchId }, function(err) {
      res.redirect('/netswitches');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Netswitch',
  route : '/netswitches'
}
