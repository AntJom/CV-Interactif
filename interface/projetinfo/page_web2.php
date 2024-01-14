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
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="parcours.css">
    <title>Page Web 2</title>
  </head>
  <header>
    <h1><strong> Parcours Académique</strong></h1>
  </header>
  <br>
  <?php
    foreach($liste_donnees as $donnees){  
      echo '<body>';
        echo '<div class="main-container">';
          echo "<img class='profile-image' src='photoetudiantcercle2.png' alt='Photo de l'étudiant'>";
          echo '<div class="content">';
            echo '<h2 class="prenom">' . $donnees['prenom'] . ' ' . $donnees['nom'] . '</h2>';
          echo '</div>';
        echo '</div>';

        echo '<section class="lycee-section">';
          echo '<div>';
            echo '<img class="left-image" src="lycee.jpg" alt="Lycée">';
            echo '<h2><u>Mes études</u></h2>';

            echo '<h3><u>Résumé</u></h3>';
            echo '<span class="resume">' . $donnees['resume'] . '</span>';

            echo '<h3><u>Compétences développées</u></h3>';
            echo '<span class="competences">' . $donnees['competences'] . '</span>';

          echo '</div>';
        echo '</section>';

        echo '<section class="icam-section">';
          echo '<div>';
            echo '<img class="right-image" src="icam.jpg" alt="Lycée">';
            echo '<h2><u>Cycle ingénieur</u></h2>';
            echo '<h3><u>Arts et Métiers</u></h3>';
            echo '<span class="ecoledinge">' . $donnees['ecoledinge'] . '</span><br>';
          echo '</div>';
        echo '</section>';

        echo '<section  class="certifications-section">';
          echo '<div>';
            echo '<img class="left-image" src="certifications.jpg" alt="Lycée">';
            echo '<h2><u>Mes Certifications</u></h2>';
            echo '<span class="certifications">' . $donnees['certifications'] . '</span><br>';
          echo '</div>';
        echo '</section>';
        
        echo '<header>';
          echo "<h1>Mes Centres d'intérêts</h1>";
        echo '</header>';

        echo '<section class="interets-section">';
          echo '<div>';
            echo '<img class="left-image" src="basket.jpg" alt="Lycée">';
            echo "<h2><u>Mes Centres d'intérêts</u></h2>";
            echo "<span class='interets'>" . $donnees['interets'] . "</span><br>";
          echo '</div>';
        echo '</section>';
      echo '</body>';

      echo '<footer>';
        echo '<span class="coordonnees">Coordonnées : ' . $donnees['email'] . ' | ' . $donnees['tel'] . ' © 2024</span>';
      echo '</footer>';
    }
  ?>
</html>
    



	