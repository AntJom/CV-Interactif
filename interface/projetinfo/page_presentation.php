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
        <link rel="stylesheet" href="lycee.css"> <!-- Assurez-vous d'ajouter votre fichier CSS -->
        <title>Page de présentation</title>
    </head>
    <body>
        <header>
            <h1 class="main-title">Qui suis-je ?</h1>
        </header>

        <div class="top-section">
            <div class="spline-element2">
                <script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.28/build/spline-viewer.js"></script>
                <spline-viewer url="https://prod.spline.design/LZeqDlmD6owZaWvV/scene.splinecode"></spline-viewer>
            </div>
        </div>

        <?php
            foreach($liste_donnees as $donnees){
                echo '<div class="main-section">';
                    echo '<div class="left-section">';
                        echo '<div class="profile-description">';
                            echo '<h2>Profil</h2>';
                            echo '<span class="profil">' . $donnees['profil'] . '</span><br>';
                        echo '</div>';

                        echo '<div class="interests">';
                            echo '<h2>Passions/Intérêts/Loisirs</h2>';
                            echo '<span class="interets">' . $donnees['interets'] . '</span><br>';
                        echo '</div>';
                    
                        echo '<div class="education">';
                            echo '<h2>Parcours scolaire depuis le lycée</h2>';
                            echo '<span class="lycee">' . $donnees['lycee'] . '</span><br>';
                        echo '</div>';
                    echo '</div>';
                    
                    echo '<div class="right-section">';
                        echo '<div class="spline-element">';
                            echo '<script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.28/build/spline-viewer.js"></script>';
                            echo '<spline-viewer url="https://prod.spline.design/HVJKH4ZKmYrmeh7w/scene.splinecode"></spline-viewer>';
                        echo '</div>';
                    echo '</div>';
                echo '</div>';

                echo '<footer>';
                    echo '<div class="contact-info">';
                        echo '<span class="coordonnees">Coordonnées : ' . $donnees['email'] . ' | ' . $donnees['tel'] . ' © 2024</span>';
                    echo '</div>';
                echo '</footer>';
            }
        ?>
    </body>
</html>