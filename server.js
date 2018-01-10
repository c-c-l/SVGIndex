var http = require('http');
var express = require('express');
var app = express();
var http = require('http').Server(app);
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
http.listen(port, function() {
	console.log('Serveur Nodejs Express sur le port 8080');
});

// VOILA
// Lire fichier json
fs.readFile('json/jsonimage/circle001.json', getShape)

function getShape(err, data) {
    if (err) throw err
		// Parse fichier json
    obj = JSON.parse(data)
		// Enregistrer le contenu dans une variable
		content = obj.content
		// Convertit le résultat en string afin de pouvoir encore parser derrière
		stringContent = JSON.stringify(content)
		strilen = stringContent.length
		// Supprimer les crochets du début qui empêchent la fonction JSON.parse()
		// de fonctionner #HARDCODE
		strilen = strilen - 1;
		stringContent = stringContent.substring(1, strilen);
		// Parser l'objet convertit pour pouvoir extraire la forme
		var objConv = JSON.parse(stringContent);
		shape = (objConv.shape);
    // You can now play with your datas
}
