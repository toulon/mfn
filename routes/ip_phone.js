var Ip_phone = require('../models/ip_phone'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        mac: fields.string ({      label: 'Mac'
    }),
        model: fields.string ({      label: 'Model'
    }),
        part_nbr: fields.string ({      label: 'Part_nbr'
    }),
        extention: fields.string ({      label: 'Extention'
    }),
        location: fields.string ({      label: 'Location'
    }),
        label: fields.string ({      label: 'Label'
    }),
        deployed: fields.boolean ({      label: 'Deployed'
    }),
        note: fields.string ({      label: 'Note'
    }),
  })
  var page_title = "All Ip_phones"
  app.param('ip_phoneId', function(req, res, next, id) {
    Ip_phone.findById(id, function(err, ip_phone) {
      if (err) {
        next(err);
      } else {
        res.locals.ip_phone = ip_phone;
        next();
      }
    });
  });
  
  app.get('/ip_phones', function(req, res) {
    Ip_phone.find({}, function(err, ip_phones) {
      res.render('ip_phone/index', { ip_phones : ip_phones });
    });
  });

  app.get('/ip_phones/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('ip_phone/create', {
          title : 'Ip_phones',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/ip_phones/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var ip_phone = Ip_phone(form.data);
        ip_phone.save(function(err) {
          if (err) {
            console.error(err);
            res.render('ip_phone/create')
          } else {
            res.redirect('/ip_phones');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var ip_phone = Ip_phone(form.data);
        ip_phone.save(function(err) {
          if (err) {
            console.error(err);
            res.render('ip_phone/create')
          } else {
            res.redirect('/ip_phones');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/ip_phones');
      }
    });
  });

  app.get('/ip_phones/:ip_phoneId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.ip_phone);
    reg_form.handle(res.locals.ip_phone, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('ip_phone/edit', {
          title : 'Ip_phones',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('ip_phone/edit', {
          title : 'Ip_phones',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/ip_phones/:ip_phoneId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.ip_phone);
        res.locals.ip_phone.save(function(err) {
          if (err) {
            console.error(err);
            res.render('ip_phone/edit');
          } else {
            res.redirect('/ip_phones');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.ip_phone);
        res.locals.ip_phone.save( function(err) {
          if (err) {
            console.error(err);
              res.render('ip_phone/edit');
          } else {
          res.redirect('/ip_phones');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//ip_phones');
      }
    });
  });

  app.get('/ip_phones/:ip_phoneId/detail', function(req, res) {
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
        res.render('ip_phone/detail');
      }
    });
  });

  app.get('/ip_phones/:ip_phoneId/delete', function(req, res) {
    res.render('ip_phone/delete');
  });

  app.post('/ip_phones/:ip_phoneId/delete', function(req, res) {
    Ip_phone.remove({ _id : req.params.ip_phoneId }, function(err) {
      res.redirect('/ip_phones');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Ip_phone',
  route : '/ip_phones'
}
