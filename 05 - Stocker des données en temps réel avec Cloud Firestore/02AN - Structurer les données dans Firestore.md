# Structurer les données dans Firestore

À l'issue de ce module, vous serez capable de :

1. Définir les termes de « collection » et de « document » 
2. Reconnaître les différents types de données dans Firestore
3. Savoir comment créer des collections et des documents

## Afficher les documents d'une requête en temps réel

---

## Présentation

Bien comprendre comment les données sont organisées dans Firestore est essentiel pour pouvoir les manipuler correctement.

De plus, Firestore introduit la notion de données typées, que nous allons découvrir également dans ce chapitre.



## Collection et Document

### Document

Dans Firestore, les données sont structurées sous forme de **documents** et de **collections**.

Un document est un **objet JSON** qui représente une entrée unique dans la base de données.

Voici un exemple de document représentant un utilisateur avec ses informations de base (nom, âge, adresse e-mail)  : 

```js
{
  "id": "2WPMOqbv0KwzsD1viC3p",
  "name": "John Doe",
  "age": 30,
  "email": "johndoe@example.com",
  "isAlive": true,
  "birthdate": new Date('1980-01-01T10:35:00.000Z'),
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zipcode": "94105"
  },
}
```

Chaque document a une clé unique `id` qui lui est associée. Les documents peuvent contenir des champs simples (tels que des chaînes, des nombres, des booléens, etc.) ou des sous-collections, qui sont des collections incluses dans le document.

Les différents types de données possibles sont :

- **Text string** : chaîne de caractères
- **Boolean** : valeur Booléenne (`true` ou `false`)
- **Bytes** : données binaires
- **Array** : tableau
- **Date and time** : date et heure
- **Floating-point** : nombre à virgule flottante
- **Geographical point** : point géographique
- **Integer** : nombre entier
- **Map** : objet JSON (sous-collection)
- **Null** : valeur nulle
- **Reference** : référence à un autre document via son `id`

### Collection

Les collections sont des **groupes de documents liés** qui peuvent être consultés ensemble. Par exemple, vous pouvez avoir une collection de utilisateurs, où chaque document représente un utilisateur unique.

Généralement, le SDK Firestore permet de récupérer les documents sous forme de tableau d'objets :

```js
[
  { "id": "2WPMOqbv0KwzsD1viC3p" , … },
  { "id": "AkZ4ZGdkjDMj2ga989N4" , … },
  …
]
```

Firestore offre une grande flexibilité dans la structure des données en permettant de stocker des documents de différentes formes et tailles dans une seule collection. Cela peut faciliter l'organisation et la gestion des données dans les applications plus complexes.

---

# Pour aller plus loin

- [Cloud Firestore Data model](https://firebase.google.com/docs/firestore/data-model)
- [Supported data types](https://firebase.google.com/docs/firestore/manage-data/data-types)

# Vos points clés à retenir

- Dans Firestore, les données sont structurées sous forme de **documents**, qui appartiennent à des **collections**.
- Chaque document a une clé unique `id` qui lui est associée.
- Les documents peuvent contenir des champs simples (tels que des chaînes, des nombres, des booléens, etc.) ou des sous-collections, qui sont des collections incluses dans le document.

# Conclusion

Maintenant que vous connaissez un peu mieux la structure des données dans Firestore, évaluons vos connaissances avec le quiz suivant.

À tout de suite 🙂