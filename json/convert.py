#!/usr/bin/python -O

# PYTHON3 FILE
# Convert a SVG file into a JSON file
# Etant donné que nos fichiers SVG sont tous composés du même pattern nous les
# convertissons en JSON

from bs4 import BeautifulSoup
import xml.dom.minidom
from xml.dom.minidom import parse
from svgpathtools import svg2paths2
# import urllib.request, urllib.parse, urllib.error
import json

# Fichier à convertir :
# fhand = open('svg/circle001.svg')
print("Entrez ici le nom du fichier SVG :")
fic = input()
doc = parse(fic)
# doc = parse('svg/circle001.svg')

# C'est moche mais ça marche
# On cherche les tags dans le fichier SVG pour déterminer la forme
if doc.getElementsByTagName('circle') :
    shape = 'circle'
elif doc.getElementsByTagName('ellipse') :
    shape = 'ellipse'
elif doc.getElementsByTagName('line') :
    shape = 'line'
elif doc.getElementsByTagName('polygon') :
    shape = 'polygon'
elif doc.getElementsByTagName('polyline') :
    shape = 'polyline'
elif doc.getElementsByTagName('rect') :
    shape = 'rect'
else :
    print("Il n'y a pas de forme détectée dans votre fichier SVG, ça risque de poser problème... :(")

svgFile = doc.getElementsByTagName(shape)
for element in svgFile:
    if element.getAttribute('fill') :
        if element.getAttribute('fill') != 'none' :
            color = element.getAttribute('fill')
            # Handle exception when stroke only
        elif element.getAttribute('stroke') != 'none' :
            color = element.getAttribute('stroke')
    else :
        print("Pas de couleur détectée, c'est bien triste :(")


# On extrait les attributs (ici l'url uniquement nous interesse) du fichier svg
svg_attributes = svg2paths2(fic, return_svg_attributes=True)

# On garde uniquement l'élement qui nous interesse (à l'index 2) #HARDCODE
# print(svg_attributes[2])
svgAtt = svg_attributes[2]
urlVal = svgAtt.get("url")
# wVal = svgAtt.get("width")
# hVal = svgAtt.get("height")

print("Conversion du fichier suivant :")
print(urlVal +".svg")
# print("Largeur du SVG :")
# print(wVal)
# print("Hauteur du SVG :")
# print(hVal)


# Création d'un dictionnaire pour en faire un fichier json avec les données recueillies
dic={'url': urlVal, 'content':[{'shape' : shape, 'color': color}]}

# Génère un fichier Json
fileName = "jsonimage/" + urlVal + ".json"
with open(fileName, 'w') as outfile:
    json.dump(dic, outfile)
print("Fichier JSON créé : " + fileName)
