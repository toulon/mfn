var Mfntape = require('../models/mfntape'),
  mapper = require('../lib/model-mapper'),
  async = require('async'),
  forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
  var nbr_form = forms.create({
    cnt: fields.number ({      label: 'Count'
    })
  })

  app.get('/joe', function(req, res) {
    nbr_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('joe/index', {
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/joe', function(req, res) {
    res.send("Response back was " + req.body.cnt)
    cnt = req.body.cnt;
    console.log("cnt = " + cnt);
    for (var i = 0; i < cnt; i++) {
      //res.render('mfntape/create', {
      //  title : 'Mfntapes',
      //  form: form.toHTML()
      //});
    }
  });

};