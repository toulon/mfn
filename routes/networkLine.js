var Networkline = require('../models/networkLine'),
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
        fcTicket: fields.string ({      label: 'Fcticket'
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
  app.param('networkLineId', function(req, res, next, id) {
    Networkline.findById(id, function(err, networkLine) {
      if (err) {
        next(err);
      } else {
        res.locals.networkLine = networkLine;
        next();
      }
    });
  });
  
  app.get('/networkLines', function(req, res) {
    Networkline.find({}, function(err, networkLines) {
      res.render('networkLine/index', { networkLines : networkLines });
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
        res.render('networkLine/create', {
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
        var networkLine = Networkline(form.data);
        networkLine.save(function(err) {
          if (err) {
            console.error(err);
            res.render('networkLine/create')
          } else {
            res.redirect('/networkLines');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var networkLine = Networkline(form.data);
        networkLine.save(function(err) {
          if (err) {
            console.error(err);
            res.render('networkLine/create')
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

  app.get('/networkLines/:networkLineId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.networkLine);
    reg_form.handle(res.locals.networkLine, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('networkLine/edit', {
          title : 'Networklines',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('networkLine/edit', {
          title : 'Networklines',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/networkLines/:networkLineId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.networkLine);
        res.locals.networkLine.save(function(err) {
          if (err) {
            console.error(err);
            res.render('networkLine/edit');
          } else {
            res.redirect('/networkLines');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.networkLine);
        res.locals.networkLine.save( function(err) {
          if (err) {
            console.error(err);
              res.render('networkLine/edit');
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

  app.get('/networkLines/:networkLineId/detail', function(req, res) {
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
        res.render('networkLine/detail');
      }
    });
  });

  app.get('/networkLines/:networkLineId/delete', function(req, res) {
    res.render('networkLine/delete');
  });

  app.post('/networkLines/:networkLineId/delete', function(req, res) {
    Networkline.remove({ _id : req.params.networkLineId }, function(err) {
      res.redirect('/networkLines');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Networkline',
  route : '/networkLines'
}
