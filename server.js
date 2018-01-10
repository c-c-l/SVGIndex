var http = require('http');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var url = require('url');
var fs = require('fs');
var path = require("path");
var mongoose = require('mongoose');
// On configure les views
app.set('view engine', 'pug')
// On configure le dossier des views
app.set("views", path.join(__dirname, "views"));
app.locals.basedir = path.join(__dirname, 'views');

// Pour le CSS et le JS
// app.use(express.static(__dirname));

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
// app.get('/', function(req, res) {
// 	res.sendFile(__dirname+"/index.html");
// });

// Page accueil
app.get('/', function (req, res) {
  res.render('home', { title: 'Recherche et indexation de fichiers SVG' })
})
// Pages pour chaque forme (un peu redondant mais on verra après si on a le temps de facto)
app.get('/cercle', function (req, res) {
  res.render('shape', { title: 'Recherche et indexation de fichiers SVG', shape: 'cercle' })
})
app.get('/rectangle', function (req, res) {
  res.render('shape', { title: 'Recherche et indexation de fichiers SVG', shape: 'rectangle' })
})
app.get('/ellipse', function (req, res) {
  res.render('shape', { title: 'Recherche et indexation de fichiers SVG', shape: 'ellipse' })
})
app.get('/ligne', function (req, res) {
  res.render('shape', { title: 'Recherche et indexation de fichiers SVG', shape: 'ligne' })
})
app.get('/polygone', function (req, res) {
  res.render('shape', { title: 'Recherche et indexation de fichiers SVG', shape: 'polygone' })
})
app.get('/polyline', function (req, res) {
  res.render('shape', { title: 'Recherche et indexation de fichiers SVG', shape: 'polyline' })
})

var port = 8080;
http.listen(port, function() {
	console.log('Serveur Nodejs Express sur le port 8080');
});


// Enregistrer le dossier contenant les fichiers json
var dirJson = "json/jsonimage";
// fs.readFile('json/jsonimage/circle001.json', getShape)
// Parcourir le dossier à la recherche des fichiers json
fs.readdir(dirJson, function( err, files ) {
	if( err ) {
		console.error( "Impossible de trouver le dossier : ", err );
		process.exit( 1 );
	}
	files.forEach(function( file, index ) {
		// Lire fichier json
		fs.readFile(dirJson+'/'+file, function getShape(err, data) {
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
				// Parser l'objet converti pour pouvoir extraire la forme
				var objConv = JSON.parse(stringContent);
				shape = (objConv.shape);
				console.log(dirJson+'/'+file+ ' : ' + shape)
				return shape;
		});
	});
});
// GET resultat ID pour afficher les résultats
