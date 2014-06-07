var Ip_0_241 = require('../models/ip_0_241'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        IP: fields.string ({      label: 'Ip'
    }),
        ifTypeIcon: fields.string ({      label: 'Iftypeicon'
    }),
        ifName: fields.string ({      label: 'Ifname'
    }),
        ifDescr: fields.string ({      label: 'Ifdescr'
    }),
        ifAlias: fields.string ({      label: 'Ifalias'
    }),
        ifAdminIcon: fields.string ({      label: 'Ifadminicon'
    }),
        ifOperIcon: fields.string ({      label: 'Ifopericon'
    }),
        MAC: fields.string ({      label: 'Mac'
    }),
        DNS: fields.string ({      label: 'Dns'
    }),
        VLANs: fields.string ({      label: 'Vlans'
    }),
        VLANforMAC: fields.string ({      label: 'Vlanformac'
    }),
        ifspeed: fields.string ({      label: 'Ifspeed'
    }),
        ifpype: fields.string ({      label: 'Ifpype'
    }),
        TrunkPort: fields.string ({      label: 'Trunkport'
    }),
  })
  var page_title = "All Ip_0_241s"
  app.param('ip_0_241Id', function(req, res, next, id) {
    Ip_0_241.findById(id, function(err, ip_0_241) {
      if (err) {
        next(err);
      } else {
        res.locals.ip_0_241 = ip_0_241;
        next();
      }
    });
  });
  
  app.get('/ip_0_241s', function(req, res) {
    Ip_0_241.find({}, function(err, ip_0_241s) {
      res.render('ip_0_241/index', { ip_0_241s : ip_0_241s });
    });
  });

  app.get('/ip_0_241s/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('ip_0_241/create', {
          title : 'Ip_0_241s',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/ip_0_241s/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var ip_0_241 = Ip_0_241(form.data);
        ip_0_241.save(function(err) {
          if (err) {
            console.error(err);
            res.render('ip_0_241/create')
          } else {
            res.redirect('/ip_0_241s');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var ip_0_241 = Ip_0_241(form.data);
        ip_0_241.save(function(err) {
          if (err) {
            console.error(err);
            res.render('ip_0_241/create')
          } else {
            res.redirect('/ip_0_241s');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/ip_0_241s');
      }
    });
  });

  app.get('/ip_0_241s/:ip_0_241Id/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.ip_0_241);
    reg_form.handle(res.locals.ip_0_241, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('ip_0_241/edit', {
          title : 'Ip_0_241s',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('ip_0_241/edit', {
          title : 'Ip_0_241s',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/ip_0_241s/:ip_0_241Id/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.ip_0_241);
        res.locals.ip_0_241.save(function(err) {
          if (err) {
            console.error(err);
            res.render('ip_0_241/edit');
          } else {
            res.redirect('/ip_0_241s');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.ip_0_241);
        res.locals.ip_0_241.save( function(err) {
          if (err) {
            console.error(err);
              res.render('ip_0_241/edit');
          } else {
          res.redirect('/ip_0_241s');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//ip_0_241s');
      }
    });
  });

  app.get('/ip_0_241s/:ip_0_241Id/detail', function(req, res) {
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
        res.render('ip_0_241/detail');
      }
    });
  });

  app.get('/ip_0_241s/:ip_0_241Id/delete', function(req, res) {
    res.render('ip_0_241/delete');
  });

  app.post('/ip_0_241s/:ip_0_241Id/delete', function(req, res) {
    Ip_0_241.remove({ _id : req.params.ip_0_241Id }, function(err) {
      res.redirect('/ip_0_241s');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Ip_0_241',
  route : '/ip_0_241s'
}
