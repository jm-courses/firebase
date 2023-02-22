# Supprimer des fichiers

À l'issue de ce module, vous serez capable de :

1. Supprimer un fichier

---

## Présentation

Vous avez appris à ajouter et lister de façon avancée des fichiers dans un bucket Firebase Storage. Dans ce chapitre, nous allons maintenant simplement parler de la _suppression_.

## Supprimer un fichier

La suppression d'éléments dans Firebase Storage se fait à l'aide de la fonction `deleteObject()` qui prend en paramètre une référence vers le fichier à supprimer.

```js
import { getStorage, ref , deleteObject } from 'firebase/storage';

const storage = getStorage(app);

// Référence vers le fichier à supprimer
const fileToDelete = ref(storage, 'images/mon-image.jpg');

try {
  await deleteObject(fileToDelete);
}
catch (error) {
  console.error("Le fichier n'a pas pu être supprimé", error);
}
```

> **Note**
>
> La suppression avec `deleteObject()` se fait uniquement sur des références de fichiers.
> Pour supprimer un dossier entier, il faut supprimer chaque fichier à l'intérieur du dossier.

---

# Pour aller plus loin

- [Delete a File](https://firebase.google.com/docs/storage/web/delete-files?hl=en)

# Vos points clés à retenir

- La fonction permettant de supprimer une référence de fichier est `deleteObject()`.

# Conclusion

Vous êtes maintenant en capacité de créer, lister et supprimer des fichiers dans votre bucket Firebase Storage.

Le dernier chapitre de ce module va traiter d'un sujet important : les fameuses **règles de sécurité**.

Ne vous inquiétez pas, elles ressemblent beaucoup à celles que vous avez déjà vues dans le module précédent sur _Firestore_.