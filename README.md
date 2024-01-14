# ProjetIt

Pour installer le module npm three, ouvrez une fenêtre de terminal dans le dossier de votre projet et lancez la commande suivante:
npm install --save three

Installez Node.js. On en a besoin pour gérer les dépendances et pour exécuter notre outil de construction.

Il faut aussi un outil de construction, par exemple Vite, à l'aide d'un terminal dans votre dossier de projet. Vite est utilisé pendant le développement, mais il ne fait pas partie de la page web finale. 
Voici la commande pour installer vite :
npm install --save-dev vite

Enfin pour lancer l'hébergeur il suffit de rentre la commande suivante dans le terminal :
npx vite

Pour utiliser l'interface, il faut utiliser Wampserver64. Il faut tout d'abord lancer tous les services.
Il faut ensuite aller dans phpMyAdmin que l'on peut trouver dans la barre des tâches de l'ordinateur en cliquent sur l'icône de Wampserver et se connecter à l'aide de l'identifiant 'root'.
Afin de récupérer la base de données, il faut importer le fichier SQL 'donnees' déposé sur ce Github.
