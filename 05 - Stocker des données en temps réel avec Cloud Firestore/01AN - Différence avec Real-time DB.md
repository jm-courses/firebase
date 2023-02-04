# Différence avec Real-time DB

À l'issue de ce module, vous serez capable de :

1. Comprendre la différence entre Real-time DB et Firestore
2. Savoir quand utiliser l'un ou l'autre

---

## Présentation

Real-time DB et Firestore sont deux services de bases de données NoSQL en temps réel proposés par Firebase.

Choisir entre l'un et l'autre peut s'avérer compliqué, car ils ont des fonctionnalités similaires, mais aussi des différences.

Dans ce chapitre, nous allons voir ces différences, et voir quand utiliser l'un ou l'autre.

## Quelles sont les différences entre Real-time DB et Firestore ?

Real-time Database et Firestore sont tous les deux des systèmes de gestion de bases de données en temps réel développés par Firebase, mais ils ont certaines différences clés :

### 1. Modèle de données

<img src="./images/data-model.png" alt="Modèle de données" width="128" align="left" />

Real-time Database utilise un **modèle de données en arborescence**, tandis que Firestore utilise un **modèle de documents**. Cela signifie que Firestore est **plus flexible et permet une organisation plus naturelle des données**.

<a href="https://www.flaticon.com/free-icons/data-flow" target="_blank" style="display: block; clear: both;">(Source : Freepik - Flaticon)</a>

### 2. Scalabilité

<img src="./images/scalability.png" alt="Scalabilité" width="128" align="left" />

Firestore est conçu pour être plus facilement évolutif que Real-time Database. Firestore peut **gérer des quantités considérables de données** et de nombreux utilisateurs en même temps sans sacrifier les performances.

<a href="https://www.flaticon.com/free-icons/scalability" target="_blank" style="display: block; clear: both;">(Source : Freepik - Flaticon)</a>

### 3. Requêtes

<img src="./images/requests.png" alt="Requêtes" width="128" align="left" />

L'API de Firestore offre des capacités de requête plus avancées que celle de Real-time Database, ce qui en fait un choix plus efficace pour des applications plus complexes.

<a href="https://www.flaticon.com/free-icons/request" target="_blank" style="display: block; clear: both;">(Source : Freepik - Flaticon)</a>

### 4. Sécurité

<img src="./images/security.png" alt="Sécurité" width="128" align="left" />

Les deux systèmes proposent des options de sécurité similaires, mais Firestore permet une gestion plus fine des autorisations en utilisant des règles de sécurité basées sur des expressions.

<a href="https://www.flaticon.com/fr/icones-gratuites/la-cyber-securite" target="_blank" style="display: block; clear: both;">(Source : Freepik - Flaticon)</a>


## Quand choisir l'un ou l'autre ?

Il existe plusieurs facteurs à prendre en compte pour déterminer si vous devez utiliser Real-time Database ou Firestore pour votre application :

1. **Taille et structure des données :** Si vos données sont relativement petites et bien structurées, Real-time Database peut être un choix adéquat. Si vos données sont plus complexes et nécessitent une organisation plus flexible, Firestore peut être un meilleur choix.

2. **Requêtes de données :** Si vos requêtes de données sont simples et ne nécessitent pas de filtres complexes, Real-time Database peut suffire. Si vous avez besoin de requêtes plus avancées, Firestore est plus adapté.

3. **Évolutivité :** Si vous prévoyez une croissance rapide du nombre d'utilisateurs ou de données, Firestore est plus évolutif et capable de gérer les charges de travail plus importantes.

En fin de compte, le choix dépend des besoins spécifiques de votre application. Il est toujours utile de consulter la documentation de Firebase et de faire des tests pour déterminer le système le plus adapté à vos besoins.

---

# Pour aller plus loin

- [Choose a database: Cloud Firestore or Realtime Database](https://firebase.google.com/docs/firestore/rtdb-vs-firestore)

# Vos points clés à retenir

- Firestore est un service de base de données NoSQL en temps réel développé par Firebase.
- Il différe de Real-time Database par son modèle de données, sa scalabilité, ses requêtes et sa sécurité.

# Conclusion

Le choix entre Real-time Database et Firestore dépend des besoins spécifiques de l'application. Si vous avez besoin d'une solution simple et rapide pour gérer des données en temps réel, Real-time Database peut être un choix adéquat. Si vous avez besoin d'une solution plus flexible et évolutive, Firestore est une option plus adaptée.

Maintenant que vous connaissez les différences entre les deux services de base de données, nous allons voir de façon plus précises comment sont structurées les données dans Firestore.

Rendez-vous dans le prochain chapitre.