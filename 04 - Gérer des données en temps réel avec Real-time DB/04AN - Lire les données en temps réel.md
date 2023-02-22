# Lire les données en temps réel

À l'issue de ce module, vous serez capable de :

1. Récupérer les données depuis une Realtime DB
2. Surveiller les changements en direct dans la base
3. Trier et organiser les données récupérées

---

## Présentation

Lire et afficher les données d'une base en temps réel permet d'apporter du dynamisme dans la page web et de proposer des applications à forte intéraction.

Nous allons voir ici les différentes manières pour récupérer des données depuis une Realtime DB.

## Lire les données

Dans le cas où nous avons besoin de ne lire qu'une seule fois les données d'un noeud, on peut utiliser la méthode `get()` du package `firebase/database`. Cette méthode renvoie une **promesse JavaScript**, qui pourra être résolue avec une valeur de type [DataSnapshot](https://firebase.google.com/docs/reference/js/database.datasnapshot?hl=en) :

```js
import { getDatabase, ref, get } from 'firebase/database';

const db = getDatabase(app);

async function readComments() {
  try {
    const snapshot = await get(ref(db, '/comments'));

    console.log(snapshot.val());
  }
  catch (err) {
    console.log('Impossible de récupérer les commentaires', err.message);
  }
}

readComments();

// Affichera le log suivant :
//  {
//    comm_01: {created_at: '…', message: '…', pseudo: 'anish48'}
//    comm_02: {created_at: '…', message: '…', pseudo: 'lucz'}
//    comm_03: {created_at: '…', message: '…', pseudo: '2iane'}
//  }
```

Un objet de type `DataSnapshot` correspond à un instantané de la requête, et peut contenir 1 ou plusieurs noeuds.

On récupère la valeur brute de ce noeud avec la méthode `.val()` :

```js
const comm03        = await get(ref(db, '/comments/comm_03'));
const comm03_pseudo = await get(ref(db, '/comments/comm_03/pseudo'));

console.log(comm03.val()); // { created_at: '…', message: '…', pseudo: '2iane' }
console.log(comm03_pseudo.val()); // '2iane'
```

Il est aussi possible d'itérer sur un _DataSnapshot_ contenant plusieurs noeuds avec la méthode `.forEach()` :

```js
const comments = await get(ref(db, '/comments'));

// Pour chaque commentaire …
comments.forEach(comment => {
  // … on récupère un nouveau snapshot représentant CE commentaire
  console.log(comment.val());
});

// Affichera 3 logs successifs :
//  {created_at: '…', message: '…', pseudo: 'anish48'}
//  {created_at: '…', message: '…', pseudo: 'lucz'}
//  {created_at: '…', message: '…', pseudo: '2iane'}
```

## Lire les données en temps réel

Pour lire les données en temps réel, on va pouvoir utiliser la méthode `onValue()` qui permet de surveiller les changements effectués sur un noeuds, et de réagir en conséquence :

> **Note** :
> Afin d'éviter de surcharger les exemples de code, on suppose à partir de maintenant qu'une instance vers `db` a déjà été récupérée au préalable.

```js
import { ref, onValue } from 'firebase/database';
…
const comments = ref(db, '/comments');

onValue(comments, (snapshot) => {
  console.log(snapshot.val());
});

// Affichera le log suivant :
//  {
//    comm_01: {created_at: '…', message: '…', pseudo: 'anish48'}
//    comm_02: {created_at: '…', message: '…', pseudo: 'lucz'}
//    comm_03: {created_at: '…', message: '…', pseudo: '2iane'}
//  }
```

Lors du chargement de la page, `onValue` va s'exécuter une première fois et récupérer les données du noeud choisi exactement comme un `get`. La différence est que si par la suite, une données du noeud venait à changer en direct dans la base, alors un **nouvel appel à `onValue` se produira pour récupérer les données mises à jour**.

À noter qu'il est aussi possible de lire les données ligne par ligne avec la variante `onChildAdded` :

```js
import { ref, onChildAdded } from 'firebase/database';
…
const comments = ref(db, '/comments');

onChildAdded(comments, (snapshot) => {
  console.log(snapshot.val());
});
```

La différence est ici que la méthode sera appelée pour chaque noeud enfant de **/comments**, et pour chaque nouvel ajout d'un noeud :

```js
// Affichera 3 logs successifs au chargement de la page :

//  {created_at: '…', message: '…', pseudo: 'anish48'}
//  {created_at: '…', message: '…', pseudo: 'lucz'}
//  {created_at: '…', message: '…', pseudo: '2iane'}

// Puis potentiellement plus tard de nouveaux logs avec de nouveaux commentaires.
```

## Trier et organiser les données

Les données en lecture ne sont pas garanties d'être toujours affichées dans l'ordre d'insertion.

On a parfois besoin de pouvoir faire du tri et/ou de limiter le nombre de résultats si notre base comporte un grand nombre de données, ou si nous n'avons besoin que des 5 derniers éléments.

Pour cela, on peut utiliser l'objet [Query](https://firebase.google.com/docs/reference/js/database.query?hl=en) pour construire une requête.

Une requête se crée grâce à la fonction `query()` du package `firebase/database` et a la signature suivante :

```js
function query(
  query: Query,
  ...queryConstraints: QueryConstraint[]
): Query;
```

Le premier paramètre peut être une référence vers un noeud, et les paramètres suivants sont une infinité de **contraintes** de tri et filtrage.

Voici un exemple :

```js
import { ref, , query, onValue } from 'firebase/database';
…
const commentsQuery = query(
  ref(db, '/comments'),   // <-- référence
  orderByChild('pseudo'), // <-- tri par pseudo
  limitToFirst(2)         // <-- 2 éléments à partir du début
);

onValue(commentsQuery, (snapshot) => {
  console.log(snapshot.val());
});

// Affichera le log suivant :
//  {
//    comm_01: {created_at: '…', message: '…', pseudo: 'anish48'}
//    comm_03: {created_at: '…', message: '…', pseudo: '2iane'}
//  }
```

Une requête [Query](https://firebase.google.com/docs/reference/js/database.query?hl=en) permet donc d'être plus spécifique sur les données à récupérer.

---

# Pour aller plus loin

- [Read and Write Data](https://firebase.google.com/docs/database/web/read-and-write)
- [Work with Lists of Data](https://firebase.google.com/docs/database/web/lists-of-data)
- [Sorting and filtering data](https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data)

# Vos points clés à retenir

- `get()` permet de récupérer les données une seule fois
- `onValue()` et `onChildAdded()` permettent de surveiller et réagir aux changements en direct
- On peut filtrer et/ou trier les données avec les [Query](https://firebase.google.com/docs/reference/js/database.query?hl=en)

# Conclusion

Maintenant que vous savez lire les données en temps réel depuis une Realtime DB nous allons nous intéresser à la modification et la suppression d'un noeud.

À tout de suite dans le prochain chapitre 😉