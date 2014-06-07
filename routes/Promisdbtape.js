var Promisdbtape = require('../models/Promisdbtape'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        backupDay: fields.number ({      label: 'Backupday'
    }),
        casseteSlot: fields.string ({      label: 'Casseteslot'
    }),
        rotation: fields.date ({      label: 'Rotation'
    }),
        label: fields.string ({      label: 'Label'
    }),
  })
  var page_title = "All Promisdbtapes"
  app.param('PromisdbtapeId', function(req, res, next, id) {
    Promisdbtape.findById(id, function(err, Promisdbtape) {
      if (err) {
        next(err);
      } else {
        res.locals.Promisdbtape = Promisdbtape;
        next();
      }
    });
  });
  
  app.get('/Promisdbtapes', function(req, res) {
    Promisdbtape.find({}, function(err, Promisdbtapes) {
      res.render('Promisdbtape/index', { Promisdbtapes : Promisdbtapes });
    });
  });

  app.get('/Promisdbtapes/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('Promisdbtape/create', {
          title : 'Promisdbtapes',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/Promisdbtapes/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var Promisdbtape = Promisdbtape(form.data);
        Promisdbtape.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promisdbtape/create')
          } else {
            res.redirect('/Promisdbtapes');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var Promisdbtape = Promisdbtape(form.data);
        Promisdbtape.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promisdbtape/create')
          } else {
            res.redirect('/Promisdbtapes');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/Promisdbtapes');
      }
    });
  });

  app.get('/Promisdbtapes/:PromisdbtapeId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.Promisdbtape);
    reg_form.handle(res.locals.Promisdbtape, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('Promisdbtape/edit', {
          title : 'Promisdbtapes',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('Promisdbtape/edit', {
          title : 'Promisdbtapes',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/Promisdbtapes/:PromisdbtapeId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.Promisdbtape);
        res.locals.Promisdbtape.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promisdbtape/edit');
          } else {
            res.redirect('/Promisdbtapes');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.Promisdbtape);
        res.locals.Promisdbtape.save( function(err) {
          if (err) {
            console.error(err);
              res.render('Promisdbtape/edit');
          } else {
          res.redirect('/Promisdbtapes');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//Promisdbtapes');
      }
    });
  });

  app.get('/Promisdbtapes/:PromisdbtapeId/detail', function(req, res) {
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
        res.render('Promisdbtape/detail');
      }
    });
  });

  app.get('/Promisdbtapes/:PromisdbtapeId/delete', function(req, res) {
    res.render('Promisdbtape/delete');
  });

  app.post('/Promisdbtapes/:PromisdbtapeId/delete', function(req, res) {
    Promisdbtape.remove({ _id : req.params.PromisdbtapeId }, function(err) {
      res.redirect('/Promisdbtapes');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Promisdbtape',
  route : '/Promisdbtapes'
}
