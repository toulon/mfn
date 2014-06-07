var Replacment_equipment = require('../models/Replacment_equipment'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        serial: fields.string ({      label: 'Serial'
    }),
        partnbr: fields.string ({      label: 'Partnbr'
    }),
        description: fields.string ({      label: 'Description'
    }),
  })
  var page_title = "All Replacment_equipments"
  app.param('Replacment_equipmentId', function(req, res, next, id) {
    Replacment_equipment.findById(id, function(err, Replacment_equipment) {
      if (err) {
        next(err);
      } else {
        res.locals.Replacment_equipment = Replacment_equipment;
        next();
      }
    });
  });
  
  app.get('/Replacment_equipments', function(req, res) {
    Replacment_equipment.find({}, function(err, Replacment_equipments) {
      res.render('Replacment_equipment/index', { Replacment_equipments : Replacment_equipments });
    });
  });

  app.get('/Replacment_equipments/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('Replacment_equipment/create', {
          title : 'Replacment_equipments',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/Replacment_equipments/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var Replacment_equipment = Replacment_equipment(form.data);
        Replacment_equipment.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Replacment_equipment/create')
          } else {
            res.redirect('/Replacment_equipments');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var Replacment_equipment = Replacment_equipment(form.data);
        Replacment_equipment.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Replacment_equipment/create')
          } else {
            res.redirect('/Replacment_equipments');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/Replacment_equipments');
      }
    });
  });

  app.get('/Replacment_equipments/:Replacment_equipmentId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.Replacment_equipment);
    reg_form.handle(res.locals.Replacment_equipment, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('Replacment_equipment/edit', {
          title : 'Replacment_equipments',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('Replacment_equipment/edit', {
          title : 'Replacment_equipments',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/Replacment_equipments/:Replacment_equipmentId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.Replacment_equipment);
        res.locals.Replacment_equipment.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Replacment_equipment/edit');
          } else {
            res.redirect('/Replacment_equipments');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.Replacment_equipment);
        res.locals.Replacment_equipment.save( function(err) {
          if (err) {
            console.error(err);
              res.render('Replacment_equipment/edit');
          } else {
          res.redirect('/Replacment_equipments');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//Replacment_equipments');
      }
    });
  });

  app.get('/Replacment_equipments/:Replacment_equipmentId/detail', function(req, res) {
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
        res.render('Replacment_equipment/detail');
      }
    });
  });

  app.get('/Replacment_equipments/:Replacment_equipmentId/delete', function(req, res) {
    res.render('Replacment_equipment/delete');
  });

  app.post('/Replacment_equipments/:Replacment_equipmentId/delete', function(req, res) {
    Replacment_equipment.remove({ _id : req.params.Replacment_equipmentId }, function(err) {
      res.redirect('/Replacment_equipments');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Replacment_equipment',
  route : '/Replacment_equipments'
}
