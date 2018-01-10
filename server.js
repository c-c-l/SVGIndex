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
  res.render('home', { title: 'Recherche et indexation de fichiers SVG', mess: 'Sélectionnez une forme pour rechercher les fichiers SVG :)' })
})
app.get('/couleur', function (req, res) {
  res.render('couleur', { title: 'Recherche et indexation de fichiers SVG', mess: 'Sélectionnez une couleur pour rechercher les fichiers SVG :)' })
})
// Pages pour chaque forme (un peu redondant mais on verra après si on a le temps de facto)
app.get('/cercle', function (req, res) {
  res.render('circle', { title: 'Recherche et indexation de fichiers SVG', mess: 'Fichiers contenant un cercle', fichiers: cercleT })
})
app.get('/rectangle', function (req, res) {
  res.render('rect', { title: 'Recherche et indexation de fichiers SVG', mess: 'Fichiers contenant un rectangle', fichiers: rectT })
})
app.get('/ellipse', function (req, res) {
  res.render('ellipse', { title: 'Recherche et indexation de fichiers SVG', mess: 'Fichiers contenant une ellipse', fichiers: elliT })
})
app.get('/ligne', function (req, res) {
  res.render('line', { title: 'Recherche et indexation de fichiers SVG', mess: 'Fichiers contenant une ligne', fichiers: lineT })
})
app.get('/polygone', function (req, res) {
  res.render('polygon', { title: 'Recherche et indexation de fichiers SVG', mess: 'Fichiers contenant un polygone', fichiers: polygT })
})
app.get('/polyline', function (req, res) {
  res.render('polyline', { title: 'Recherche et indexation de fichiers SVG', mess: 'Fichiers contenant une polyline', fichiers: polyliT })
})
// Pages pour chaque couleur
app.get('/rouge', function (req, res) {
  res.render('couleurindex', { title: 'Recherche et indexation de fichiers SVG',mess: 'Fichiers de couleur rouge', fichiers: redT })
})
app.get('/vert', function (req, res) {
  res.render('couleurindex', { title: 'Recherche et indexation de fichiers SVG',mess: 'Fichiers de couleur verte', fichiers: greenT })
})
app.get('/bleu', function (req, res) {
  res.render('couleurindex', { title: 'Recherche et indexation de fichiers SVG',mess: 'Fichiers de couleur bleue', fichiers: blueT })
})
app.get('/jaune', function (req, res) {
  res.render('couleurindex', { title: 'Recherche et indexation de fichiers SVG',mess: 'Fichiers de couleur jaune', fichiers: yellowT })
})
// Cercles
app.get('/cjaune', function (req, res) {
  res.render('circle', { title: 'Recherche et indexation de fichiers SVG',mess: 'Cercles de couleur jaune', fichiers: ycT })
})
app.get('/crouge', function (req, res) {
  res.render('circle', { title: 'Recherche et indexation de fichiers SVG',mess: 'Cercles de couleur rouge', fichiers: rcT })
})
app.get('/cbleu', function (req, res) {
  res.render('circle', { title: 'Recherche et indexation de fichiers SVG',mess: 'Cercles de couleur bleue', fichiers: bcT })
})
app.get('/cvert', function (req, res) {
  res.render('circle', { title: 'Recherche et indexation de fichiers SVG',mess: 'Cercles de couleur verte', fichiers: gcT })
})
// Rectangles
app.get('/rjaune', function (req, res) {
  res.render('rect', { title: 'Recherche et indexation de fichiers SVG',mess: 'Rectangles de couleur jaune', fichiers: yrT })
})
app.get('/rrouge', function (req, res) {
  res.render('rect', { title: 'Recherche et indexation de fichiers SVG',mess: 'Rectangles de couleur rouge', fichiers: rrT })
})
app.get('/rbleu', function (req, res) {
  res.render('rect', { title: 'Recherche et indexation de fichiers SVG',mess: 'Rectangles de couleur bleue', fichiers: brT })
})
app.get('/rvert', function (req, res) {
  res.render('rect', { title: 'Recherche et indexation de fichiers SVG',mess: 'Rectangles de couleur verte', fichiers: grT })
})
// Lignes
app.get('/ljaune', function (req, res) {
  res.render('line', { title: 'Recherche et indexation de fichiers SVG',mess: 'Lignes de couleur jaune', fichiers: ylT })
})
app.get('/lrouge', function (req, res) {
  res.render('line', { title: 'Recherche et indexation de fichiers SVG',mess: 'Lignes de couleur rouge', fichiers: rlT })
})
app.get('/lbleu', function (req, res) {
  res.render('line', { title: 'Recherche et indexation de fichiers SVG',mess: 'Lignes de couleur bleue', fichiers: blT })
})
app.get('/lvert', function (req, res) {
  res.render('line', { title: 'Recherche et indexation de fichiers SVG',mess: 'Lignes de couleur verte', fichiers: glT })
})
// Polylines
app.get('/pljaune', function (req, res) {
  res.render('polyline', { title: 'Recherche et indexation de fichiers SVG',mess: 'Polylignes de couleur jaune', fichiers: yplT })
})
app.get('/plrouge', function (req, res) {
  res.render('polyline', { title: 'Recherche et indexation de fichiers SVG',mess: 'Polylignes de couleur rouge', fichiers: rplT })
})
app.get('/plbleu', function (req, res) {
  res.render('polyline', { title: 'Recherche et indexation de fichiers SVG',mess: 'Polylignes de couleur bleue', fichiers: bplT })
})
app.get('/plvert', function (req, res) {
  res.render('polyline', { title: 'Recherche et indexation de fichiers SVG',mess: 'Polylignes de couleur verte', fichiers: gplT })
})
// Polygones
app.get('/pgjaune', function (req, res) {
  res.render('polygon', { title: 'Recherche et indexation de fichiers SVG',mess: 'Polygones de couleur jaune', fichiers: ypgT })
})
app.get('/pgrouge', function (req, res) {
  res.render('polygon', { title: 'Recherche et indexation de fichiers SVG',mess: 'Polygones de couleur rouge', fichiers: rpgT })
})
app.get('/pgbleu', function (req, res) {
  res.render('polygon', { title: 'Recherche et indexation de fichiers SVG',mess: 'Polygones de couleur bleue', fichiers: bpgT })
})
app.get('/pgvert', function (req, res) {
  res.render('polygon', { title: 'Recherche et indexation de fichiers SVG',mess: 'Polygones de couleur verte', fichiers: gpgT })
})
// Ellipses
app.get('/ejaune', function (req, res) {
  res.render('ellipse', { title: 'Recherche et indexation de fichiers SVG',mess: 'Ellipses de couleur jaune', fichiers: yeT })
})
app.get('/erouge', function (req, res) {
  res.render('ellipse', { title: 'Recherche et indexation de fichiers SVG',mess: 'Ellipses de couleur rouge', fichiers: reT })
})
app.get('/ebleu', function (req, res) {
  res.render('ellipse', { title: 'Recherche et indexation de fichiers SVG',mess: 'Ellipses de couleur bleue', fichiers: beT })
})
app.get('/evert', function (req, res) {
  res.render('ellipse', { title: 'Recherche et indexation de fichiers SVG',mess: 'Ellipses de couleur verte', fichiers: geT })
})
var port = 8080;
http.listen(port, function() {
	console.log('Serveur Nodejs Express sur le port 8080');
});


// Enregistrer le dossier contenant les fichiers json
var dirJson = "json/jsonimage";
// On créé des tableaux pour stocker les noms des fichiers qui ont une forme
// ou une couleur donnée
var cercleT = [];
var rectT = [];
var elliT = [];
var lineT = [];
var polygT = [];
var polyliT = [];
var redT = [];
var blueT = [];
var yellowT = [];
var greenT = [];
// Combinaison forme + couleur
// Jaune
var ycT = [];
var yrT = [];
var ylT = [];
var yplT = [];
var ypgT = [];
var yeT = [];
// Rouge
var rcT = [];
var rrT = [];
var rlT = [];
var rplT = [];
var rpgT = [];
var reT = [];
// Bleu
var bcT = [];
var brT = [];
var blT = [];
var bplT = [];
var bpgT = [];
var beT = [];
var bcT = [];
// Vert
var gcT = [];
var grT = [];
var glT = [];
var gplT = [];
var gpgT = [];
var geT = [];
var gcT = [];
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
				shape = objConv.shape;
				param = objConv.parameters;
				paramString = JSON.stringify(param);
				paramlen = paramString.length;
				paramlen = paramlen - 1;
				param = paramString.substring(1, paramlen);
				var param = JSON.parse(param);
				var color = param.color;
				// TEST  :
				console.log(dirJson+'/'+file+ ' : ' + shape + ' color : ' + color)
				// On stocke le nom du fichier uniquement
				var fileLen = file.length;
				var fileNoExt = file.substring(0, fileLen - 5)
				// On ajoute l'extension .svg au fichier
				file = fileNoExt + '.svg';
				if (color == 'red') {
					redT.push(file);
					console.log(redT);
					if (shape == 'circle') {
						rcT.push(file);
					}
					else if (shape == 'ellipse') {
						reT.push(file);
					}
					else if (shape == 'rect') {
						rrT.push(file);
					}
					else if (shape == 'line') {
						rlT.push(file);
					}
					else if (shape == 'polyline') {
						rplT.push(file);
					}
					else if (shape == 'polygon') {
						rpgT.push(file);
					}
					else {
						console.log("Une erreur s'est produit lors de la recherche de formes.")
					}
				}
				else if (color == 'yellow') {
					yellowT.push(file);
					console.log(yellowT);
					if (shape == 'circle') {
						ycT.push(file);
					}
					else if (shape == 'ellipse') {
						yeT.push(file);
					}
					else if (shape == 'rect') {
						yrT.push(file);
					}
					else if (shape == 'line') {
						ylT.push(file);
					}
					else if (shape == 'polyline') {
						yplT.push(file);
					}
					else if (shape == 'polygon') {
						ypgT.push(file);
					}
					else {
						console.log("Une erreur s'est produit lors de la recherche de formes.")
					}
				}
				else if (color == 'blue') {
					blueT.push(file);
					console.log(blueT);
					if (shape == 'circle') {
						bcT.push(file);
					}
					else if (shape == 'ellipse') {
						beT.push(file);
					}
					else if (shape == 'rect') {
						brT.push(file);
					}
					else if (shape == 'line') {
						blT.push(file);
					}
					else if (shape == 'polyline') {
						bplT.push(file);
					}
					else if (shape == 'polygon') {
						bpgT.push(file);
					}
					else {
						console.log("Une erreur s'est produit lors de la recherche de formes.")
					}
				}
				else if (color == 'green') {
					greenT.push(file);
					console.log(greenT);
					if (shape == 'circle') {
						gcT.push(file);
					}
					else if (shape == 'ellipse') {
						geT.push(file);
					}
					else if (shape == 'rect') {
						grT.push(file);
					}
					else if (shape == 'line') {
						glT.push(file);
					}
					else if (shape == 'polyline') {
						gplT.push(file);
					}
					else if (shape == 'polygon') {
						gpgT.push(file);
					}
					else {
						console.log("Une erreur s'est produit lors de la recherche de formes.")
					}
				}
				else {
					console.log("La couleur n'a pas été détectée :(");
				}
				if (shape == 'circle') {
					cercleT.push(file);
					console.log(cercleT);
				}
				else if (shape == 'ellipse') {
					elliT.push(file);
					console.log(elliT);
				}
				else if (shape == 'rect') {
					rectT.push(file);
					console.log(rectT);
				}
				else if (shape == 'polygon') {
					polygT.push(file);
					console.log(polygT);
				}
				else if (shape == 'polyline') {
					polyliT.push(file);
					console.log(polyliT);
				}
				else if (shape == 'line') {
					lineT.push(file);
					console.log(lineT);
				}
				else {
					console.log('Pas de forme détectée :(')
				}
				return shape;
		});
	});
});
// GET resultat ID pour afficher les résultats
