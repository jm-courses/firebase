# 05AN - Lister les fichiers

À l'issue de ce module, vous serez capable de :

1. Lister les fichiers et dossiers d'une référence.
2. Lister les fichiers et dossiers d'une référence en profondeur (récursivement).
3. Obtenir les métadonnées d'une référence.
4. Faire la différence entre listing complet et listing paginé.

---

## Présentation

Pouvoir lister les fichiers présents dans un bucket ou à l'emplacement précis d'une référence est une fonctionnalité souvent indispensable lorsqu'on propose à nos utilisateurs un service de gestion de leurs fichiers.

Firebase propose une solution permettant de lister l'ensemble des fichiers d'un bucket ou d'une référence, avec la possibilité de faire de la pagination pour les longues listes.

Voyons comment procéder.

## Lister tous les fichiers

### Afficher les noms de fichiers

Lister le contenu d'une référence est très simple avec Firebase. Il suffit d'utiliser la fonction `listAll()` sur la référence de la façon suivante :

```js
import { getStorage, ref, listAll } from 'firebase/storage';

const storage = getStorage(app);

const imagesRef = ref(storage, 'images'); // Référence vers le dossier /images/

const response = await listAll(imagesRef);

for (const item of response.items) {
  console.log(item.name); // Affiche le nom de chaque fichier
}
```

> **Warning**
> 
> L'utilisation de `listAll()`  place l'intégralité de la réponse en mémoire, ce qui est **à éviter pour des références contenants beaucoup de fichiers**.
> On préfèrera dans ce cas utiliser la fonction `list()`, que nous verrons peu après, et qui permet de faire de la pagination.

### Obtenir des informations sur les fichiers listés

Dans l'exemple précédent, chaque _item_ de `response.items` est une référence directe vers le fichier, cependant on peut aussi vouloir récupérer plus d'informations, comme le **poids** ou la **date de dernière modification** du fichier.

Ces informations ne sont pas disponibles directement sur la référence, il faut donc faire une requête pour obtenir les métadonnées du fichier. On utilise pour cela la fonction `getMetadata()` qui retourne une promesse contenant les métadonnées du fichier :

```js
import { … , getMetadata } from 'firebase/storage';
…

// On place chaque promesse de métadonnées dans un tableau.
// Cela permet de PARALLÉLISER les appels 💪
const itemsDetailed = [];
for (const item of response.items) {
  itemsDetailed.push(getMetadata(item));
}

// On utilise `Promise.all()` pour attendre que toutes les promesses soient résolues.
const files = await Promise.all(itemsDetailed);

// On peut ensuite itérer sur le tableau de fichiers contenant les métadonnées.
for (const file of files) {
  file.name; // Nom du fichier
  file.size; // Poids du fichier
  file.updated; // Date de dernière modification
}
```

## Listing récursif des sous-dossiers

Vous avez dû remarquer que `listAll()` retourne 2 choses :

- `response.items` : un tableau contenant les références vers les **fichiers**
- `response.prefixes` : un tableau contenant les références vers les **dossiers**

En utilisant la puissance des [itérateurs asynchrones JavaScript](https://fr.javascript.info/async-iterators-generators), on peut facilement utiliser ces informations pour lister récursivement (= en profondeur) les sous-dossiers :

```js
// Fonction renvoyant un générateur asynchrone
async function* listDirectory(ref) {
  const listResult = await listAll(ref);

  // Relâche (yield) chaque fichier direct de la référence `ref` courante
  for (const item of listResult.items) {
    yield item;
  }

  // Délègue (yield*) le listing de chaque sous-dossier en rappelant la fonction elle-même
  for (const prefix of listResult.prefixes) {
    yield* listDirectory(prefix);
  }
}

const rootRef = ref(storage); // Racine du bucket

// La boucle `for...await` consomme le générateur asynchrone,
// et affiche chaque fichier du bucket de façon récursive.
for await (const file of listDirectory(rootRef)) {
  console.log(file.fullPath);
}
```

> **Note**
> Pour bien comprendre cet exemple, n'hésitez pas à adapter et tester ce code sur votre projet "Playground", pour tenter de lister récursivement les fichiers de votre bucket.

## Lister avec pagination

Comme indiqué précédemment, `listAll()` n'est pas forcément idéal pour lister le contenu d'un bucket contenant beaucoup de fichiers. Pour cela, Firebase propose la fonction `list()` qui fonctionne de la même manière, mais permet en plus de gérer la **pagination** :

```js
import { … , list } from 'firebase/storage';
…

const firstPage = await list(imagesRef, {
  maxResults: 50
});

// On dispose des items et préfixes de la page courante
firstPage.items;
firstPage.prefixes;

// On récupère la page suivante si elle existe
if (firstPage.nextPageToken) {
  const nextPage = await list(imagesRef, {
    maxResults: 50,
    pageToken: firstPage.nextPageToken
  });

  // items et préfixes de la seconde page
  nextPage.items;
  nextPage.prefixes;

  // …
}
```

---

# Pour aller plus loin

- [List Files](https://firebase.google.com/docs/storage/web/list-files?hl=en)
- JavaScript : [Itérateurs et générateurs asynchrones](https://fr.javascript.info/async-iterators-generators)

# Vos points clés à retenir

- Les fonctions `listAll()` et `list()` proposent la même fonctionnalité, mais `list()` permet de faire de la pagination.
- La fonction `getMetadata()` permet d'obtenir les métadonnées d'une référence.
- On peut lister récursivement les sous-dossiers d'un bucket en utilisant les itérateurs asynchrones JavaScript.

# Conclusion

Maintenant que vous savez tout sur le listing des fichiers de Firebase Storage, nous allons voir un dernier sujet : la suppression de fichiers.

À tout de suite dans le prochain chapitre !
