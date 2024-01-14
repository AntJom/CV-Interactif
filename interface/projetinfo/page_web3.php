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

    $prenom = $_POST["prenom"];
    $nom = $_POST["nom"];
    $email = $_POST["email"];
    $tel = $_POST["tel"];
    $linkedin = $_POST["linkedin"];
    $profil = $_POST["profil"];
    $interets = $_POST["interets"];
    $competences = $_POST["competences"];
    $certifications = $_POST["certifications"];
    $lycee = $_POST["lycee"];
    $ecoledinge = $_POST["ecoledinge"];
    $expetranger = $_POST["expetranger"];
    $apportsetranger = $_POST["apportsetranger"];
    $resume = $_POST["resume"];
    
    $supprimer_donnees = $pdo->prepare('DELETE FROM donnees WHERE email = ?');
    $supprimer_donnees->execute([$email]);
  
    $base = $pdo->prepare('INSERT INTO `donnees` (`prenom`, `nom`, `email`, `tel`, `linkedin`, `profil`, `interets`, `competences`, `certifications`, `lycee`, `ecoledinge`, `expetranger`, `apportsetranger`, `resume`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $base->execute([$prenom, $nom, $email, $tel, $linkedin, $profil, $interets, $competences, $certifications, $lycee, $ecoledinge, $expetranger, $apportsetranger, $resume]); // insertion des données dans la base
    
    $reponse = $pdo->query("SELECT * FROM donnees WHERE email = '$email'");
    $liste_donnees = $reponse->fetchAll(PDO::FETCH_ASSOC);
  ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="echange.css">
        <title>Page Web 3</title>
    </head>
    <body>
        <?php // affichage des données recueillies
            foreach($liste_donnees as $donnees){
                echo '<header class="banner">';
                    echo '<div class="banner-text">';
                        echo '<h1>Mon Expérience en Italie</h1>';
                        echo "<p>Une année d'échange inoubliable</p>";
                    echo '</div>';
                echo '</header>';

                echo '<div class="text-and-image">';
                    echo '<div class="round-frame"><img src="pise2.jpg" alt="Moi devant la tour de Pise"></div>';
                    echo '<div class="text-section">';
                        echo '<span class="expetranger">' . $donnees['expetranger'] . '</span><br>';
                    echo '</div>';
                echo '</div>';

                // Section avec la timeline
                echo '<section class="timeline-section">';
                    echo '<div class="content-on-timeline">';
                        echo '<img src="E:\IT_Project\pagesweb\timeline.jpeg" alt="Frise chronologique de mon échange"/>';
                    echo '</div>';
                echo '</section>';
                echo '<br>';
                
                echo "<h2 class='titre-map'>Ce que m'a apporté cette expérience</h2>";

                // Section carte Italie
                echo '<section class="map-section">';
                // Contenu que vous voulez ajouter sur la carte
                    echo '<div class="content-on-map">';
                        echo '<h2>Mes apprentissages</h2>';
                        echo '<span class="apportsetranger">' . $donnees['apportsetranger'] . '</span><br>';
                    echo '</div>';
                echo '</section>';

                echo '<footer>';
                    echo '<div class="lien">';
                        echo '<a target="_blank" href="'. $donnees['linkedin'] . '" class="lien-icone">';
                            echo '<img src="linkedin_icon.png" alt="Linkedin" >';
                        echo '</a>';
                    echo '</div>';
                echo '</footer>';
            }
        ?>
    </body>
</html>