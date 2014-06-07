var Promisostape = require('../models/Promisostape'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        backupWeek: fields.number ({      label: 'Backupweek'
    }),
        casseteSlot: fields.string ({      label: 'Casseteslot'
    }),
        rotation: fields.date ({      label: 'Rotation'
    }),
        label: fields.string ({      label: 'Label'
    }),
  })
  var page_title = "All Promisostapes"
  app.param('PromisostapeId', function(req, res, next, id) {
    Promisostape.findById(id, function(err, Promisostape) {
      if (err) {
        next(err);
      } else {
        res.locals.Promisostape = Promisostape;
        next();
      }
    });
  });
  
  app.get('/Promisostapes', function(req, res) {
    Promisostape.find({}, function(err, Promisostapes) {
      res.render('Promisostape/index', { Promisostapes : Promisostapes });
    });
  });

  app.get('/Promisostapes/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('Promisostape/create', {
          title : 'Promisostapes',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/Promisostapes/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var Promisostape = Promisostape(form.data);
        Promisostape.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promisostape/create')
          } else {
            res.redirect('/Promisostapes');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var Promisostape = Promisostape(form.data);
        Promisostape.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promisostape/create')
          } else {
            res.redirect('/Promisostapes');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/Promisostapes');
      }
    });
  });

  app.get('/Promisostapes/:PromisostapeId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.Promisostape);
    reg_form.handle(res.locals.Promisostape, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('Promisostape/edit', {
          title : 'Promisostapes',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('Promisostape/edit', {
          title : 'Promisostapes',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/Promisostapes/:PromisostapeId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.Promisostape);
        res.locals.Promisostape.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promisostape/edit');
          } else {
            res.redirect('/Promisostapes');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.Promisostape);
        res.locals.Promisostape.save( function(err) {
          if (err) {
            console.error(err);
              res.render('Promisostape/edit');
          } else {
          res.redirect('/Promisostapes');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//Promisostapes');
      }
    });
  });

  app.get('/Promisostapes/:PromisostapeId/detail', function(req, res) {
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
        res.render('Promisostape/detail');
      }
    });
  });

  app.get('/Promisostapes/:PromisostapeId/delete', function(req, res) {
    res.render('Promisostape/delete');
  });

  app.post('/Promisostapes/:PromisostapeId/delete', function(req, res) {
    Promisostape.remove({ _id : req.params.PromisostapeId }, function(err) {
      res.redirect('/Promisostapes');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Promisostape',
  route : '/Promisostapes'
}
