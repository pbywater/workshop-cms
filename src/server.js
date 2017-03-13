var http = require('http');
var fs = require('fs');

function handler (req, res) {
  var method = req.method;
  console.log(method);
  var endpoint = req.url;
  console.log(endpoint);
  if (endpoint === '/') {
  res.writeHead(200, {"Content-Type": "text/html"});

  fs.readFile(__dirname + '/../public/index.html', function(err, file) {
    if (err) {
      console.log(err);
      return;
    }
      res.end(file);
  })
}
  else if (endpoint === '/node') {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('hello node');
    res.end();
}
  else if (endpoint === '/girls') {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('hello girls');
    res.end();
}
  else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write('404');
    res.end();
  }

}

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests");
})
