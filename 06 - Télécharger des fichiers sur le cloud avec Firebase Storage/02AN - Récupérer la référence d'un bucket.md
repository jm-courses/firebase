# Récupérer la référence d'un bucket

À l'issue de ce module, vous serez capable de :

1. Définir ce qu'est un « bucket storage »
2. Être capable de récupérer la référence d'un bucket avec le SDK JavaScript
3. Utiliser les références pour naviguer dans le bucket

---

## Présentation

Un **bucket storage** (en Anglais, _bac de rangement_) est un objet de Firebase permettant de stocker des données à l'échelle d'un Exaoctet, avec une haute disponibilité et une redondance mondiale.

Le service **Firebase Storage** permet de télécharger des fichiers directement depuis les appareils mobiles et les navigateurs web, en gérant les réseaux instables avec facilité.

Chaque bucket peut contenir des fichiers (et même des sous-buckets), et est identifié par un nom unique au sein du projet.

> **Note**
> 
> La redondance mondiale signifie que les données sont stockées sur plusieurs serveurs, dans plusieurs régions géographiques. Cela permet de garantir une disponibilité maximale des données, même en cas de panne d'un serveur.

Afin de pouvoir télécharger et récupérer des fichiers, il faut utiliser une référence vers l'emplacement du fichier dans le bucket.

Voyons comment procéder.

## Récupérer la référence d'un bucket

Une référence permet simplement de **se positionner** à un emplacement précis dans le bucket. On utilse la fonction `ref()` du package `firebase/storage` pour cela.

Par exemple, le code suivant permet de référencer **la racine du bucket** :

```js
import { getStorage, ref } from 'firebase/storage';

const storage = getStorage(app);

const rootRef = ref(storage);
```

Ici, la constante `rootRef` contient une référence vers la racine du bucket.

Si on loggue le contenu de `rootRef.bucket`, on obtient le nom du bucket :

```js
console.log(rootRef.bucket); // "<votre projet>.appspot.com"
```

À noter que la navigation vers un dossier ou fichier se fait simplement en passant le nom du dossier ou fichier en paramètre de la fonction `ref()` :

```js
const imagesRef = ref(storage, 'images');
```

Ici, la constante `imagesRef` est une référence qui pointer vers le dossier `images` situé à la racine du bucket, soit `gs://<votre projet>.appspot.com/images`.

On peut aussi préciser des chemins complets vers des fichiers :

```js
const profilePictureRef = ref(storage, 'images/profile.jpg');
```

Il est important de comprendre que ces éléments **n'ont pas besoin d'exister pour pouvoir être référencés**. Il ne s'agit que d'une adresse virtuelle, vers laquelle on peut créer des fichiers ou récupérer le fichier déjà référencé.

## Naviguer vers d'autres références

Une référence permet de se positionner dans le bucket, mais aussi de naviguer vers d'autres références, grâce aux propriétés `.parent` et `.root` :

```js
const profilePictureRef = ref(storage, 'images/profile.jpg');

const imagesRef = profilePictureRef.parent; // Pointe vers le dossier "images"

const rootRef = profilePictureRef.root; // Pointe vers la racine du bucket
```

On peut aussi récupérer des informations sur la référence en cours, comme le nom du fichier ou le chemin complet :

```js
profilePictureRef.bucket; // '<votre projet>.appspot.com'
profilePictureRef.fullPath; // 'images/profile.jpg'
profilePictureRef.name; // 'profile.jpg'
```

---

# Pour aller plus loin

- [Create a Reference](https://firebase.google.com/docs/storage/web/create-reference?hl=en)

# Vos points clés à retenir

- Un bucket est un objet du cloud Firebase offrant de grandes capacités de stockage.
- Une référence est une adresse virtuelle vers un fichier ou un dossier dans le bucket, que l'on récupère avec la fonction `ref()`.
- On peut naviguer dans le bucket grâce aux propriétés `.parent` et `.root` d'une référence.

# Conclusion

Maintenant que vous savez l'essentiel pour manipuler vos futurs fichiers, nous allons passer à la pratique en commençant par apprendre à envoyer des fichiers dans le bucket.

À tout de suite ! 🙂
