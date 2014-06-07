var Eswitch = require('../models/eswitch'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        sname: fields.string ({      label: 'Sname'
    }),
        slocation: fields.string ({      label: 'Slocation'
    }),
        sip: fields.string ({      label: 'Sip'
    }),
        nagios: fields.boolean ({      label: 'Nagios'
    }),
  })
  var page_title = "All Eswitches"
  app.param('eswitchId', function(req, res, next, id) {
    Eswitch.findById(id, function(err, eswitch) {
      if (err) {
        next(err);
      } else {
        res.locals.eswitch = eswitch;
        next();
      }
    });
  });
  
  app.get('/eswitches', function(req, res) {
    Eswitch.find({}, function(err, eswitches) {
      res.render('eswitch/index', { eswitches : eswitches });
    });
  });

  app.get('/eswitches/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('eswitch/create', {
          title : 'Eswitches',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/eswitches/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var eswitch = Eswitch(form.data);
        eswitch.save(function(err) {
          if (err) {
            console.error(err);
            res.render('eswitch/create')
          } else {
            res.redirect('/eswitches');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var eswitch = Eswitch(form.data);
        eswitch.save(function(err) {
          if (err) {
            console.error(err);
            res.render('eswitch/create')
          } else {
            res.redirect('/eswitches');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/eswitches');
      }
    });
  });

  app.get('/eswitches/:eswitchId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.eswitch);
    reg_form.handle(res.locals.eswitch, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('eswitch/edit', {
          title : 'Eswitches',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('eswitch/edit', {
          title : 'Eswitches',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/eswitches/:eswitchId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.eswitch);
        res.locals.eswitch.save(function(err) {
          if (err) {
            console.error(err);
            res.render('eswitch/edit');
          } else {
            res.redirect('/eswitches');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.eswitch);
        res.locals.eswitch.save( function(err) {
          if (err) {
            console.error(err);
              res.render('eswitch/edit');
          } else {
          res.redirect('/eswitches');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//eswitches');
      }
    });
  });

  app.get('/eswitches/:eswitchId/detail', function(req, res) {
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
        res.render('eswitch/detail');
      }
    });
  });

  app.get('/eswitches/:eswitchId/delete', function(req, res) {
    res.render('eswitch/delete');
  });

  app.post('/eswitches/:eswitchId/delete', function(req, res) {
    Eswitch.remove({ _id : req.params.eswitchId }, function(err) {
      res.redirect('/eswitches');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Eswitch',
  route : '/eswitches'
}
