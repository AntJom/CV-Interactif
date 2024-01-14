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

    $email = $_POST["email"];
    
    $reponse = $pdo->query("SELECT * FROM donnees WHERE email = '$email'");
    $liste_donnees = $reponse->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire</title>
</head>
<body>
    <a href="interface.html"><button>Accueil</button></a><br>

    <?php
        foreach($liste_donnees as $donnees){
            echo '<form action="projetinfo/page_presentation.php" method="post" target="_blank">';
                echo "<label for='interets'>Centres d'intérêts :</label>";
                echo '<input type="text" id="interets" name="interets" value="' . $donnees['interets'] . '" required><br>';
        
                echo '<label for="profil">Profil :</label>';
                echo "<input type='text' id='profil' name='profil' value='" . $donnees['profil'] . "' required><br>";

                echo '<label for="lycee">Lycée :</label>';
                echo "<input type='text' id='lycee' name='lycee' value='" . $donnees['lycee'] . "' required><br>";
                
                echo "<input type='hidden' name='prenom' value='" . $donnees['prenom'] . "'>";
                echo "<input type='hidden' name='nom' value='" . $donnees['nom'] . "'>";
                echo "<input type='hidden' name='email' value='" . $donnees['email'] . "'>";
                echo "<input type='hidden' name='tel' value='" . $donnees['tel'] . "'>";
                echo "<input type='hidden' name='linkedin' value='" . $donnees['linkedin'] . "'>";
                echo "<input type='hidden' name='resume' value='" . $donnees['resume'] . "'>";
                echo "<input type='hidden' name='competences' value='" . $donnees['competences'] . "'>";
                echo "<input type='hidden' name='certifications' value='" . $donnees['certifications'] . "'>";
                echo "<input type='hidden' name='ecoledinge' value='" . $donnees['ecoledinge'] . "'>";
                echo "<input type='hidden' name='expetranger' value='" . $donnees['expetranger'] . "'>";
                echo "<input type='hidden' name='apportsetranger' value='" . $donnees['apportsetranger'] . "'>";
                
                echo '<input type="reset">';

                echo '<input type="submit" value="Enregistrer et ouvrir un aperçu de la deuxième page web dans un nouvel onglet">';
            echo '</form>';

            echo '<form action="projetinfo/page_web2.php" method="post" target="_blank">';

                echo "<label for='certifications'>Certifications :</label>";
                echo "<input type='text' id='certifications' name='certifications' value='" . $donnees['certifications'] . "' required><br>";

                echo "<label for='resume'>Résumé :</label>";
                echo "<input type='text' id='resume' name='resume' value='" . $donnees['resume'] . "' required><br>";

                echo "<label for='ecoledinge'>Ecole d'ingénieur :</label>";
                echo "<input type='text' id='ecoledinge' name='ecoledinge' value='" . $donnees['ecoledinge'] . "' required><br>";

                echo '<label for="competences">Compétences :</label>';
                echo "<input type='text' id='competences' name='competences' value='" . $donnees['competences'] . "' required><br>";
            
                echo "<input type='hidden' name='prenom' value='" . $donnees['prenom'] . "'>";
                echo "<input type='hidden' name='nom' value='" . $donnees['nom'] . "'>";
                echo "<input type='hidden' name='email' value='" . $donnees['email'] . "'>";
                echo "<input type='hidden' name='tel' value='" . $donnees['tel'] . "'>";
                echo "<input type='hidden' name='linkedin' value='" . $donnees['linkedin'] . "'>";
                echo "<input type='hidden' name='profil' value='" . $donnees['profil'] . "'>";
                echo "<input type='hidden' name='expetranger' value='" . $donnees['expetranger'] . "'>";
                echo "<input type='hidden' name='apportsetranger' value='" . $donnees['apportsetranger'] . "'>";
                echo "<input type='hidden' name='lycee' value='" . $donnees['lycee'] . "'>";
                echo "<input type='hidden' name='interets' value='" . $donnees['interets'] . "'>";

                echo '<input type="reset">';

                echo '<input type="submit" value="Enregistrer et ouvrir un aperçu de la première page web dans un nouvel onglet">';
            echo '</form>';

            echo '<form action="projetinfo/page_web3.php" method="post" target="_blank">';
                echo "<label for='expetranger'>Experience à l'étranger :</label>";
                echo "<input type='text' id='expetranger' name='expetranger' value='" . $donnees['expetranger'] . "' required><br>";

                echo "<label for='apportsetranger'>Ce que l'expérience à l'étranger m'a apporté :</label>";
                echo "<input type='text' id='apportsetranger' name='apportsetranger' value='" . $donnees['apportsetranger'] . "' required><br>";
                
                echo "<input type='hidden' name='prenom' value='" . $donnees['prenom'] . "'>";
                echo "<input type='hidden' name='nom' value='" . $donnees['nom'] . "'>";
                echo "<input type='hidden' name='email' value='" . $donnees['email'] . "'>";
                echo "<input type='hidden' name='tel' value='" . $donnees['tel'] . "'>";
                echo "<input type='hidden' name='linkedin' value='" . $donnees['linkedin'] . "'>";
                echo "<input type='hidden' name='profil' value='" . $donnees['profil'] . "'>";
                echo "<input type='hidden' name='interets' value='" . $donnees['interets'] . "'>";
                echo "<input type='hidden' name='competences' value='" . $donnees['competences'] . "'>";
                echo "<input type='hidden' name='certifications' value='" . $donnees['certifications'] . "'>";
                echo "<input type='hidden' name='lycee' value='" . $donnees['lycee'] . "'>";
                echo "<input type='hidden' name='ecoledinge' value='" . $donnees['ecoledinge'] . "'>";
                echo "<input type='hidden' name='resume' value='" . $donnees['resume'] . "'>";

                echo '<input type="reset">';

                echo '<input type="submit" value="Enregistrer et ouvrir un aperçu de la troisième page web dans un nouvel onglet">';
            echo '</form>';
        }
    ?>
</body>
</html>