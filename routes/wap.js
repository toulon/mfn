var Wap = require('../models/wap'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    S = require('string'),
  util = require('util'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        serial: fields.string ({      label: 'Serial'
    }),
        model: fields.string ({      label: 'Model'
    }),
  })
  var page_title = "All Waps"
  app.param('wapId', function(req, res, next, id) {
    Wap.findById(id, function(err, wap) {
      if (err) {
        next(err);
      } else {
        res.locals.wap = wap;
        next();
      }
    });
  });

  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  
  app.get('/waps', function(req, res) {
    function makeOlder(years, newname) {
      this.age += years;
      if (newname) {
        this.name = newname;
      }
    }
    //This function just adds years to any "this" object and optionally replaces the name. It's not tied to any particular object. (In fact any function not using variables from outer scopes is independent) Here is how we would use it with either call or apply.
    var Person = {
      name: "Tim",
      age: 28,
      greeting: function () {
        return "Hello " + this.name + ".  Wow, you are " + this.age + " years old.";
      }
    };

    Person.greeting();
    var Dog = {
      name: "Alfred",
      age: 110,
      greeting: Person.greeting
    }

    Dog.greeting(); // This will work and it will show the dog's data.    makeOlder.call(Person, 2, "Old Tim");
    makeOlder.apply(Dog, [1, "Shaggy"]);
    console.dir({Person: Person, Dog: Dog});
    console.log({Person: Person, Dog: Dog});
    console.log([1,2])
    console.dir([1,2])
    var async = require('async');

    var FabricCommand = function() {};
    FabricCommand.prototype.do =

      function(undoArray, callback) {
        // Check the number of arguments
        // (the first function of the waterfall receives only a callback)
        if (Array.prototype.slice.apply(arguments).length === 1) {
          callback = undoArray;
          undoArray = undefined;
        }

        var self = this;

        if (undoArray === undefined) {
          undoArray = [];
        }

        undoArray.push(self);
        callback(null, undoArray);
      };

    var doCommands = [];

    var f1 = new FabricCommand();
    var f2 = new FabricCommand();
    var f3 = new FabricCommand();

    doCommands.push(f1.do .
      bind(f1));
    doCommands.push(f2.do .
      bind(f2));
    doCommands.push(f3.do .
      bind(f3));

    async.waterfall(
      doCommands,
      function(err, undoCommands) {
        console.log(err);
        console.log(undoCommands);
      }
    );
    // Here is a simple object with an (unnecessarily roundabout) squaring method
    var AsyncSquaringLibrary = {
      squareExponent: 2,
      square: function(number, callback){
        var result = Math.pow(number, this.squareExponent);
        setTimeout(function(){
          callback(null, result);
        }, 200);
      }
    };

    async.map([1, 2, 3], AsyncSquaringLibrary.square, function(err, result){
      // result is [NaN, NaN, NaN]
      // This fails because the `this.squareExponent` expression in the square
      // function is not evaluated in the context of AsyncSquaringLibrary, and is
      // therefore undefined.
      console.log("Result = " + result);
    });

    async.map([1, 2, 3], AsyncSquaringLibrary.square.bind(AsyncSquaringLibrary), function(err, result){
      // result is [1, 4, 9]
      // With the help of bind we can attach a context to the iterator before
      // passing it to async. Now the square function will be executed in its
      // 'home' AsyncSquaringLibrary context and the value of `this.squareExponent`
      // will be as expected.
      console.log("Result = " + result);
    });

    var label = [],
        id = [];
    var createGlobalGroup = function(socket, data) {
      async.waterfall(
        [
          /**
           * this function is required to pass data recieved from client
           * @param  {Function} callback To pass data recieved from client
           */

            function(callback) {
            callback(null, socket, data);
          },
        /**
         * Step 1: Verify User
         */
          getRecords,
        /**
         * Step 2: Create Project
         */
          updateRecords], function(err, result) {
          /**
           * function to be called when all functions in async array has been called
           */
          console.log('Completed ....')
        });
    }
    getRecords = function(socket, data, callback) {
    //do your query
      /**
       * call next function in series
       * provide sufficient input to next function
       */
      Wap.find({}, function(err, waps) {
        for (var i = 1; i < waps.length; i++) {
          //console.log("wap = " + util.inspect(waps))
          var mac = JSON.stringify(waps[i].mac).toLocaleUpperCase()
          mac = S(mac).replaceAll(':', '').s;
          //console.log("MFN-FAB-" + pad(i, 2) + "\n" + mac)
          label.push("MFN-FiB-" + pad(i, 2));
          id.push(waps[i]._id);
          // Wap.update(waps._id, {'$set': {'label': 'label' }}, function (err, updated) {

          // if (err) throw err;
          // })
        }
        console.log ("label = " + label);
        console.log("id = " + id)
        res.render('wap/index', { waps: waps });
      })

      callback(null, socket, data, {
        "findCompleted": true,
      });
    }

    var updateRecords = function(socket, data, asyncObj, callback) {
    //wanna stop then no callback
      var numCallbacks = 0;
      console.log("In Update phase")
      for (i = 0; i < label.length; i++) {
        console.log("Label = " + label[i])
        Wap.update(id[i], {'$set' : {'label' : label[i]}},
          function(err, updated) {
            if(err) throw err;
            //console.log("Updated " + updated + " " + i );
          })
      }
    }
    
  });

  app.get('/waps/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('wap/create', {
          title : 'Waps',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/waps/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var wap = Wap(form.data);
        wap.save(function(err) {
          if (err) {
            console.error(err);
            res.render('wap/create')
          } else {
            res.redirect('/waps');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var wap = Wap(form.data);
        wap.save(function(err) {
          if (err) {
            console.error(err);
            res.render('wap/create')
          } else {
            res.redirect('/waps');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/waps');
      }
    });
  });

  app.get('/waps/:wapId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.wap);
    reg_form.handle(res.locals.wap, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('wap/edit', {
          title : 'Waps',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('wap/edit', {
          title : 'Waps',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/waps/:wapId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.wap);
        res.locals.wap.save(function(err) {
          if (err) {
            console.error(err);
            res.render('wap/edit');
          } else {
            res.redirect('/waps');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.wap);
        res.locals.wap.save( function(err) {
          if (err) {
            console.error(err);
              res.render('wap/edit');
          } else {
          res.redirect('/waps');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//waps');
      }
    });
  });

  app.get('/waps/:wapId/detail', function(req, res) {
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
        res.render('wap/detail');
      }
    });
  });

  app.get('/waps/:wapId/delete', function(req, res) {
    res.render('wap/delete');
  });

  app.post('/waps/:wapId/delete', function(req, res) {
    Wap.remove({ _id : req.params.wapId }, function(err) {
      res.redirect('/waps');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Wap',
  route : '/waps'
}
