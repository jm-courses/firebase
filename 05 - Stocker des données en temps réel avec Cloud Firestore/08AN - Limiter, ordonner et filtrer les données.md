# Limiter, ordonner et filtrer les données

À l'issue de ce module, vous serez capable de :

1. Définir et créer une requête
2. Paramétrer une requête pour obtenir uniquement les documents souhaités

---

## Présentation

Par défaut, le fait d'aller chercher tous les documents d'une collection les affichera par défaut dans l'ordre de leur ID.

Il est possible d'ordonner, limiter et filtrer les résultats d'une requête en fabriquant un objet de type [Query](https://firebase.google.com/docs/reference/js/firestore_.query?hl=en) à partir de la référence d'une collection.

## Créer une requête `Query`

Une requête est un objet de type `Query` qui permet de filtrer, limiter et ordonner les résultats d'une collection Firestore.

On utilise la fonction `query()` du package `firbease/firestore` pour créer une requête :

```js
import { query, getDocs } from 'firebase/firestore';

…

const myQuery = query(booksCollection);

// Récupère les documents en fonction de la requête
const docs = await getDocs(myQuery);
```

Bien entendu, l'avantage d'une requête est de pouvoir la paramétrer pour obtenir les résultats souhaités.

## Limiter les résultats avec `limit()`

La fonction `limit()` permet comme son nom l'indique de limiter le nombre de résultats d'une requête.

```js
import { query, limit, getDocs } from 'firebase/firestore';

…

// Les deux premiers documents de la collection
const onlyTwoBooks = query(booksCollection, limit(2));

const docs = await getDocs(onlyTwoBooks);
```

## Ordonner les résultats avec `orderBy()`

La fonction `orderBy()` permet d'ordonner les résultats d'une requête en fonction d'un champ.

```js
import { query, orderBy, getDocs } from 'firebase/firestore';

…

// Les documents de la collection ordonnés par titre, dans l'ordre alphabétique
const booksByTitle = query(booksCollection, orderBy('titre'));

const docs = await getDocs(booksByTitle);
```

Il est aussi possible de préciser l'ordre de tri grâce au second paramètre :

```js
// Documents ordonnés par titre, dans l'ordre alphabétique inverse
const booksByTitleDesc = query(booksCollection, orderBy('titre', 'desc'));
```

Dans le cas de champs numériques ou de dates, `orderBy` comprendra qu'il faut ordonner les résultats de façon croissante ou décroissante.

## Filtrer les résultats avec `where()`

La fonction `where()` permet de filtrer les résultats d'une requête en fonction d'une condition.

Cette fonction prend trois paramètres :

- Le nom du champ à filtrer
- Le type de comparaison (ex: `<`, `<=`, `>`, `>=`)
- La valeur à comparer

```js
import { query, where, getDocs } from 'firebase/firestore';

…

// Les documents pour lesquels le champs "prix" est inférieur ou égal à 10
const cheapestBooks = query(booksCollection, where('prix', '<=', 10));

const docs = await getDocs(cheapestBooks);
```

Il est possible de combiner plusieurs conditions d'une requête :

```js
// Les documents pour lesquels …
const threeCheapestBooks = query(booksCollection,
  where('prix', '<=', 10),  // … le champs "prix" est inférieur ou égal à 10 …
  orderBy('prix', 'asc'),   // … et ordonnés par prix croissant …
  limit(3)                  // … et limités à 3 résultats.
);
```

---

# Pour aller plus loin

- [Order and limit data with Cloud Firestore](https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=en)
- Documentation : La fonction [query()](https://firebase.google.com/docs/reference/js/firestore_?hl=en#query)
- Documentation : Le type [Query](https://firebase.google.com/docs/reference/js/firestore_.query?hl=en)

# Vos points clés à retenir

- Une requête (Query) permet dd'ordonner, limiter et filtrer les résultats d'une collection Firestore.
- On fabrique une requête avec la fonction `query()` du package `firebase/firestore`.
- On peut utiliser des fonctions comme `limit()`, `orderBy()` et `where()` pour paramétrer les résultats d'une requête.

# Conclusion

Maintenant que vous connaissez les bases de Cloud Firestore, vous pouvez passer à la suite pour apprendre à créer des documents et à les mettre à jour.

C'est ce que nous allons voir dans le chapitre qui suit.