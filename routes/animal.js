var Animal = require('../models/animal'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        name: fields.string ({      label: 'Name'
    }),
        mamal: fields.boolean ({      label: 'Mamal'
    }),
        color: fields.string ({      label: 'Color'
    }),
        size: fields.string ({      label: 'Size'
    }),
        weigh: fields.string ({      label: 'Weigh'
    }),
        gender: fields.string ({      label: 'Gender'
    }),
  })
  var page_title = "All Animals"
  app.param('animalId', function(req, res, next, id) {
    Animal.findById(id, function(err, animal) {
      if (err) {
        next(err);
      } else {
        res.locals.animal = animal;
        next();
      }
    });
  });
  
  app.get('/animals', function(req, res) {
    Animal.find({}, function(err, animals) {
      res.render('animal/index', { animals : animals });
    });
  });

  app.get('/animals/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('animal/create', {
          title : 'Animals',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/animals/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var animal = Animal(form.data);
        animal.save(function(err) {
          if (err) {
            console.error(err);
            res.render('animal/create')
          } else {
            res.redirect('/animals');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var animal = Animal(form.data);
        animal.save(function(err) {
          if (err) {
            console.error(err);
            res.render('animal/create')
          } else {
            res.redirect('/animals');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/animals');
      }
    });
  });

  app.get('/animals/:animalId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.animal);
    reg_form.handle(res.locals.animal, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('animal/edit', {
          title : 'Animals',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('animal/edit', {
          title : 'Animals',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/animals/:animalId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.animal);
        res.locals.animal.save(function(err) {
          if (err) {
            console.error(err);
            res.render('animal/edit');
          } else {
            res.redirect('/animals');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.animal);
        res.locals.animal.save( function(err) {
          if (err) {
            console.error(err);
              res.render('animal/edit');
          } else {
          res.redirect('/animals');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//animals');
      }
    });
  });

  app.get('/animals/:animalId/detail', function(req, res) {
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
        res.render('animal/detail');
      }
    });
  });

  app.get('/animals/:animalId/delete', function(req, res) {
    res.render('animal/delete');
  });

  app.post('/animals/:animalId/delete', function(req, res) {
    Animal.remove({ _id : req.params.animalId }, function(err) {
      res.redirect('/animals');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Animal',
  route : '/animals'
}
