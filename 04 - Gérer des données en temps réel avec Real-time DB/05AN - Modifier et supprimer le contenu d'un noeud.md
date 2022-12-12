# Modifier et supprimer le contenu d'un noeud

À l'issue de ce module, vous serez capable de :

1. Modifier partiellement et intégralement le contenu d'un noeud
2. Supprimer le contenu d'un noeud

---

## Présentation

Après avoir ajouté et lu des données depuis une base, il faut aussi être en mesure de pouvoir :

- les mettre à jour (modification)
- les effacer (suppression)

C'est ce que nous allons voir dans ce chapitre.

## Modifier partiellement un noeud

Une modification partielle d'un noeud correspond à ne modifier qu'une ou plusieurs propriétés précises, **sans affecter le reste du noeud**.

C'est très pratique pour de petites modifications rapides dans un noeud existant.

Admettons le noeud suivant, disponible sous la référence de chemin `/comments/comm_03` :

```js
{
  "pseudo": "2iane",
  "created_at": "2022-12-09T08:47:12.989Z",
  "message": "Merci pour le partage!"
}
```

Si nous ne souhaitons modifier que le contenu du message textuel, alors il s'agit d'une modification **partielle**. On utilise pour cela la fonction `update()` du package `firebase/database` dont la signature est la suivante :

```js
function update(
  ref: DatabaseReference,
  values: object
): Promise<void>;
```

Voici un exemple d'utilisation :

```js
import { ref, update } from 'firebase/database';

const comm03Ref = ref(db, '/comments/comm_03');

update(comm03Ref, { message: "Merci BEAUCOUP pour le partage !" });
```

La nouvelle valeur du noeud correspond maintenant à :

```js
{
  "pseudo": "2iane",
  "created_at": "2022-12-09T08:47:12.989Z",
  "message": "Merci BEAUCOUP pour le partage !"
}
```
_(On note bien que le reste du noeud n'a pas été altéré)_.

## Modifier complètement un noeud

Parfois, il arrive que l'on souhaite remplacer complètement le contenu d'un noeud par un nouveau.

Dans ce cas là, on peut utiliser la fonction `set()` du package `firebase/database` dont voici la signature :

```js
function set(
  ref: DatabaseReference,
  value: unknown
): Promise<void>;
```

Elle fonctionne sur le même principe qu'un `update()`, sauf qu'elle **remplace complètement l'ancien noeud par la nouvelle valeur**.

Reprenons l'exemple précédent, mais avec un `set()` à la place :

```js
import { ref, set } from 'firebase/database';

const comm03Ref = ref(db, '/comments/comm_03');

set(comm03Ref, { message: "Merci à toi pour le partage ;)" });
```

La nouvelle valeur du noeud `/comments/comm_03` correspond désormais à :

```js
{
  "message": "Merci à toi pour le partage ;)"
}
```
_(On constate ici que les propriétés `pseudo` et `created_at` n'ayant pas été fournie dans les nouvelles valeurs, elles ont été supprimées. L'opération peut donc être destructive !)_.

## Supprimer un noeud

Pour supprimer un noeud, on peut procéder de 2 façons au choix :

```js
import { ref, remove } from 'firebase/database';

const comm03Ref = ref(db, '/comments/comm_03');

// 1. Avec la méthode remove() :
remove(comm03Ref);

// 2. Ou avec la méthode set() et une valeur nulle :
set(comm03Ref, null);
```

La méthode `remove()` du package `firebase/database` prend une référence seule en paramètre, qui sera supprimée :

```js
function remove(ref: DatabaseReference): Promise<void>;
```
---

> **Note** : Toutes ces fonctions retournent des **promesses JS**, on peut donc écrire du code à la suite d'une modification ou suppression, et gérer les potentielles erreurs :
> ```js
> try {
>   const comm04Ref = ref(db, '/comments/comm_04');
> 
>   await set(comm04Ref, {
>     pseudo: 'jm',
>     created_at: '2022-12-10T16:21:32.407Z',
>     message: 'Hello there!'
>   });
> 
>   await update(comm04Ref, {
>     pseudo: 'jmclery'
>   });
> 
>   await delete(comm04Ref);
> 
>   console.log('Modifications effectuées');
> }
> catch (err) {
>   console.log("Une erreur s'est produite", err);
> }
> ```

---

# Pour aller plus loin

- [Read and Write Data](https://firebase.google.com/docs/database/web/read-and-write?authuser=0#add_a_completion_callback)
- Documentation : [update()](https://firebase.google.com/docs/reference/js/database.md?authuser=0#update)
- Documentation : [set()](https://firebase.google.com/docs/reference/js/database.md?authuser=0#set)
- Documentation : [remove()](https://firebase.google.com/docs/reference/js/database.md?authuser=0#remove)

# Vos points clés à retenir

- Les modifications se font avec les fonctions `update()` (partielle) et `set()` (complète)
- La suppression se fait avec la fonction `delete()`

# Conclusion

Félicitations, vous êtes maintenant au fait de toutes les manipulations possibles sur des noeuds dans une Realtime DB.

Un petit QCM vous attend à la suite de ce chapitre pour tester vos connaissances sur ce qui a été abordé.