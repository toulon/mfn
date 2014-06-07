var Harddrive = require('../models/harddrive'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        Server: fields.string ({      label: 'Server'
    }),
        ODModel: fields.string ({      label: 'Odmodel'
    }),
        ODSerial: fields.string ({      label: 'Odserial'
    }),
        ODPartNbr: fields.string ({      label: 'Odpartnbr'
    }),
        NDModel: fields.string ({      label: 'Ndmodel'
    }),
        NDSerial: fields.string ({      label: 'Ndserial'
    }),
        NDPartNbr: fields.string ({      label: 'Ndpartnbr'
    }),
        trnDate: fields.date ({      label: 'Trndate'
    }),
        DLocation: fields.string ({      label: 'Dlocation'
    }),
        Note: fields.string ({      label: 'Note'
    }),
  })
  var page_title = "All Harddrives"
  app.param('harddriveId', function(req, res, next, id) {
    Harddrive.findById(id, function(err, harddrive) {
      if (err) {
        next(err);
      } else {
        res.locals.harddrive = harddrive;
        next();
      }
    });
  });
  
  app.get('/harddrives', function(req, res) {
    Harddrive.find({}, function(err, harddrives) {
      res.render('harddrive/index', { harddrives : harddrives });
    });
  });

  app.get('/harddrives/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('harddrive/create', {
          title : 'Harddrives',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/harddrives/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var harddrive = Harddrive(form.data);
        harddrive.save(function(err) {
          if (err) {
            console.error(err);
            res.render('harddrive/create')
          } else {
            res.redirect('/harddrives');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var harddrive = Harddrive(form.data);
        harddrive.save(function(err) {
          if (err) {
            console.error(err);
            res.render('harddrive/create')
          } else {
            res.redirect('/harddrives');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/harddrives');
      }
    });
  });

  app.get('/harddrives/:harddriveId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.harddrive);
    reg_form.handle(res.locals.harddrive, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('harddrive/edit', {
          title : 'Harddrives',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('harddrive/edit', {
          title : 'Harddrives',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/harddrives/:harddriveId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.harddrive);
        res.locals.harddrive.save(function(err) {
          if (err) {
            console.error(err);
            res.render('harddrive/edit');
          } else {
            res.redirect('/harddrives');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.harddrive);
        res.locals.harddrive.save( function(err) {
          if (err) {
            console.error(err);
              res.render('harddrive/edit');
          } else {
          res.redirect('/harddrives');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//harddrives');
      }
    });
  });

  app.get('/harddrives/:harddriveId/detail', function(req, res) {
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
        res.render('harddrive/detail');
      }
    });
  });

  app.get('/harddrives/:harddriveId/delete', function(req, res) {
    res.render('harddrive/delete');
  });

  app.post('/harddrives/:harddriveId/delete', function(req, res) {
    Harddrive.remove({ _id : req.params.harddriveId }, function(err) {
      res.redirect('/harddrives');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Harddrive',
  route : '/harddrives'
}
