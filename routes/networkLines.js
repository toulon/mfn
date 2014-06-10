var Networklines = require('../models/networkLines'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        itTicket: fields.string ({      label: 'Itticket'
    }),
        nbrLines: fields.string ({      label: 'Nbrlines'
    }),
        location: fields.string ({      label: 'Location'
    }),
        requester: fields.string ({      label: 'Requester'
    }),
        description: fields.string ({      label: 'Description'
    }),
        notes: fields.string ({      label: 'Notes'
    }),
        completedDate: fields.date ({      label: 'Completeddate'
    }),
  })
  var page_title = "All Networklines"
  app.param('networkLinesId', function(req, res, next, id) {
    Networklines.findById(id, function(err, networkLines) {
      if (err) {
        next(err);
      } else {
        res.locals.networkLines = networkLines;
        next();
      }
    });
  });
  
  app.get('/networkLines', function(req, res) {
    Networklines.find({}, function(err, networkLines) {
      res.render('networkLines/index', { networkLines : networkLines });
    });
  });

  app.get('/networkLines/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('networkLines/create', {
          title : 'Networklines',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/networkLines/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var networkLines = Networklines(form.data);
        networkLines.save(function(err) {
          if (err) {
            console.error(err);
            res.render('networkLines/create')
          } else {
            res.redirect('/networkLines');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var networkLines = Networklines(form.data);
        networkLines.save(function(err) {
          if (err) {
            console.error(err);
            res.render('networkLines/create')
          } else {
            res.redirect('/networkLines');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/networkLines');
      }
    });
  });

  app.get('/networkLines/:networkLinesId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.networkLines);
    reg_form.handle(res.locals.networkLines, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('networkLines/edit', {
          title : 'Networklines',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('networkLines/edit', {
          title : 'Networklines',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/networkLines/:networkLinesId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.networkLines);
        res.locals.networkLines.save(function(err) {
          if (err) {
            console.error(err);
            res.render('networkLines/edit');
          } else {
            res.redirect('/networkLines');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.networkLines);
        res.locals.networkLines.save( function(err) {
          if (err) {
            console.error(err);
              res.render('networkLines/edit');
          } else {
          res.redirect('/networkLines');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//networkLines');
      }
    });
  });

  app.get('/networkLines/:networkLinesId/detail', function(req, res) {
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
        res.render('networkLines/detail');
      }
    });
  });

  app.get('/networkLines/:networkLinesId/delete', function(req, res) {
    res.render('networkLines/delete');
  });

  app.post('/networkLines/:networkLinesId/delete', function(req, res) {
    Networklines.remove({ _id : req.params.networkLinesId }, function(err) {
      res.redirect('/networkLines');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Networklines',
  route : '/networkLines'
}
