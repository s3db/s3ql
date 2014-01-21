﻿// playground for poking arbitray mongodb backends

var mongodb = require("mongodb");
var http = require("http");
var corser = require("corser");
var log = console.log;
var port = process.env.PORT || 1337;
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
            res.end('poking');
        }
    });
}).listen(port);