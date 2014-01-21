// playground for poking on arbitray mongodb backends
// node poke.js

var mongodb = require("mongodb");
var http = require("http");
var corser = require("corser");
var log = console.log;
var port = process.env.PORT || 3000; // nitrous will proxy it through SSL through this port
log('POSTmongo served at port '+port);

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
            res.end();
        }
    });
}).listen(port);