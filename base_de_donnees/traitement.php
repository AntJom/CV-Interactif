<?php
    try{
        $pdo_options = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
            PDO::ATTR_ERRMODE =>  PDO::ERRMODE_EXCEPTION
        );
        $pdo = new PDO('mysql:host=localhost;dbname=donnees_projinfo', 'root', '', $pdo_options);
    }

    catch(Exception $e){
        die('Erreur : '.$e->getMessage());
    }
    
    $prenom = $_POST["prenom"];
    $nom = $_POST["nom"];
    $lycee = $_POST["lycee"];
    $ecoledinge = $_POST["ecoledinge"];
    $expetranger = $_POST["expetranger"];
    
    $donnees = $pdo->prepare('INSERT INTO `donnees` (`prenom`, `nom`, `lycee`, `ecoledinge`, `expetranger`) VALUES (?, ?, ?, ?, ?)');
    $donnees->execute([$prenom, $nom, $lycee, $ecoledinge, $expetranger]);
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8" />   
        <link rel="stylesheet" href="css/style.css" type="text/css" />
        <title>Page web</title>
    </head>
    <body>
    <?php                      
        echo '<span class="prenom">Prénom : ' . $prenom . '</span><br>';

        echo '<span class="nom">Nom : ' . $nom . '</span><br>';

        echo '<span class="lycee">Lycée : ' . $lycee . '</span><br>';

        echo '<span class="ecoledinge">Ecole ingénieur : ' . $ecoledinge . '</span><br>';
        
        echo '<span class="expetranger">Expérience étranger : ' . $expetranger . '</span><br>';
    ?>
    </body>
</html>