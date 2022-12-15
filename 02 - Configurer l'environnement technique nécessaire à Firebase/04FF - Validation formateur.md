# Note au formateur

> **Warning** : Cette fiche est à disposition du formateur uniquement ! Merci de ne pas partager aux apprenants.

L'objectif ici est de vérifier que l'apprenant a bien configuré son environnement de travail pour le projet distribué `firebase-playground-base.zip`, et ce conformément à la vidéo du chapitre précédent.

Assurez-vous de vérifier point par point les éléments de la todolist ci-après avec chaque apprenant avant de continuer.

Ne pas hésiter en cas de besoin à ré-expliquer les points d'entrées avec Webpack et la notion de "bundle", si ce n'est pas clair.

# Todolist

### Environnement 
- [ ] L'apprenant a bien installé une version moderne de Node.js (au minimum la version 16)
- [ ] L'apprenant à bien installé les 5 extensions suivantes dans Visual Studio Code :
    - Live Server
    - Path Intellisense
    - NPM Intellisense
    - EditorConfig
    - Prettier

### Projet « Firebase Playground »
- [ ] L'apprenant a installé les dépendances avec `npm install` et `npm install firebase`
- [ ] L'apprenant a bien créé les éléments suivants dans son dossier `/public/` :
    ```
    public/
    └── scripts/
        ├── config.js
        └── index.js
    ```
    - [ ] Le fichier de configuration `config.js` correspond bien à l'application Firebase que l'apprenant à créée dans sa Console Google
    - [ ] Le fichier d'index `index.js` fait bien appel à la fonction `initializeApp` et affiche un message de succès dans une condition
- [ ] L'apprenant a bien configuré le point d'entrée `index: './public/scripts/index.js'` dans la configuration Webpack
- [ ] L'apprenant a pu lancer la commande `npm run dev` sans erreurs pour créer le fichier `public/bundle/index.js`
- [ ] L'apprenant a bien déclaré la balise `<script src="bundle/index.js" defer></script>` dans l'en-tête du document HTML `public/index.html`
- [ ] Lorsque le projet est ouvert dans le navigateur, il y a bien dans la console web le message de succès et aucune erreur

---

###### Contenu-type des fichiers du projet 

Voici à quoi doivent ressembler les fichiers crées/mis-à-jour par l'apprenant :

```js
// FICHIER : public/scripts/config.js

const firebaseConfig = {
  apiKey: '…',
  authDomain: '…',
  projectId: '…',
  storageBucket: '…',
  messagingSenderId: '…',
  appId: '…',
};
// La configuration doit correspondre à
//  l'application de l'apprenant sur son compte Firebase

export default firebaseConfig;
```

```js
// FICHIER : public/scripts/index.js

import { initializeApp } from 'firebase/app';
import firebaseConfig from './config';

const app = initializeApp(firebaseConfig, 'Firebase Playground');

if (app) {
  console.log(`Le projet "${app.name}" est bien configuré`);
}
```

```js
// FICHIER : package.json

{
  …
  "dependencies": {
    "firebase": "^9.13.0" // Firebase est bien installé en v9 minimum
  }
}
```

```js
// FICHIER : webpack.config.js

…
module.exports = {
  entry: {
    index: './public/scripts/index.js', // Le point d'entrée 'index' pour
                                        //  le fichier de la page d'accueil
                                        //  est bien configuré
  },

  …
};
```

```html
<!-- FICHIER : public/index.html -->

<!DOCTYPE html>
<html lang="fr">
  <head>
    …

    <!-- Le bundle d'index est bien inclus avec l'attribut "defer" -->
    <script src="bundle/index.js" defer></script>
  </head>
```