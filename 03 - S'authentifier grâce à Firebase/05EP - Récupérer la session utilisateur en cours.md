# Récupérer la session utilisateur en cours

À l'issue de ce module, vous serez capable de :

1. Comprendre comment Firebase gère les sessions
2. Savoir récupérer une session d'utilisateur existante

---

## Présentation

Une session désigne en informatique l'exécution d'un programme personnalisé en fonction de l'utilisateur. En web, cela se traduit par une page dont le contenu pourra être différent pour chaque utilisateur.

Firebase gère les sessions en utilisant des [JWT (JSON Web Token)](https://jwt.io/) pour reconnaître un visiteur déjà authentifié précédemment. Il s'occupe de délivrer, envoyer et vérifier l'intégrité de ces tokens pour accorder l'accès à des données utilisateur.

Ce processus est transparent lorsqu'on utilise le SDK JavaScript de Firebase, aussi savoir si un utilisateur est correctement loggué est plutôt simple.

Voyons cela.

## Observer les changements d'état de la session

Pour chaque page web nécessitant des informations à propos d'utilisateurs authentifiés, il est possible de déclarer une fonction dite d'observation qui va surveiller tous les changements d'état de la session d'un utilisateur.

Ainsi, lorsqu'un utilisateur déjà authentifié précédemment arrive sur une nouvelle page, on peut récupérer ses informations simplement.

Cette fonction s'appelle `onAuthStateChanged` et prend la signature suivante :

```js
function onAuthStateChanged(
  auth: Auth,
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn,
  completed?: CompleteFn
): Unsubscribe;
```

Les deux premiers paramètres sont obligatoires :

1. l'instance d'authentification
2. une fonction déclenchée lorsque l'état change

Voici un exemple d'utilisation concret :

```js
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

// Au chargement de la page, on enregistre la fonction d'observation
onAuthStateChanged(auth, (user) => {
  if (user) {
    // L'objet `user` existe, donc l'utilisateur
    // qui visite la page est connecté via Firebase
  }
  else {
    // L'objet `user` vaut `null`, donc l'utilisateur est déconnecté
  }
});
```

## Challenge : Mettre en place la persistance de session dans le projet

Maintenant que vous savez comment récupérer une session existante, vous allez devoir mettre en place le comportement suivant dans projet :

> « Lorsqu'un utilisateur déjà connecté précédemment rafraîchit la page web, le header doit automatiquement se mettre à jour avec les données de la session. »
> ![](./images/auth-header-demo-2.png)

---

# Pour aller plus loin

- [Set an authentication state observer and get user data](https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0#set_an_authentication_state_observer_and_get_user_data)

# Vos points clés à retenir

- Le SDK Firebase gère automatiquement le mécanisme des tokens JWT utilisés pour les sessions
- La méthode pour observer les changements d'états de la session s'appelle `onAuthStateChanged`


# Conclusion

Maintenant que vous pouvez conserver un utilisateur authentifié dans votre page web, voyons comment simplement le déconnecter.