/**
 * Created by toulon on 3/15/14.
 */
var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(
      "<!DOCTYPE html>" +
      "<html lang='en' dir='ltr'>" +
      "<head>" +
      "<met charset='utf-8'>" +
      "<title>Hola Mundo</title>" +
      "</head>" +
      "<body>" +
      "<script type='text/javascript'>alert('Hello World')</script>" +
      "</body>" +
      "</html>");
  response.end();
});

server.listen(80);

