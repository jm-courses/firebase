# QCM

Évaluons vos connaissances sur Realtime Database avec ce QCM

---

## Question 1

**Quelle phrase définit le mieux Realtime Database ?**

- [ ] C'est une base de données relationnelle sur le cloud
- [x] C'est un service de Firebase qui propose de stocker des données en temps réel
- [ ] C'est un système de gestion de bases de données en temps réel
- [ ] C'est une base de données qui peut prendre feu

## Question 2

**Dans quel format sont stockés les données dans une Realtime DB ?**

- [ ] Au format binaire
- [x] Au format JSON
- [ ] Au format XML
- [ ] Au format JavaScript

## Question 3

**Quelle structure est préférable pour stocker des données relationnelles ?**

- [x] Une structure plate
- [ ] Une structure imbriquée
- [ ] Une structure en arbre
- [ ] Une structure en graphe

## Question 4

**Quelle fonction permet de récupérer une instance d'une Database ?**

- [ ] `getDB()`
- [ ] `getRealtimeDB()`
- [x] `getDatabase()`
- [ ] `get()`

## Question 5

**Quelle(s) fonction(s) permet(tent) de supprimer un noeud ?**

- [x] `set()`
- [ ] `delete()`
- [x] `remove()`
- [ ] `update()`

## Question 6

**D'après le code suivant, comment obtenir la référence vers le token de l'utilisateur "John Doe" ?**

```js
{
  "users": {
    "c67bd36a": {
      "name": {
        "first": "James",
        "last": "Smith",
      },
      "token": {
        "uuid": "871251bf-d121-4cfd-a807-177e2cfda331",
        "expires": "1516239022"
      }
    },
    "iwiaWF0I": {
      "name": {
        "first": "John",
        "last": "Doe",
      },
      "token": {
        "uuid": "535c5f94-b0e0-4c4c-817c-e466ee2b65f5",
        "expires": "1499159022"
      }
    }
  }
}
```

- [ ] `ref(db, '/users/name/John/token/uuid')`
- [ ] `ref(db, '/users/c67bd36a/token/uuid')`
- [x] `ref(db, '/users/iwiaWF0I/token/uuid')`
- [ ] `ref(db, '/c67bd36a/token/uuid')`
- [ ] `ref(db, '/iwiaWF0I/token/uuid')`

## Question 7

**Quelle(s) fonction(s) permet(tent) de lire les données dans une Realtime DB ?**

- [x] `onChildAdded()`
- [x] `onUpdate()`
- [x] `get()`
- [ ] `read()`

---

Rendez-vous dans le prochain chapitre où vous aborderez une dernière notion importante concernant les règles de sécurité !