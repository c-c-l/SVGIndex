var http = require('http');
var express = require('express');
var app = express();
var http = require('http').Server(app);

// Route / index
// Configure la page affichée pour localhost:8080/
app.get('/', function(req, res) {
	res.sendFile(__dirname+"/index.html");
});

var port = 8080;
http.listen(port, function() {
	console.log('Serveur Nodejs Express sur le port  8080');
});