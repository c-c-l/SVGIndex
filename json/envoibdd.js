var mongoose = require('mongoose');
var fs = require('fs');

// useMongoClient : true : pour contrer erreur (solution stackoverflow)
mongoose.connect('mongodb://localhost/svg', { useMongoClient: true });;

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
						"type" : "array",
						"items": {
							"type": "object",
							"properties" : {
								"nom" : {"type" : "string"},
								"valeur" : {"type" : "string"}
							},
							"required": ["name", "value"]
						}
					}
				},
				"required": ["shape", "parameters"]
			}
		}
	},
      "required": ["url", "content"]
}
;

var Image = mongoose.model('Image', schema);

// Trouver les fichiers
fs.readdir("jsonimage",function(err, files){
	if (err)
		return console.error(err);

		// Si fichier json
		files.forEach( function (file){
		if(file.indexOf(".json") != -1){
			// On sauvegarde le contenu du fichier dans une variable
			var contenu = fs.readFileSync("jsonImage/" + file, "UTF-8");

			// Analyse du contenu
			var JsonParsed = JSON.parse(contenu);
			// Enregistrement
			var img = new Image(JsonParsed);
			img.save(function (err) {
				if (err) {
					console.log("Oups ! Il y a eu une erreur ! Détails :");
					console.log(err);
				} else {
					console.log('Envoi terminé avec succès :)');
				}
			});
		}
   });
});
