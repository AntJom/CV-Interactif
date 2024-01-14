<?php
    try{ // connection à la base de données
        $pdo_options = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
            PDO::ATTR_ERRMODE =>  PDO::ERRMODE_EXCEPTION
        );
        $pdo = new PDO('mysql:host=localhost;dbname=donnees_projinfo', 'root', '', $pdo_options);
    }

    catch(Exception $e){
        die('Erreur : '.$e->getMessage());
    }

    // récupération des données du formulaire de inscription.html
    $prenom = $_POST["prenom"];
    $nom = $_POST["nom"];
    $email = $_POST["email"];
    $tel = $_POST["tel"];
    $linkedin = $_POST["linkedin"];
    
    $base = $pdo->prepare('INSERT INTO `donnees` (`prenom`, `nom`, `email`, `tel`, `linkedin`) VALUES (?, ?, ?, ?, ?)');
    $base->execute([$prenom, $nom, $email, $tel, $linkedin]); // insertion des données dans la base
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8" />
        <title>Page web</title>
    </head>
    <body>
    <?php // affichage des données recueillies
        echo '<a href="interface.html"><button>Accueil</button></a><br>';

        echo '<span class="prenom">Prénom : ' . $prenom . '</span><br>';

        echo '<span class="nom">Nom : ' . $nom . '</span><br>';

        echo '<span class="email">Email : ' . $email . '</span><br>';

        echo '<span class="email">Téléphone : ' . $tel . '</span><br>';

        echo '<span class="linkedin">Linkedin : ' . $linkedin . '</span><br>';

        echo '<form action="informations.php" method="POST">';
        echo '<input type="hidden" name="email" value="' . $email . '">';
        echo '<input type="submit" value="Suivant">';
        echo '</form>';
    ?>
    </body>
</html>