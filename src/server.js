var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

function handler(req, res) {
    var endpoint = req.url;
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
    else if (endpoint === '/create-post') {
      res.writeHead(302, {"Location": "/"});
      var allData = '';
      req.on('data', function(dataPart) {
        allData += dataPart;
      });
      req.on('end', function(){
        var convertedData = querystring.parse(allData);
        console.log(convertedData);
        res.end();
      })
    }

    else {
        var extension = endpoint.split('.')[1];
        var extensionType = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'jpg': 'image/jpeg',
            'png': 'image/png',
            'ico': 'image/x-icon'
        };
        fs.readFile(__dirname + '/..' + '/public' + endpoint, function(err, file) {
            res.writeHead(200, {"Content-Type": extensionType[extension]});
            res.end(file);
        })
    }
}

var server = http.createServer(handler);

server.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests");
})
