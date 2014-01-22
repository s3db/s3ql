// playground for poking on arbitray mongodb backends
// node poke.js // in nitrous.io
// https://s3ql-70726.use1.nitrousbox.com/  // nitrous.io will proxy port 3000 through SSL

var mongodb = require("mongodb");
var http = require("http");
var corser = require("corser");
var log = console.log;
var port = process.env.PORT || 3000; // nitrous will proxy it through SSL through this port
log('POSTmongo served at port '+port);
log('service at https://s3ql-70726.use1.nitrousbox.com');

// Create Corser request listener.
var corserRequestListener = corser.create();

http.createServer(function (req, res) {
    // Route req and res through the request listener.
    corserRequestListener(req, res, function () {
        if (req.method === "OPTIONS") {
            // End CORS preflight request.
            res.writeHead(204);
            res.end();
        } else {
            res.writeHead(200);
            res.write('poking mongodb');
            res.write('\n');
            res.write(req.url);
            var pp = req.url.slice(2).split('&').map(function(xi){return xi.split('=')});
            var parm={};
            pp.map(function(xi){parm[xi[0]]=decodeURI(xi[1])});
            res.write('\nparm=');
            res.write(JSON.stringify(parm));
            res.end();
        }
    });
}).listen(port);