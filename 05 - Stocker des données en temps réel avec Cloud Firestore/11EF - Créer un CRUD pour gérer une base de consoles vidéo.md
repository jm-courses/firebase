# Créer un CRUD pour gérer une base de consoles vidéo

À l'issue de ce module, vous serez capable de :

1. Réaliser un système de CRUD (Create, Read, Update, Delete) en temps-réel pour gérer une base de données de consoles de jeux vidéo

---

## Consigne

À l'aide de ce que vous avez appris dans ce module, vous allez travailler sur l'application "Playground" fournie avec ce cours, dans la page "Firestore" :

<p align="center">
  <img src="./images/exo-firestore.png" width="654" />
</p>

Vous allez devoir dynamiser cette page afin d'afficher les consoles de jeux vidéo stockées dans la base de données Firestore.

### Préparation de l'exercice

Dans un premier temps, vous allez créer un petit script JS éphémère qui va vous permettre de remplir une collection `consoles` de la base de données Firestore avec les données suivantes :

```js
const consoles = [
  {
    nom: 'PlayStation 5',
    prix: 799.99,
    constructeur: 'Sony',
    description: `La PlayStation 5 a été commercialisé le 12 novembre 2020 au États-Unis puis le 19 novembre de cette même année en Europe, elle a été créée par Sony Interactive Entertainment.`,
    photo: '/public/assets/images/consoles/ps5.png',
  },
  {
    nom: 'Xbox Series X',
    prix: 499.99,
    constructeur: 'Microsoft',
    description: `Xbox Series est la gamme de consoles de neuvième génération comprenant la Xbox Series X et la Xbox Series S, développées et fabriquées par Microsoft et sorties le 10 novembre 2020`,
    photo: '/public/assets/images/consoles/xbox-x.png',
  },
  {
    nom: 'Switch',
    prix: 399.99,
    constructeur: 'Nintendo',
    description: `La Nintendo Switch est une console de jeux vidéo hybride développée par Nintendo. Elle est sortie le 3 mars 2017 au Japon, le 3 mars 2017 en Amérique du Nord et le 3 mars 2017 en Europe.`,
    photo: '/public/assets/images/consoles/switch.png',
  },
];
```

Utilisez la méthode `addDoc()` et une boucle pour ajouter les consoles dans la base de données Firestore.

Une fois votre script exécuté, vous devriez avoir dans votre Firestore une collection `consoles` contenant les 3 documents de consoles ci-dessus.

Faites vérifier votre travail par le formateur avant de passer à la suite.

---

### Description de l'exercice

Voici une animation faisant la démonstration du résultat attendu :

<p align="center">
  <img src="./images/exo-demo.gif" width="832" />
</p>

> Vous constatez qu'il n'est pas possible d'accéder à la page des consoles si l'utilisateur n'est pas authentifié.
> Une fois l'utilisateur authentifié avec Firebase, il peut accéder à la page des consoles et en ajouter.

Vous devez respecter les consignes suivantes :

1. N'autoriser l'accès à la page de consoles que si l'utilisateur est authentifié avec Firebase (s'il n'est pas authentifié, rediriger l'utilisateur vers la page d'authentification)

2. L'affichage dans le DOM doit pouvoir se faire en temps réel, c'est-à-dire que si un utilisateur ajoute une console, cette console doit apparaître dans le DOM sans avoir à recharger la page. De même si une console est modifiée ou supprimée, le DOM doit être mis à jour en temps réel.

3. Un utilisateur non-authentifié ne doit pas pouvoir ajouter, modifier ou supprimer une console.

> **Note :**
>
> Dans un cas réel, il serait recommandé que chaque utilisateur ne puisse intéragir qu'avec les consoles qu'il a lui-même créées, en utilisant l'ID de l'utilisateur authentifié comme clé primaire dans la base de données. Cependant, pour simplifier l'exercice, nous allons considérer que tous les utilisateurs peuvent intéragir avec toutes les consoles.


## Structure d'un document « console »

La structure d'un document « console » dans Firestore doit être la suivante :

```bash
.
├── id            # Identifiant unique de la console (généré par Firebase)
├── nom           # Nom de la console (String)
├── prix          # Prix de la console (Number)
├── constructeur  # Constructeur de la console (String) 
├── description   # Description de la console (String)
└── photo         # URL de la photo de la console (String)
```

---

En cas de problème, n'hésitez pas à demander de l'aide au formateur.

**Bon courage !**