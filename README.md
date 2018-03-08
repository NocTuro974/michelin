Bonjour Monsieur, dans l'état actuel du projet (09/03), les deux scripts : server.js et lafourchette.js sont fonctionnels et permettent
de récupérer toutes les promotions des restaurants étoilés sur lafourchette.

Pour executer le script, il n'y a normalement rien à installer, car les packages sont dans le git.
Commandes : "node server.js" et "node lafourchette.js".

Le server.js récupère dans un premier temps toutes les urls associées aux restaurants michelin étoilés,
afin d'accéder à leur page individuelle et ce de manière asynchrone.
Dans un second temps, toujours de façon asynchrone, le script va chercher le nom ainsi que le code postal du
restaurant visé, afin de pouvoir comparer ces derniers avec la base de données de lafourchette.

Les informations sont finalement enregistrées dans restos.json.
Si vous tentez d'exécuter le script et qu'une erreur timeout survient, relancez directement l'intégralité du
script, car les erreurs entrainent le rejet des promesses associées au requêtes et donc au promise.all.

La fourchette.js se sert de l'api mobile et opère de la façon suivante :
- récupère l'id du restaurant, s'il existe, parmi les résultats d'une requête par nom
- récupère les promotions via une seconde requête, et les filtre pour ne donner que les résultats pertinents.
- log les résultats directement dans la console.

Bonne correction.
