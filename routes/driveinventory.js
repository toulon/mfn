var Driveinventory = require('../models/driveinventory'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        Serial: fields.string ({      label: 'Serial'
    }),
        Model: fields.string ({      label: 'Model'
    }),
        Mfg: fields.string ({      label: 'Mfg'
    }),
        PartNbr: fields.string ({      label: 'Partnbr'
    }),
        Speed: fields.string ({      label: 'Speed'
    }),
        Size: fields.string ({      label: 'Size'
    }),
        Date: fields.date ({      label: 'Date'
    }),
        Description: fields.string ({      label: 'Description'
    }),
        Server: fields.string ({      label: 'Server'
    }),
        Location: fields.string ({      label: 'Location'
    }),
        Note: fields.string ({      label: 'Note'
    }),
  })
  var page_title = "All Driveinventories"
  app.param('driveinventoryId', function(req, res, next, id) {
    Driveinventory.findById(id, function(err, driveinventory) {
      if (err) {
        next(err);
      } else {
        res.locals.driveinventory = driveinventory;
        next();
      }
    });
  });
  
  app.get('/driveinventories', function(req, res) {
    Driveinventory.find({}, function(err, driveinventories) {
      res.render('driveinventory/index', { driveinventories : driveinventories });
    });
  });

  app.get('/driveinventories/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('driveinventory/create', {
          title : 'Driveinventories',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/driveinventories/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var driveinventory = Driveinventory(form.data);
        driveinventory.save(function(err) {
          if (err) {
            console.error(err);
            res.render('driveinventory/create')
          } else {
            res.redirect('/driveinventories');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var driveinventory = Driveinventory(form.data);
        driveinventory.save(function(err) {
          if (err) {
            console.error(err);
            res.render('driveinventory/create')
          } else {
            res.redirect('/driveinventories');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/driveinventories');
      }
    });
  });

  app.get('/driveinventories/:driveinventoryId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.driveinventory);
    reg_form.handle(res.locals.driveinventory, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('driveinventory/edit', {
          title : 'Driveinventories',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('driveinventory/edit', {
          title : 'Driveinventories',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/driveinventories/:driveinventoryId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.driveinventory);
        res.locals.driveinventory.save(function(err) {
          if (err) {
            console.error(err);
            res.render('driveinventory/edit');
          } else {
            res.redirect('/driveinventories');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.driveinventory);
        res.locals.driveinventory.save( function(err) {
          if (err) {
            console.error(err);
              res.render('driveinventory/edit');
          } else {
          res.redirect('/driveinventories');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//driveinventories');
      }
    });
  });

  app.get('/driveinventories/:driveinventoryId/detail', function(req, res) {
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
        res.render('driveinventory/detail');
      }
    });
  });

  app.get('/driveinventories/:driveinventoryId/delete', function(req, res) {
    res.render('driveinventory/delete');
  });

  app.post('/driveinventories/:driveinventoryId/delete', function(req, res) {
    Driveinventory.remove({ _id : req.params.driveinventoryId }, function(err) {
      res.redirect('/driveinventories');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Driveinventory',
  route : '/driveinventories'
}
