# Documentation sur les différents fichiers

Cette documentation est écrite dans le but d'éviter le surplus de commentaires dans le code.

## server.js
- var http : librairie http pour la création du serveur
- var url : récupère url appelée par le client
- var server : création du serveur
- 200 : code pour dire que tout est ok (contrairement à 404 par exemple)
- Content-Type : permet de paramètrer le type MIME de "end"
- server.listen : écoute sur le port #... (ici 8080)
- var page = url.parse : parse la requête du visiteur pour avoir le nom de la page

## Autre fichier

## Sources

https://www.npmjs.com/package/mongodb