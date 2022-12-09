# Structurer les données dans une real-time database

À l'issue de ce module, vous serez capable de :

1. Savoir comment sont structurés les données dans ce type de base

---

## Présentation

Une base de données peut contenir des informations structurées de différentes façons. Les bases de données de type SQL par exemple stockent les données sous forme de _tables_ et _d'enregistrements_, alors que les bases de données de type NoSQL stockent les données sous forme de _collections_ et de _documents_.

Ici, nous allons étudier la façons dont sont stockées les données dans une **Realtime DB**.

## Structure des données

Les données dans une Realtime DB sont stockées sous forme **d'objets JSON**.

Les données JSON sont composées de **paires de clé/valeur** :

```json
{
  "clé": "valeur"
}
```

Dans le jargon de Firebase, une donnée de clé est appelé un **noeud**, et peut être accessible via un chemin dédié.

Considérons l'exemple de structure suivante :

```js
{
  "comments": {
    "comm_01": {
      "pseudo": "anish48",
      "created_at": "2022-12-08T18:51:27.484Z",
      "message": "Super article!"
    },
    "comm_02": {
      "pseudo": "lucz",
      "created_at": "2022-12-08T19:20:12.129Z",
      "message": "Excellent! J'ai appris plein de choses."
    },
    "comm_03": {
      "pseudo": "2iane",
      "created_at": "2022-12-09T08:47:12.989Z",
      "message": "Merci pour le partage!"
    }
  }
}
```

Nous disposons ici d'un noeud `comments`, qui contient 3 valeurs :
- `comm_01`
- `comm_02`
- `comm_03`

… qui sont aussi des noeuds.

Le noeud `comments/comm_02` lui, contient la valeur suivante :

```js
{
  "pseudo": "lucz",
  "created_at": "2022-12-08T19:20:12.129Z",
  "message": "Excellent! J'ai appris plein de choses."
}
```

On peut aller jusqu'à tous les niveaux, par exemple si on ne souhaite récupérer que le message du commentaire n°2, on cherchera le noeud `comments/comm_02/message` :

```js
"Excellent! J'ai appris plein de choses."
```

## Éviter les structures imbriquées

Lorsqu'on travaille avec des entités dépendantes, il peut être premièrement tentant de vouloir les imbriquer.

Par exemple, pour modéliser un système d'articles de blogs contenant des commentaires, on pourrait faire de la sorte :

```js
// ❌ Mauvais exemple : NE PAS imbriquer les données comme ceci :
{
  "articles" : {
    "art_01": {
      "title": "Actualité : Concert de musique au coeur de Paris",
      "content": "Quisquam inventore in eos est corrupti distinctio …",
      "comments": {
        "comm_01": { … },
        "comm_02": { … },
        "comm_03": { … }
      }
    },
    "art_02": {
      "title": "Météo : un bilan toujours plus lourd",
      "content": "Ratione laborum facilis ab temporibus ullam alias consequuntur …",
      "comments": {
        "comm_04": { … },
        "comm_05": { … },
        "comm_06": { … }
      }
    }
  }
}
```

Ici, chaque noeud d'article contient un sous-noeud pour les commentaires de cet article.

Dans une Realtime DB, il n'est pas possible de récupérer un « morceau » d'un noeud. Ce dernier est toujours récupéré complètement.

Cela peut vite poser des soucis de performance dans le cas où par exemple, nous aurions simplement besoin d'afficher les titres des articles : il faudra forcément télécharger beaucoup de Mégaoctets de données.

## Aplatir les structures

La solution pour ce type de besoin serait de privilégier les structures dites « **plates** » en séparant les entités distinctement :

```js
{
  // ✔ Noeud séparé pour les articles
  "articles" :
  {
    "art_01": {
      "title": "Actualité : Concert de musique au coeur de Paris",
      "content": "Quisquam inventore in eos est corrupti distinctio …"
    },
    "art_02": {
      "title": "Météo : un bilan toujours plus lourd",
      "content": "Ratione laborum facilis ab temporibus ullam alias consequuntur …"
    }
  },

  // ✔ Noeud séparé pour les commentaires
  "comments":
  {
    "art_01": {
      "comm_01": { … },
      "comm_02": { … },
      "comm_03": { … }
    },
    "art_02": {
      "comm_04": { … },
      "comm_05": { … },
      "comm_06": { … }
    }
  }
}
```

Il est maintenant possible de récupérer chaque entité séparément et au gré des besoins, limitant ainsi les données téléchargées.

---

# Pour aller plus loin

- [Structure your database](https://firebase.google.com/docs/database/web/structure-data)

# Vos points clés à retenir

- Dans une Realtime DB, les données sont stockées au format JSON
- Les données peuvent être accédées via des chemins appelés des noeuds
- Il faut éviter les données imbriquées et préférer les structures plates

# Conclusion

Maintenant que vous en savez un peu plus sur la façon d'organiser vos données, nous allons passer à la découverte du SDK en commençant par récupérer un noeud.

À tout de suite dans le prochain chapitre !