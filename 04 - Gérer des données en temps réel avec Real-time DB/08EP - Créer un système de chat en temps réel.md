# Créer un système de chat en temps réel

À l'issue de ce module, vous serez capable de :

1. Réaliser une mini-application web de chat en temps réel

---

## Consigne

À l'aide de ce que vous avez appris dans ce module, vous allez travailler sur l'application "Playground" fournie avec ce cours, dans la page "Real-time DB"

<p align="center">
  <img src="./images/exo-realtime-db.png" width="654" />
</p>

Vous allez devoir dynamiser cette page afin de la transformer en chat en temps-réel.

Voici une animation faisant la démonstration du résultat attendu :

<p align="center">
  <img src="./images/exo-demo.gif" width="832" />
</p>

> Vous constatez qu'il n'est pas possible d'accéder à la page de chat si l'utilisateur n'est pas authentifié.
> Une fois l'utilisateur authentifié avec Firebase, il peut accéder à la page de chat et envoyer des messages.

Vous devez respecter les consignes suivantes :

1. N'autoriser l'accès à la page de chat que si l'utilisateur est authentifié avec Firebase (s'il n'est pas authentifié, rediriger l'utilisateur vers la page d'authentification)

2. Lorsque l'utilisateur est authentifié, il peut accéder à la page de chat et envoyer des messages

3. Lorsque l'utilisateur envoie un message, il doit être stocké dans la Real-time DB et affiché dans la liste des messages.

4. La page doit afficher en temps réel les messages envoyés par les autres utilisateurs.

## Structure d'un document « message »

La structure d'un document « message » dans la Real-time DB doit être la suivante :

```bash
<messageId>     # Identifiant du message
    ├── uid         # Identifiant de l'auteur du message
    ├── author      # Auteur du message
    ├── message     # Contenu du message
    ├── created_at  # Date de création du message
    └── photoURL    # (facultatif) URL de l'image de profil de l'auteur du message si elle existe
```

Vous créerez chaque noeud de message dans un noeud principal appelé `chat-messages` :

```bash
/chat-messages
    ├── <messageId>
    ├── <messageId>
    ├── <messageId>
    └── …
```

## Sécurité de l'application

Les règles de sécurité doivent être configurées de manière à ce que seuls les utilisateurs authentifiés puissent **lire** (`.read`) des messages dans le noeud `/chat-messages`.

Il faut également que chaque nouveau message soit **validé** avant d'être écrit, et respecte les conditions suivantes :

- Ne peuvent écrire (`.write`) que si le message est **nouveau** ou **déjà existant** avec le même `uid` que l'utilisateur authentifié (seul l'auteur du message peut le modifier ou le supprimer).
- Le champs `uid` doit être **identique** à l'`uid` de l'utilisateur authentifié.
- Tous les champs doivent être des chaînes de caractères (`string`).
- Seuls les champs listés ci-dessus doivent être autorisés à être écrits (Utilisez la variable `$other`)

---

En cas de problème, n'hésitez pas à demander de l'aide au formateur.

**Bon courage !**