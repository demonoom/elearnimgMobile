var url = require('url');
var cookieParser = require('cookie-parser')
var express = require('express');
var session = require('express-session')
var minimist = require('minimist');
var debug = true;
var http = require('http');
var https = require('https');
var fs = require("fs");
var path = require('path');


var argv = minimist(process.argv.slice(2), {
    default: {
        as_uri: debug ? "http://localhost:8200/" : 'https://localhost:8200/'
    }
});

var options =
    {
        key: fs.readFileSync('keys/server.key'),
        cert: fs.readFileSync('keys/server.crt')
    };


var app = express();
app.use(cookieParser());

var sessionHandler = session({
    secret: 'none',
    rolling: true,
    resave: true,
    saveUninitialized: true
});

app.use(sessionHandler);


var asUrl = url.parse(argv.as_uri);
var port = asUrl.port;
if (debug) {
    http.createServer(app).listen(port, function () {
        console.log('Open ' + url.format(asUrl));
    });
} else {
    https.createServer(options, app).listen(port, function () {
        console.log('Open ' + url.format(asUrl));
    });
}


app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', "index.html"));
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', req.path));
});
