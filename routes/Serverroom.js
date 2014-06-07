var Serverroom = require('../models/Serverroom'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        ServerName: fields.string ({      label: 'Servername'
    }),
        Location: fields.string ({      label: 'Location'
    }),
        Port: fields.string ({      label: 'Port'
    }),
        SwitchPort: fields.string ({      label: 'Switchport'
    }),
        vlan: fields.string ({      label: 'Vlan'
    }),
        IPAddress: fields.string ({      label: 'Ipaddress'
    }),
        Switch: fields.string ({      label: 'Switch'
    }),
        SwPort: fields.string ({      label: 'Swport'
    }),
        OS: fields.string ({      label: 'Os'
    }),
        Notes: fields.string ({      label: 'Notes'
    }),
  })
  var page_title = "All Serverrooms"
  app.param('ServerroomId', function(req, res, next, id) {
    Serverroom.findById(id, function(err, Serverroom) {
      if (err) {
        next(err);
      } else {
        res.locals.Serverroom = Serverroom;
        next();
      }
    });
  });
  
  app.get('/Serverrooms', function(req, res) {
    Serverroom.find({}, function(err, Serverrooms) {
      res.render('Serverroom/index', { Serverrooms : Serverrooms });
    });
  });

  app.get('/Serverrooms/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('Serverroom/create', {
          title : 'Serverrooms',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/Serverrooms/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var Serverroom = Serverroom(form.data);
        Serverroom.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Serverroom/create')
          } else {
            res.redirect('/Serverrooms');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var Serverroom = Serverroom(form.data);
        Serverroom.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Serverroom/create')
          } else {
            res.redirect('/Serverrooms');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/Serverrooms');
      }
    });
  });

  app.get('/Serverrooms/:ServerroomId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.Serverroom);
    reg_form.handle(res.locals.Serverroom, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('Serverroom/edit', {
          title : 'Serverrooms',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('Serverroom/edit', {
          title : 'Serverrooms',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/Serverrooms/:ServerroomId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.Serverroom);
        res.locals.Serverroom.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Serverroom/edit');
          } else {
            res.redirect('/Serverrooms');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.Serverroom);
        res.locals.Serverroom.save( function(err) {
          if (err) {
            console.error(err);
              res.render('Serverroom/edit');
          } else {
          res.redirect('/Serverrooms');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//Serverrooms');
      }
    });
  });

  app.get('/Serverrooms/:ServerroomId/detail', function(req, res) {
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
        res.render('Serverroom/detail');
      }
    });
  });

  app.get('/Serverrooms/:ServerroomId/delete', function(req, res) {
    res.render('Serverroom/delete');
  });

  app.post('/Serverrooms/:ServerroomId/delete', function(req, res) {
    Serverroom.remove({ _id : req.params.ServerroomId }, function(err) {
      res.redirect('/Serverrooms');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Serverroom',
  route : '/Serverrooms'
}
