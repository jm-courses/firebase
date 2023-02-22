# Créer un système de Drive

À l'issue de ce module, vous serez capable de :

1. Réaliser un système de Drive simple permettant à des utilisateurs connectés de stocker et télécharger des fichiers sur le cloud.

---

## Consigne

À l'aide de ce que vous avez appris dans ce module, vous allez travailler sur l'application "Playground" fournie avec ce cours, dans la page "Storage" :

<p align="center">
  <img src="./images/exo-storage.png" width="654" />
</p>

Vous allez devoir dynamiser cette page afin de permettre **l'envoi** et le **listing** de fichiers de l'utilisateur connecté.

Chaque utilisateur doit avoir son propre dossier dans lequel il peut stocker ses fichiers, et il doit pouvoir les télécharger depuis cette même page.

### Description de l'exercice

Voici une animation faisant la démonstration du résultat attendu :

<p align="center">
  <img src="./images/exo-demo.gif" width="832" />
</p>

> Vous constatez qu'il n'est pas possible d'accéder à la page d'upload si l'utilisateur n'est pas authentifié.
> Une fois l'utilisateur authentifié avec Firebase, il peut uploader et télécharger ses fichiers.

Vous devez respecter les consignes suivantes :

1. N'autoriser l'accès à la page d'envoi que si l'utilisateur est authentifié avec Firebase (s'il n'est pas authentifié, rediriger l'utilisateur vers la page d'authentification)

2. La barre de progression doit être mise à jour en temps réel pendant l'envoi du fichier.

3. Il doit être possible d'annuler l'envoi d'un fichier en cours.

4. Chaque utilisateur connecté doit avoir sa propre liste de fichiers, stockées dans un dossier contenant son identifiant _Firebase Authentication_.

5. Les règles de sécurité doivent être mises à jour pour permettre à l'utilisateur de lire et écrire uniquement dans son dossier.

6. Il doit être possible de télécharger un fichier depuis la liste en cliquant dessus.

7. Il doit être possible de supprimer un fichier depuis la liste.

---

En cas de problème, n'hésitez pas à demander de l'aide au formateur.

**Bon courage !**