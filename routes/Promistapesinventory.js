var Promistapesinventory = require('../models/Promistapesinventory'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        Database: fields.boolean ({      label: 'Database'
    }),
        OS: fields.string ({      label: 'Os'
    }),
  })
  var page_title = "All Promistapesinventories"
  app.param('PromistapesinventoryId', function(req, res, next, id) {
    Promistapesinventory.findById(id, function(err, Promistapesinventory) {
      if (err) {
        next(err);
      } else {
        res.locals.Promistapesinventory = Promistapesinventory;
        next();
      }
    });
  });
  
  app.get('/Promistapesinventories', function(req, res) {
    Promistapesinventory.find({}, function(err, Promistapesinventories) {
      res.render('Promistapesinventory/index', { Promistapesinventories : Promistapesinventories });
    });
  });

  app.get('/Promistapesinventories/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('Promistapesinventory/create', {
          title : 'Promistapesinventories',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/Promistapesinventories/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var Promistapesinventory = Promistapesinventory(form.data);
        Promistapesinventory.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promistapesinventory/create')
          } else {
            res.redirect('/Promistapesinventories');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var Promistapesinventory = Promistapesinventory(form.data);
        Promistapesinventory.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promistapesinventory/create')
          } else {
            res.redirect('/Promistapesinventories');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/Promistapesinventories');
      }
    });
  });

  app.get('/Promistapesinventories/:PromistapesinventoryId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.Promistapesinventory);
    reg_form.handle(res.locals.Promistapesinventory, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('Promistapesinventory/edit', {
          title : 'Promistapesinventories',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('Promistapesinventory/edit', {
          title : 'Promistapesinventories',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/Promistapesinventories/:PromistapesinventoryId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.Promistapesinventory);
        res.locals.Promistapesinventory.save(function(err) {
          if (err) {
            console.error(err);
            res.render('Promistapesinventory/edit');
          } else {
            res.redirect('/Promistapesinventories');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.Promistapesinventory);
        res.locals.Promistapesinventory.save( function(err) {
          if (err) {
            console.error(err);
              res.render('Promistapesinventory/edit');
          } else {
          res.redirect('/Promistapesinventories');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//Promistapesinventories');
      }
    });
  });

  app.get('/Promistapesinventories/:PromistapesinventoryId/detail', function(req, res) {
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
        res.render('Promistapesinventory/detail');
      }
    });
  });

  app.get('/Promistapesinventories/:PromistapesinventoryId/delete', function(req, res) {
    res.render('Promistapesinventory/delete');
  });

  app.post('/Promistapesinventories/:PromistapesinventoryId/delete', function(req, res) {
    Promistapesinventory.remove({ _id : req.params.PromistapesinventoryId }, function(err) {
      res.redirect('/Promistapesinventories');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Promistapesinventory',
  route : '/Promistapesinventories'
}
