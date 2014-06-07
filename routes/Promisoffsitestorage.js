var Promisoffsitestorage = require('../models/Promisoffsitestorage'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        label: fields.string ({      label: 'Label'
    }),
        description: fields.string ({      label: 'Description'
    }),
  })
  var page_title = "All Promisoffsitestorages"
  app.param('PromisoffsitestorageId', function(req, res, next, id) {
    Promisoffsitestorage.findById(id, function(err, Promisoffsitestorage) {
      if (err) {
        next(err);
      } else {
        res.locals.Promisoffsitestorage = Promisoffsitestorage;
        next();
      }
    });
  });
  
  app.get('/Promisoffsitestorages', function(req, res) {
    Promisoffsitestorage.find({}, function(err, Promisoffsitestorages) {
      res.render('Promisoffsitestorage/index', { Promisoffsitestorages : Promisoffsitestorages });
    });
  });

  app.get('/Promisoffsitestorages/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('Promisoffsitestorage/create', {
          title : 'Promisoffsitestorages',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/Promisoffsitestorages/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var Promisoffsitestorage = Promisoffsitestorage(form.data);
        Promisoffsitestorage.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promisoffsitestorage/create')
          } else {
            res.redirect('/Promisoffsitestorages');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var Promisoffsitestorage = Promisoffsitestorage(form.data);
        Promisoffsitestorage.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promisoffsitestorage/create')
          } else {
            res.redirect('/Promisoffsitestorages');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/Promisoffsitestorages');
      }
    });
  });

  app.get('/Promisoffsitestorages/:PromisoffsitestorageId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.Promisoffsitestorage);
    reg_form.handle(res.locals.Promisoffsitestorage, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('Promisoffsitestorage/edit', {
          title : 'Promisoffsitestorages',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('Promisoffsitestorage/edit', {
          title : 'Promisoffsitestorages',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/Promisoffsitestorages/:PromisoffsitestorageId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.Promisoffsitestorage);
        res.locals.Promisoffsitestorage.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promisoffsitestorage/edit');
          } else {
            res.redirect('/Promisoffsitestorages');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.Promisoffsitestorage);
        res.locals.Promisoffsitestorage.save( function(err) {
          if (err) {
            console.error(err);
              res.render('Promisoffsitestorage/edit');
          } else {
          res.redirect('/Promisoffsitestorages');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//Promisoffsitestorages');
      }
    });
  });

  app.get('/Promisoffsitestorages/:PromisoffsitestorageId/detail', function(req, res) {
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
        res.render('Promisoffsitestorage/detail');
      }
    });
  });

  app.get('/Promisoffsitestorages/:PromisoffsitestorageId/delete', function(req, res) {
    res.render('Promisoffsitestorage/delete');
  });

  app.post('/Promisoffsitestorages/:PromisoffsitestorageId/delete', function(req, res) {
    Promisoffsitestorage.remove({ _id : req.params.PromisoffsitestorageId }, function(err) {
      res.redirect('/Promisoffsitestorages');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Promisoffsitestorage',
  route : '/Promisoffsitestorages'
}
