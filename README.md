Bonjour Monsieur, dans l'état actuel du programme (04/03), ce dernier est capable de
scraper l'ensemble des établissements étoilés du Michelin.
La partie Lafourchette est encore en développement car j'ai été malade ces derniers jours.

Pour executer le script, il n'y a normalement rien à installer, car les packages sont dans le git.
Commandes : "node server.js" et "node lafourchette.js" (ne fonctionne pas encore).

Le server.js récupère dans un premier temps toutes les urls associées aux restaurants michelin étoilés, 
afin d'accéder à leur page individuelle et ce de manière asynchrone.
Dans un second temps, toujours de façon asynchrone, le script va chercher le nom ainsi que le code postal du 
restaurant visé, afin de pouvoir comparer ces derniers avec la base de données de lafourchette.

Les informations sont finalement enregistrées dans restos.json.
Si vous tentez d'exécuter le script et qu'une erreur timeout survient, relancez directement l'intégralité du
script, car les erreurs entrainent le rejet des promesses associées au requêtes et donc au promise.all.