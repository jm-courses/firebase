# Lister les services de Firebase

À l'issue de ce module, vous serez capable de :

1. Identifier les différents services offerts par Firebase
2. Comprendre le contenu offert par chaque service Firebase

---

## Présentation

Firebase n'était historiquement qu'un service de base de données en temps réel ultra rapide.

Mais depuis son rachat par Google, Firebase offre une multitude d'autres éléments, que nous allons découvrir dans cette partie.

La liste ne sera pas exhaustive car Firebase dans sa globalité est très riche, mais les éléments que nous allons voir font partie des principaux et incontournables.

Enfin, il est bon de savoir que vous pouvez utiliser chacun de ces services indépendamment, et qu'il n'est pas du tout obligatoire de tout utiliser en même temps.

## Authentication

Firebase Authentication est un service de Firebase donnant la possibilité au développeur Web de facilement et rapidement mettre en place un module d'inscription et de connexion (= authentification) des visiteurs du site.

Il est possible d'authentifier ses utilisateurs en leur proposant de façon classique d'utiliser une _adresse e-mail_ et un _mot de passe_, ou de passer par de l'authentification sociale via des "_providers_" : Google Sign-In, Facebook Login, Twitter, Github, … etc.

Nous découvrirons comment utiliser ces éléments dans le chapitre dédié à l'authentification.

## Realtime Database

Real-time Database correspond au service historique de Firebase permettant d'échanger en temps réel et à haute vitesse des données structurées sous forme de noeuds JSON.

Le temps de réponse garanti est inférieur à 500 milli-secondes et est adapté pour les besoins en temps réel à faible latence.

Le format simplifié de noeuds JSON permet des échanges rapides, mais n'offre pas de flexibilité dans la structuration des données (relations, types).

## Firestore

Cloud Firestore est arrivé peu après Real-time DB et permet également de faire du temps réel avec une latence légèrement plus élevée, mais offre un modèle de structuration des données plus complexe avec des collections et des documents, dont les propriétés peuvent être typées (string, nombre, date, map, geopoint, …).

De plus, Cloud Firestore offre une capacité de stockage très grande en tirant partie de l'infrastructure de Google et permet au développeur web de ne pas se soucier des problématiques de charge serveur et de scalabilité.

## Storage

Storage est un service offrant au développeur web la possibilité d'héberger des fichiers de tout types sur le cloud, et offre une API JavaScript client très pratique pour gérer l'upload et le download de fichiers en toute simplicité.

## Hosting

Le service Hosting de Firebase est un service d'hébergement de fichiers statiques HTML, CSS et JavaScript uniquement (pas de PHP ou Node.js), offrant un nom de domaine en `.web.app` et un certificat SSL gratuit.

Il est également possible d'acheter un nom de domaine chez un registar indépendant et de le brancher sur Firebase Hosting.

---

Firebase est une plateforme de développement complète offrant de nombreux autres services d'analyses, de tests et de performances.

<p align="center"><img src="./images/firebase-plateforme.png"></p>

---

# Pour aller plus loin

- [Firebase (Wikipédia)](https://fr.wikipedia.org/wiki/Firebase)

# Vos points clés à retenir

- Historiquement, Firebase n'était qu'un service de base de données en temps-réel, mais a évolué en offrant d'autres services comme l'Authentication, Firestore, Storage et Hosting.
- Tous ces services peuvent être utilisés indépendamment.
- Firebase offre de nombreux autres services pour développer, tester et monitorer une application.

# Conclusion

Maintenant que vous savez tout ce qu'offre Firebase, vous allez évaluer vos connaissances sur ces éléments.

Rendez-vous dans le prochain chapitre pour un QCM.