var Mfntape = require('../models/mfntape'),
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
        action_date: fields.date ({      label: 'Action_date'
    }),
        action: fields.string ({      label: 'Action'
    }),
        location: fields.string ({      label: 'Location'
    }),
  })
  var page_title = "All Mfntapes",
      cnt = 1;

  app.get('/user', function(req, res){
    res.render('mfntape/joe');
  })

  function makeHandler(item) {
    console.log("stop 1")

    return function(req, res) {
      reg_form.handle(req, {
        success: function (form) {
          console.log("Post - Success")
          var mfntape = Mfntape(form.data);
          mfntape.save(function(err) {
            if (err) {
              console.error(err);
              res.render('mfntape/create')
            } else {
              res.redirect('/mfntapes');
            }
          });
        },
        other: function (form) {
          console.log("Post - Other")
          var mfntape = Mfntape(form.data);
          mfntape.save(function(err) {
            if (err) {
              console.error(err);
              res.render('mfntape/create')
            } else {
              res.redirect('/mfntapes');
            }
          });
        },
        empty: function (form) {
          console.log("Post - There was no form data in the request")
          res.redirect('/mfntapes');
        }
      });
    };
  }

  app.post('/mfntape/joe', function(req, res){
    res.send("Submitted Count: " + req.body.cnt);
    cnt = req.body.cnt;
    console.log("cnt = " + cnt);
    var item = '/mfntapes/create';
    for (var i = 0; i < cnt; i++) {
      //app.post(item, makeHandler(item));
      console.log("i = " + i);

      app.post('/mfntapes/create', function(req, res) {
        reg_form.handle(req, {
          success: function (form) {
            console.log("Post - Success")
            var mfntape = Mfntape(form.data);
            mfntape.save(function(err) {
              if (err) {
                console.error(err);
                res.render('mfntape/create')
              } else {
                res.redirect('/mfntapes');
              }
            });
          },
          other: function (form) {
            console.log("Post - Other")
            var mfntape = Mfntape(form.data);
            mfntape.save(function(err) {
              if (err) {
                console.error(err);
                res.render('mfntape/create')
              } else {
                res.redirect('/mfntapes');
              }
            });
          },
          empty: function (form) {
            console.log("Post - There was no form data in the request")
            res.redirect('/mfntapes');
          }
        });
      });

    }
  })

  app.param('mfntapeId', function(req, res, next, id) {
    Mfntape.findById(id, function(err, mfntape) {
      if (err) {
        next(err);
      } else {
        res.locals.mfntape = mfntape;
        next();
      }
    });
  });
  
  app.get('/mfntapes', function(req, res) {
    Mfntape.find({}, function(err, mfntapes) {
      res.render('mfntape/index', { mfntapes : mfntapes });
    });
  });

  app.get('/mfntapes/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('mfntape/create', {
          title : 'Mfntapes',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/mfntapes/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var mfntape = Mfntape(form.data);
        mfntape.save(function(err) {
          if (err) {
            console.error(err);
            res.render('mfntape/create')
          } else {
            res.redirect('/mfntapes');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var mfntape = Mfntape(form.data);
        mfntape.save(function(err) {
          if (err) {
            console.error(err);
            res.render('mfntape/create')
          } else {
            res.redirect('/mfntapes');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/mfntapes');
      }
    });
  });

  app.get('/mfntapes/:mfntapeId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.mfntape);
    reg_form.handle(res.locals.mfntape, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('mfntape/edit', {
          title : 'Mfntapes',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('mfntape/edit', {
          title : 'Mfntapes',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/mfntapes/:mfntapeId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.mfntape);
        res.locals.mfntape.save(function(err) {
          if (err) {
            console.error(err);
            res.render('mfntape/edit');
          } else {
            res.redirect('/mfntapes');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.mfntape);
        res.locals.mfntape.save( function(err) {
          if (err) {
            console.error(err);
              res.render('mfntape/edit');
          } else {
          res.redirect('/mfntapes');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//mfntapes');
      }
    });
  });

  app.get('/mfntapes/:mfntapeId/detail', function(req, res) {
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
        res.render('mfntape/detail');
      }
    });
  });

  app.get('/mfntapes/:mfntapeId/delete', function(req, res) {
    res.render('mfntape/delete');
  });

  app.post('/mfntapes/:mfntapeId/delete', function(req, res) {
    Mfntape.remove({ _id : req.params.mfntapeId }, function(err) {
      res.redirect('/mfntapes');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Mfntape',
  route : '/mfntapes'
}
