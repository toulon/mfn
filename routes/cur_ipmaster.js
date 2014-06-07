var Cur_ipmaster = require('../models/cur_ipmaster'),
    mapper = require('../lib/model-mapper'),
    async = require('async'),
    forms = require('../public/vendor/forms/lib/forms');

var fields = forms.fields,
  validators = forms.validators,
  widgets = forms.widgets;

module.exports = function(app) {
var reg_form = forms.create({
        ip_address: fields.string ({      label: 'Ip_address'
    }),
        computer_name: fields.string ({      label: 'Computer_name'
    }),
        first_name: fields.string ({      label: 'First_name'
    }),
        last_name: fields.string ({      label: 'Last_name'
    }),
        mac: fields.string ({      label: 'Mac'
    }),
        active: fields.string ({      label: 'Active'
    }),
        note: fields.string ({      label: 'Note'
    }),
        first: fields.string ({      label: 'First'
    }),
        second: fields.string ({      label: 'Second'
    }),
        third: fields.string ({      label: 'Third'
    }),
        fourth: fields.string ({      label: 'Fourth'
    }),
  })
  var page_title = "Subnet Reports"
  app.param('cur_ipmasterId', function(req, res, next, id) {
    Cur_ipmaster.findById(id, function(err, cur_ipmaster) {
      if (err) {
        next(err);
      } else {
        res.locals.cur_ipmaster = cur_ipmaster;
        next();
      }
    });
  });

  app.get('/cur_ipmasters/subnet_all', function(req, res) {
    Cur_ipmaster.find({}, function(err, cur_ipmasters) {
      res.render('cur_ipmaster/subnet_all', { cur_ipmasters : cur_ipmasters });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.X";
      res.render('cur_ipmaster/subnet_all', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_1', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "1", "01" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.1.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_2', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "2", "02" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.2.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_3', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "3", "03" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.3.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_6', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "6", "06" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.6.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_7', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "7", "07" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.7.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });
  app.get('/cur_ipmasters/subnet_172_16_10', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "10" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.10.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });
  app.get('/cur_ipmasters/subnet_172_16_15', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "15" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.15.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_16', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "16" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.16.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_17', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "17" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.17.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_22', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "22" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.22.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_26', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "26" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.26.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_27', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "27" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.27.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_32', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "32" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.32.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_33', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "33" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.33.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_36', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "36" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.36.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_37', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "37" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.37.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_46', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "46" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.46.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_47', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "47" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.47.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_56', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "56" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.56.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_66', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "66" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.66.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_67', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "67" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.67.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_76', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "76" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.76.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_172_16_72', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "172" ] },
      second : { $all : [ "16" ] },
      third : { $in  : [ "72" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 172.16.72.X";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_10_45', function(req, res) {
    Cur_ipmaster.find({first : { $all : [ "10" ] }, second : { $all : [ "45" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 10.45.X.X";
      res.render('cur_ipmaster/subnet_all', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_10_45_128', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "10" ] },
      second : { $all : [ "45" ] },
      third : { $all  : [ "128" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 10.45.128.X - Network Equipment/23";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_10_45_130', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "10" ] },
      second : { $all : [ "45" ] },
      third : { $all  : [ "130" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 10.45.130.X - Facilities/23";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_10_45_150', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "10" ] },
      second : { $all : [ "45" ] },
      third : { $all  : [ "150" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 10.45.150.X - Microsoft Servers/23";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters/subnet_10_45_152', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "10" ] },
      second : { $all : [ "45" ] },
      third : { $all  : [ "152" ] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 10.45.152.X - Unix Servers/23";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });
  app.get('/cur_ipmasters/subnet_10_45_160-5', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "10" ] },
      second : { $all : [ "45" ] },
      third : { $in  : [ "160", "161", "162", "163", "164", "165"] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 10.45.160-5.X - Engineering PC/22";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });
  app.get('/cur_ipmasters/subnet_10_45_208', function(req, res) {
    Cur_ipmaster.find({first : { $all  : [ "10" ] },
      second : { $all : [ "45" ] },
      third : { $in  : [ "208"] } }, function(err, cur_ipmasters) {
      page_title = "Listing of Subnet 10.45.208.X - Administration/24";
      res.render('cur_ipmaster/subnet', { cur_ipmasters : cur_ipmasters, page_title : page_title });
    });
  });

  app.get('/cur_ipmasters', function(req, res) {
    Cur_ipmaster.find({}, function(err, cur_ipmasters) {
      res.render('cur_ipmaster/index', { cur_ipmasters : cur_ipmasters });
    });
  });

  app.get('/cur_ipmasters/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Get - Success")
      },
      other: function (form) {
        console.log("Get - Other")
      },
      empty: function (form) {
        console.log("There was no form data in the request")
        res.render('cur_ipmaster/create', {
          title : 'Cur_ipmasters',
          form: form.toHTML()
        });
      }
    });
  });

  app.post('/cur_ipmasters/create', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Success")
        var cur_ipmaster = Cur_ipmaster(form.data);
        var iparray = cur_ipmaster.ip_address.split(".")
        cur_ipmaster.first = iparray[0];
        cur_ipmaster.second = iparray[1];
        cur_ipmaster.third = iparray[2];
        cur_ipmaster.fourth = iparray[3];
        cur_ipmaster.save(function(err) {
          if (err) {
            console.error(err);
            res.render('cur_ipmaster/create')
          } else {
            res.redirect('/cur_ipmasters');
          }
        });
      },
      other: function (form) {
        console.log("Post - Other")
        var cur_ipmaster = Cur_ipmaster(form.data);
        var iparray = cur_ipmaster.ip_address.split(".")
        cur_ipmaster.first = iparray[0];
        cur_ipmaster.second = iparray[1];
        cur_ipmaster.third = iparray[2];
        cur_ipmaster.fourth = iparray[3];
        cur_ipmaster.save(function(err) {
          if (err) {
            console.error(err);
            res.render('cur_ipmaster/create')
          } else {
            res.redirect('/cur_ipmasters');
          }
        });
      },
      empty: function (form) {
        console.log("Post - There was no form data in the request")
        res.redirect('/cur_ipmasters');
      }
    });
  });

  app.get('/cur_ipmasters/:cur_ipmasterId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.cur_ipmaster);
    reg_form.handle(res.locals.cur_ipmaster, {
      success: function (form) {
        console.log("Get - Edit - Success")
        res.render('cur_ipmaster/edit', {
          title : 'Cur_ipmasters',
          form: form.toHTML()
        });
      },
      other: function (form) {
        console.log("Get - Edit - Other")
        res.render('cur_ipmaster/edit', {
          title : 'Cur_ipmasters',
          form: form.toHTML()
        })
      },
      empty: function (form) {
        console.log("Get - Edit - Empty")
      }
    });
  });

  app.post('/cur_ipmasters/:cur_ipmasterId/edit', function(req, res) {
    reg_form.handle(req, {
      success: function (form) {
        console.log("Post - Edit - Success")
        mapper.map(req.body).to(res.locals.cur_ipmaster);
        var iparray = res.locals.cur_ipmaster.ip_address.split(".")
        res.locals.cur_ipmaster.first = iparray[0];
        res.locals.cur_ipmaster.second = iparray[1];
        res.locals.cur_ipmaster.third = iparray[2];
        res.locals.cur_ipmaster.fourth = iparray[3];
        res.locals.cur_ipmaster.save(function(err) {
          if (err) {
            console.error(err);
            res.render('cur_ipmaster/edit');
          } else {
            res.redirect('/cur_ipmasters');
          }
        });
      },
      other: function (form) {
        console.log("Post - Edit - Other")
        mapper.map(req.body).to(res.locals.cur_ipmaster);
        var iparray = res.locals.cur_ipmaster.ip_address.split(".")
        res.locals.cur_ipmaster.first = iparray[0];
        res.locals.cur_ipmaster.second = iparray[1];
        res.locals.cur_ipmaster.third = iparray[2];
        res.locals.cur_ipmaster.fourth = iparray[3];
        res.locals.cur_ipmaster.save( function(err) {
          if (err) {
            console.error(err);
              res.render('cur_ipmaster/edit');
          } else {
          res.redirect('/cur_ipmasters');
          }
        });
      },
      empty: function (form) {
        console.log("Post - Edit - There was no form data in the request")
        res.redirect('//cur_ipmasters');
      }
    });
  });

  app.get('/cur_ipmasters/:cur_ipmasterId/detail', function(req, res) {
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
        res.render('cur_ipmaster/detail');
      }
    });
  });

  app.get('/cur_ipmasters/:cur_ipmasterId/delete', function(req, res) {
    res.render('cur_ipmaster/delete');
  });

  app.post('/cur_ipmasters/:cur_ipmasterId/delete', function(req, res) {
    Cur_ipmaster.remove({ _id : req.params.cur_ipmasterId }, function(err) {
      res.redirect('/cur_ipmasters');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Cur_ipmaster',
  route : '/cur_ipmasters'
}
