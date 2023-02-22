# Afficher les documents d'une requête en temps réel

À l'issue de ce module, vous serez capable de :

1. Récupérer un document précis depuis Firestore
2. Récupérer une collection complète de documents depuis Firestore
3. Réagir aux changements d'un document ou d'une collection en temps réel

---

## Présentation

Un des intérêt de Firestore est de pouvoir facilement récupérer des données depuis la base, et de pouvoir également le faire en temps réel.

Firestore offre de nombreuses manières de lire des données, par exemple en ciblant un document bien précis ou alors en listant la collection entière.

## Lire un seul document

Pour récupérer les documents d'une collection Firestore, on utilise la méthode `getDoc` du package `firebase/firestore`. Cette méthode prend en paramètre une **référence de document**

Reprenons notre document `GOzaQ8t6VJCC1xrulU16` de la collection `livres` du chapitre précédent :

<p align="center"><img src="./images/doc-miserables.png" width="808"></p>

Pour obtenir le document, on utilise `getDoc()` en lui passant la référence du document ciblé :

```js
import { doc, getDoc } from 'firebase/firestore';

…

const bookRef = doc(db, 'livres/GOzaQ8t6VJCC1xrulU16');
const bookDoc = await getDoc(bookRef);

// On peut aussi factoriser en écrivant directement :

const bookDoc = await getDoc(doc(db, 'livres/GOzaQ8t6VJCC1xrulU16'));
```

On récupère dans `bookDoc` ce qu'on appelle **un "snapshot"** du document cible. Cette opération est asynchrone car c'est elle qui requête la base de données.

Le type [DocumentSnapshot](https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot?hl=en) dispose d'une méthode `.data()` qui permet de récupérer les données du document sous forme d'objet :

```js
const book = bookDoc.data();

console.log(book.titre); // "Les Misérables" (String)
console.log(book.auteur); // -> Référence à un document "auteurs" (DocumentReference)
console.log(book.date_edition); // 1862-01-01T00:00:00.000Z (Timestamp)
console.log(book.prix); // 15.99 (Number)
```

#### Récupérer le sous-document `auteur`

Dans le code précédent, on récupère `book.auteur` qui est une référence à un document de la collection `auteurs`.

Nous savons déjà comment obtenir la valeur d'une référence :

```js
…
const book = bookDoc.data();

// Récupération du document "auteurs" référencé par "book.auteur"
const authorDoc = await getDoc(book.auteur);
const author = authorDoc.data();

console.log(author.prenom); // "Victor" (String)
console.log(author.nom); // "Hugo" (String)

console.log(book.titre);
console.log(book.date_edition);
console.log(book.prix);
```

## Lire les documents d'une collection

Pour lire l'intégralité des documents d'une collection, on utilise la méthode `getDocs` du package `firebase/firestore` :

```js
import { getDocs, collection } from 'firebase/firestore';

…

const booksCollection = collection(db, 'livres');

const booksSnapshot = await getDocs(booksCollection);

// Parcours du résultat des documents "livres"
for (const bookDoc of booksSnapshot.docs) {
  const book = bookDoc.data();

  console.log(book.titre);
  console.log(book.auteur);
  console.log(book.date_edition);
  console.log(book.prix);
}
```

Cette méthode prend en paramètre une **référence de collection** et renvoie un [QuerySnapshot](https://firebase.google.com/docs/reference/js/firestore_.querysnapshot?hl=en) qui dispose d'une propriété `.docs` qui contient un tableau de [DocumentSnapshot](https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot?hl=en).

---

## Écouter les modifications en temps réel

Nous avons vu comment récupérer un document ou toute une collection de documents une seule fois, cependant si les données venaient à changer dans Firestore, il faudrait rafraîchir la page pour voir les modifications.

Il existe la possibilité d'écouter les modifications en temps réel grâce à la méthode `onSnapshot` du package `firebase/firestore`.

Cette méthode prend en paramètre une **référence de document ou de collection** et une fonction de callback qui sera appelée à chaque fois que les données changent :

```js
const bookRef = doc(db, 'livres/GOzaQ8t6VJCC1xrulU16');

onSnapshot(bookRef, async (bookDoc) => {
  const book = bookDoc.data();
  
  // [SNAPSHOT]
  // …
});
```

Comme on peut le voir sur cette animation, la fonction de callback est appelée à chaque fois que les données changent en direct dans la base :

<p align="center"><img src="./images/firestore-snapshot.gif" width="1141"></p>

## Écouter les modifications en temps réel sur plusieurs éléments

De la même façon que sur un document, on peut écouter les changements sur une collection complète.

En plus de `.docs()`, l'objet [QuerySnapshot](https://firebase.google.com/docs/reference/js/firestore_.querysnapshot?hl=en) dispose d'une autre méthode `.docChanges()` très utile pour obtenir les **modifications** effectuées sur les documents de la collection :

```js
const booksCollection = collection(db, 'livres');

onSnapshot(booksCollection, (booksSnapshot) => {
  for (const change of booksSnapshot.docChanges()) {

    // L'objet "change" contient les informations sur le type de changement

  }
});
```

Pour chaque changement, on obtient un objet `change` de type [DocumentChange](https://firebase.google.com/docs/reference/js/firestore_.documentchange?hl=en) disposant d'une propriété `.type` qui peut prendre les valeurs suivantes :

- `added`: signifie que le document vient d'être ajouté à la collection
- `modified`: signifie que le document vient d'être modifié dans la collection
- `removed`: signifie que le document vient d'être supprimé de la collection
- `metadata`: signifie que le document a été modifié mais que les modifications ne concernent pas les données du document

On peut donc adapter l'interface web suivant le type de changement effectué, pour ajouter, remplacer ou supprimer un document dans le DOM par exemple :

```js
const booksCollection = collection(db, 'livres');

onSnapshot(booksCollection, (booksSnapshot) => {
  for (const change of booksSnapshot.docChanges()) {
    switch (change.type) {
      case 'added':
        // Ajout du document dans le DOM …
        break;
      
      case 'modified':
        // Remplacement du document dans le DOM …
        break;

      case 'removed':
        // Suppression du document dans le DOM …
        break;
    }
  }
});
```

---

# Pour aller plus loin

- Récupérer des données une seule fois : [Get Data with Cloud Firestore](https://firebase.google.com/docs/firestore/query-data/get-data?hl=en)
- Récupérer des données en temps réel : [Get realtime updates with Cloud Firestore](https://firebase.google.com/docs/firestore/query-data/listen?hl=en)

# Vos points clés à retenir

- La méthode asynchrone `.getDoc()` permet de récupérer un document depuis Firestore
- La méthode asynchrone `.getDocs()` permet de récupérer une **collection de documents** depuis Firestore
- La fonction `onSnapshot()` permet d'**écouter les modifications en temps réel** sur un document ou une collection
- Le callback de `onSnapshot()` renvoie un [QuerySnapshot](https://firebase.google.com/docs/reference/js/firestore_.querysnapshot?hl=en), qui dispose d'une propriétés `.docs` et d'une méthode `.docChanges()`

# Conclusion

Maintenant que vous êtes en mesure de récupérer des informations depuis Firestore, voyons comment créer des requêtes plus complexes pour obtenir des données organisées et/ou filtrées.

Rendez-vous dans le chapitre suivant 💪