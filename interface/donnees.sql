-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 14 jan. 2024 à 22:30
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `donnees_projinfo`
--

-- --------------------------------------------------------

--
-- Structure de la table `donnees`
--

CREATE TABLE `donnees` (
  `id` int NOT NULL,
  `prenom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nom` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(200) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `linkedin` varchar(200) NOT NULL,
  `profil` text NOT NULL,
  `interets` text NOT NULL,
  `competences` text NOT NULL,
  `certifications` text NOT NULL,
  `lycee` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ecoledinge` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `expetranger` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apportsetranger` text NOT NULL,
  `resume` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `donnees`
--

INSERT INTO `donnees` (`id`, `prenom`, `nom`, `email`, `tel`, `linkedin`, `profil`, `interets`, `competences`, `certifications`, `lycee`, `ecoledinge`, `expetranger`, `apportsetranger`, `resume`) VALUES
(129, 'Benjamin', 'MARTINS', 'benjamin.martins@2026.icam.fr', '07 68 50 32 08', 'https://fr.linkedin.com/', 'Je suis passionné par l\'ingénierie et par la conception des objets qui entourent notre quotidien. Je cherche activement à vivre de nouvelles expériences et je suis à l\'aise dans la création de liens sociaux.\r\nNiveau caractère, je fais preuve de beaucoup de patience, considérant cette qualité comme un moteur de persévérance. L\'effort constant accompagne mon parcours, aussi je me considère comme quelqu\'un de créatif, cela me guide vers de nouvelles perspectives enrichissantes et me permet de découvrir de nouveaux horizons.', 'En dehors du cadre professionnel ou scolaire, je me passionne pour plusieurs sujets. Le premier est l\'art. Je m\'intéresse au monde du cinéma aussi bien qu\'il soit français ou américain. Aussi je suis fan de l\'animation japonaise et plus en général de sa culture. Je suis également passionné de littérature. Je lis beaucoup de romans et de mangas. Enfin, la dernière passion qui m\'anime est le sport. Plus précisément le basket. J\'y joue dans l\'équipe sportif de l\'école. C\'est une passion que je pratique maintenant depuis plus de 10 ans et qui m\'a suivie dans ma vie. Il m\'a aussi beaucoup apporté en me faisant comprendre l\'importance du travail d\'équipe.\r\nJe porte également un certain intérêt pour les différentes techniques d\'ingénierie. J\'essaye de me tenir à jour sur les nouvelles technologies du moment.', 'J\'ai pu y développer aussi bien mes soft skills que mes hard skills.\r\nJe peux citer en autre la programmation (html/css et arduino), génie électrique et mécanique ainsi que la maitrise du logiciel de CAO Inventor.\r\nAussi j\'ai du travailler en équipe sur plusieurs projets ce qui m\'a permis de développer ma communication et le travail d\'équipe.', 'Je prépare actuellement à l\'école le TOEIC ainsi que le WIDAF (délivré par la chambre Franco-Allemande du commerce et de l\'industrie) qui certifieront un certain niveau en anglais ainsi qu\'en allemand.\r\nJe peux déjà certifier un certain niveau par mon bulletin :\r\n- Anglais(B2 - 852 TOEIC)\r\n- Allemand(B2 - 550 TOEIC)', 'De 2018 à 2020 j\'effectue mon lycée à Don Bosco Landser. Je prends en première les spécialités Mathématiques - Physique - Sciences de la vie et de la Terre et retire cette dernière en fin d\'année. C\'est avec le Baccalauréat mention \"Bien\" que je pars continuer mes études.', 'En 2021 j\'intègre la classe préparatoire internationale de l\'Ecole ECAM Strasbourg-Europe. J\'y fais ma première année sur le campus de Strasbourg. La spécificité de l\'école nous permet de faire un ERASMUS en deuxième année de prépa.\r\nAprès avoir terminé mon ERASMUS je reviens à Strasbourg pour entamer le cycle ingénieur Arts et Métiers dans lequel j\'effectue actuellement mes études en première année.\r\nCe cursus généraliste me permet d\'avoir une formation dans plusieurs domaines me permettant de me spécialiser en 5ème année.', 'Dans le cadre de ma formation post bac, l\'opportunité de passer 1an à l\'étranger s\'est offerte à moi. J\'ai donc pris mes bagages et me suis envolé vers l\'Italie pour effectuer une année dans l\'Université polytechnique des Marches à Ancône.', 'Participer à l\'aventure ERASMUS offre une expérience d\'apprentissage unique, diversifiée et enrichissante. Tout d\'abord, elle représente une immersion totale dans l\'indépendance. Vivre loin de sa famille, au cœur d\'une métropole, peut être un changement radical. Les démarches administratives liées au pays d\'accueil, ainsi que la recherche d\'un logement, peuvent s\'avérer particulièrement complexes. En cas de difficulté, l\'autonomie devient la clé, car on peut généralement compter uniquement sur soi-même pour résoudre ses problèmes. L\'enrichissement culturel constitue un autre aspect central de cette expérience. Explorer le pays et la ville, engager des discussions avec les habitants locaux, permettent une immersion profonde dans une nouvelle culture. Les amitiés tissées avec d\'autres étudiants ERASMUS, venant des quatre coins du monde, sont des sources constantes d\'échanges culturels, contribuant ainsi à une vision plus complète du monde. Sur le plan pédagogique, en plus des différentes matières abordées en classe, l\'ERASMUS propose une plongée dans de nouvelles méthodes d\'enseignement propre au pays d\'accueil. En conclusion, l\'ERASMUS est bien plus qu\'une expérience académique. Elle forge des individus autonomes, culturellement éclairés et prêts à relever les défis de la vie.', 'La CPII (Cursus Préparatoire Immersion International) est une classe préparatoire à l\'ICAM Strasbourg-Europe.\r\nLa particularité est de suivre un programme en Anglais basé sur la PTSI en 1ère année et faire la 2nd année à l\'étranger dans une école partenaire.\r\nAinsi j\'ai pu y développer des bases techniques en 1re année ainsi que qu\'une ouverture sur le monde en 2ème année.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `donnees`
--
ALTER TABLE `donnees`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `donnees`
--
ALTER TABLE `donnees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
