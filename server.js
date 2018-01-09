var http = require('http');
var express = require('express');
var app = express();
var http = require('http');
var httpS = require('http').Server(app);
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var mongoose = require('mongoose');
// Pour le CSS et le JS
app.use(express.static(__dirname));

// Connexion à la BD
mongoose.connect('mongodb://localhost/svg');

// JSON Schema : copie de jsonschema.json
var schema = {
	"url":{
		"type" : "string"
	},
	"type":"object",
	"properties":{
		"content":{
			"type": "array",
			"items": {
				"type": "object",
				"properties": {
					"shape": {
						"type": "string"
					},
					"parameters" : {
						"items": {
							"type": "object",
							"properties" : {
								"color" : {"type" : "string"},
							},
							"required": ["color"]
						}
					}
				},
				"required": ["shape", "parameters"]
			}
		}
	},
      "required": ["url", "content"]
};
var Image = mongoose.model('Image', schema);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connexion OK :)')
});

// Route / index
// Configure la page affichée pour localhost:8080/
app.get('/', function(req, res) {
	res.sendFile(__dirname+"/index.html");
});

var port = 8080;
httpS.listen(port, function() {
	console.log('Serveur Nodejs Express sur le port 8080');
});

// VOILA
