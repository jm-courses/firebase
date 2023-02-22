# 04AN - Gérer et Monitorer le téléchargement des fichiers

À l'issue de ce module, vous serez capable de :

1. Mettre en pause ou annuler un téléchargement.
2. Calculer la progression d'un téléchargement.
3. Récupérer l'URL de téléchargement d'un fichier présent dans le bucket.

---

## Présentation

Afin d'offrir une expérience utilisateur optimale, on peut vouloir proposer des options de mise en pause, de reprise ou d'annulation d'un téléchargement.

Pour gérer des téléchargements volumineux, il peut aussi être intéressant de donner à l'utilisateur une idée de la progression du téléchargement.

Firebase Storage propose des solutions pour gérer tout cela. Voyons-les ensemble.

## Monitorer le téléchargement des fichiers

Afin de monitorer le téléchargement des fichiers, nous allons voir les méthodes `.pause()`, `.resume()` et `.cancel()` de l'objet [UploadTask](https://firebase.google.com/docs/reference/js/storage.uploadtask.md?hl=en#uploadtask_interface).

Afin de pouvoir utiliser ces méthodes, on devra utiliser la méthode `uploadBytesResumable()` au lieu de `uploadBytes()` (que nous avons vu dans le chapitre précédent).

> **Warning**
>
> Attention, la méthode `uploadBytesResumable()` ne retourne pas une promesse, mais directement un objet de type `UploadTask`.
> Il ne faut donc pas utiliser le mot clé `await` devant cette méthode.

Cette méthode va retourne l'objet de type `UploadTask`, sur lequel il sera possible d'implémenter les méthodes de monitoring :

```js
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const storage = getStorage(app);

const fileRef = ref(storage, 'videos/myVideo.mp4');

const uploadTask = uploadBytesResumable(fileRef, file); // file est un Blob

uploadTask.pause(); // Pause le téléchargement
uploadTask.resume(); // Reprise du téléchargement
uploadTask.cancel(); // Annulation du téléchargement
```

Il est donc possible côté client d'implémenter des boutons cliquables pour mettre en pause, reprendre ou annuler un téléchargement en cours.

## Gérer la progression du téléchargement

Lors d'un téléchargement de fichier volumineux, il peut être intéressant de donner à ses utilisateurs une idée de la progression du téléchargement.

C'est pourquoi il est possible sur une `UploadTask` créée avec `uploadBytesResumable()` **d'écouter des événements sur la tâche en cours**.

On utilise pour cela la méthode `.on()` pour écouter l'événement nommé **`state_changed`** :

```js
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const storage = getStorage(app);

const fileRef = ref(storage, 'videos/myVideo.mp4');

const uploadTask = uploadBytesResumable(fileRef, file); // file est un Blob

uploadTask.on('state_changed',
  // 1. Obtenir la progression du téléchargement
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Progression du téléchargement : ${progress}%`);
  },
  // 2. Gérer les erreurs
  (error) => {
    console.error('Une erreur est survenue : ', error);
  },
  // 3. Téléchargement terminé avec succès
  () => {
    console.log('Le téléchargement est terminé !');
  }
);
```

Comme on le voit dans le code ci-dessus, la méthode `.on()` prend 3 fonctions en paramètres :

1. La première fonction est appelée à chaque fois que l'état de la tâche change, et transmet en paramètre un objet de type [UploadTaskSnapshot](https://firebase.google.com/docs/reference/js/storage.uploadtasksnapshot.md?hl=en#uploadtasksnapshot_interface) qui contient des informations sur la tâche en cours.
  C'est avec cet objet que l'on peut calculer la progression du téléchargement grâce aux propriétés `bytesTransferred` et `totalBytes`.

2. La deuxième fonction est appelée en cas d'erreur, et transmet en paramètre un objet de type [FirebaseError](https://firebase.google.com/docs/reference/js/firebase.error.md?hl=en#firebaseerror_interface).

3. La troisième fonction est appelée lorsque le téléchargement s'est terminé avec succès.

### Obtenir l'URL d'un fichier

On a parfois besoin de pouvoir partager une URL permettant aux utilisateurs de télécharger eux-même le fichier stocké dans un bucket.

Pour cela, on utilise la fonction `getDownloadURL()` du package `firebase/storage`, qui prend en paramètre une référence de fichier et renvoie une promesse contenant l'URL du fichier.

> **Warning**
> Attention, la référence doit pointer vers un fichier existant dans le bucket, sinon la promesse sera rejetée.

On peut par exemple l'invoquer à la fin d'un téléchargement :

```js
import { …, getDownloadURL } from 'firebase/storage';
…

uploadTask.on('state_changed',
  …,
  …,
  // 3. Téléchargement terminé avec succès
  async () => {
    const url = await getDownloadURL(uploadTask.snapshot.ref);

    console.log(`Le fichier est téléchargeable à l'adresse : ${url}`);
  }
);
```

---

# Pour aller plus loin

- [Manage Uploads](https://firebase.google.com/docs/storage/web/upload-files?hl=en#manage_uploads)

# Vos points clés à retenir

- On créer une tâche de téléchargement avec la méthode `uploadBytesResumable()`.
- On peut monitorer le téléchargement d'un fichier avec les méthodes `.pause()`, `.resume()` et `.cancel()` de l'objet `UploadTask`.
- On peut calculer la progression du téléchargement d'un fichier avec les propriétés `bytesTransferred` et `totalBytes`
- On récupère l'URL d'un fichier avec la fonction `getDownloadURL()`.

# Conclusion

Vous connaissez maintenant toutes les possibilités offertes par Firebase Storage pour gérer en détails le téléchargement de fichiers.

Voyons maintenant comment lister les fichiers d'un bucket.
