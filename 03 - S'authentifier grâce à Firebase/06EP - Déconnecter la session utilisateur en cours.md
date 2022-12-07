# Déconnecter la session utilisateur en cours

À l'issue de ce module, vous serez capable de :

1. Déconnecter un utilisateur authentifié

---

## Présentation

Savoir authentifier un utilisateur est une bonne chose, mais un utilisateur peut aussi spontanément vouloir se déconnecter d'une application web.

Une méthode du SDK JavaScript met à disposition une méthode [signOut()](https://firebase.google.com/docs/reference/js/auth.md?hl=en#signout) dont voici la signature :

```js
function signOut(auth: Auth): Promise<void>;
```

L'utilisation de cette fonction est extrêmement simple :

```js
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

async function logout() {
  await signOut(auth);

  console.log(`L'utilisateur a bien été déconnecté !`);
}

logout();
```

Une fois la promesse résolue, le token JWT de session est invalidé et l'utilisateur est déconnecté de sa session.

Il devra à nouveau se reconnecter manuellement pour retrouver une session.

## Challenge : Mettre en place la déconnexion dans la page

Dans la page du projet, un lien de déconnexion portant l'ID `#logout-link` est présent dans le DOM :

```html
<a href="#" class="nav-link" id="logout-link"> Déconnexion </a>
```

Écrivez le code permettant de gérer les clics sur cet élément et ajoutez un comportement de déconnexion de la session Firebase.

---

# Pour aller plus loin

- [Exemple d'utilisation de signOut()](https://firebase.google.com/docs/auth/web/password-auth?hl=en#next_steps)

# Vos points clés à retenir

- La fonction du SDK JavaScript permettant de se déconnecter s'appelle `signOut()`

# Conclusion

Vous êtes maintenant capable de mettre en place un système d'inscription et authentification complet pour vos utilisateurs, grâce à Firebase.