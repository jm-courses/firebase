# 03AN - Uploader des fichiers

À l'issue de ce module, vous serez capable de :

1. Uploader des fichiers binaires vers un bucket Firebase Storage
2. Upoader des fichiers textuels vers un bucket Firebase Storage

---

## Présentation

Uploader des fichiers vers un bucket est une opération très simple. Firebase propose via son SDK un ensemble de méthodes spécialement conçues pour cela.

Nous allons voir comment uploader des fichiers de type « _blob_ » (image, vidéo, audio, etc.) et des fichiers de type « _texte_ » (fichier texte, fichier JSON, etc.).

## Uploader des fichiers de type « _blob_ »

Un « _blob_ » est un fichier qui contient des **données binaires**. Il peut s'agir d'une image, d'une vidéo, d'un fichier audio, etc.

On utilise la méthode `uploadBytes()` pour ce type de fichier :

```js
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage(app);

// 1. Crée la référence vers le futur fichier
const imageRef = ref(storage, 'images/myImage.png');

// 2. Upload du fichier "file"
const result = await uploadBytes(imageRef, file);
```

Expliquons ce code :

1. On souhaite créer un nouveau fichier vers l'emplacement `images/myImage.png` dans le bucket. On utilise la méthode `ref()` pour créer une nouvelle référence d'emplacement.

2. On utilise la méthode `uploadBytes()` pour uploader le fichier `file` vers l'emplacement `images/myImage.png`.

La méthode `uploadBytes()` renvoie une promesse qui contient un objet de type [UploadResult](https://firebase.google.com/docs/reference/js/storage.uploadresult.md?hl=en#uploadresult_interface), contenant les métadonnées du fichier uploadé, et sa référence.

Elle prend en argument la référence, et un objet de type `Blob` (dans l'exemple ci-dessus, il s'agit de la variable `file`).

[Blob est un objet JavaScript natif](https://developer.mozilla.org/fr/docs/Web/API/Blob) qui représente ensemble de données binaires.

On peut en créer à la volée comme ceci :

```js
const file = new Blob([`{"name":"JM","age":"30"}`], {type:'application/json'});
```

On peut utiliser `Blob` de plein de manières différentes, mais généralement quand on traite des fichiers utilisateurs dans le Web, on les récupère par le biais d'un formulaire avec **un champs `<input type="file">`** :

```html
<input type="file" id="monFichier" />
```

Lors de l'envoi du formulaire, le fichier sera accessible via la propriété `files` de l'élément `<input>` :

```js
const file = document.getElementById('monFichier').files[0];

const result = await uploadBytes(imageRef, file);

console.log(`Le fichier ${result.metadata.name} a été uploadé avec succès vers /${imageRef.parent.fullPath}/`);
```

> **Note**
> Pour plus d'informations sur l'API File JavaScript, vous pouvez consulter cette excellente ressource : [File et FileReader](https://fr.javascript.info/file), de JavaScript.info.

## Uploader des fichiers de type « _texte_ »

Uploader des fichiers textuels est encore plus simple que les fichiers binaires. On utilise la méthode `uploadString()` pour ce type de fichier :

```js
import { ref, uploadString } from 'firebase/storage';

const helloRef = ref(storage, 'hello.txt');

const result = await uploadString(helloRef, 'Hello world!');

console.log(`Le fichier ${result.metadata.name} a été uploadé avec succès vers /${helloRef.parent.fullPath}`);
```

> **Note**
>
> La méthode `uploadString()` accepte un troisième argument optionnel qui permet de spécifier le format de la chaîne de caractère. Par défaut, la valeur est `raw`, mais elle peut être `base64`, `base64url`, `data_url` ou `url`.


---

# Pour aller plus loin

- [Upload files](https://firebase.google.com/docs/storage/web/upload-files?hl=en#upload_files)

# Vos points clés à retenir

- La méthode `uploadBytes()` permet d'uploader des fichiers binaires.
- La méthode `uploadString()` permet d'uploader des fichiers textuels.
- Ces deux méthodes retournent une promesse contenant une valeur de type [UploadResult](https://firebase.google.com/docs/reference/js/storage.uploadresult.md?hl=en#uploadresult_interface).

# Conclusion

Maintenant que vous savez uploader des fichiers vers un bucket, nous allons voir comment les gérer de façon plus précise en monitorant leur progression.

Rendez-vous dans le chapitre suivant.
