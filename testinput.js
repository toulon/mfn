var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

//app.set('port', process.env.PORT || config.port || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var names = [
  {
    "name": "joe",
    "age":26
  },
  {
    "name": "tom",
    "age":30
  },  {
    "name": "fred",
    "age":40
  },
  {
    "name": "george",
    "age":34
  }
]

for (var i = 0; i < 5; i++) {
  app.post('/user', function(req, res){
    res.send("Submitted user's name: " + req.body.name)
  })
  console.log("i = "+i);
}

var port = 8080;
app.listen(port);
console.log('Listening on port ' + port);
