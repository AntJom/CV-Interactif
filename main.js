import * as THREE from 'three';                                                                         //permet d'importer la bibliothèque three.js en entier
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';                                        // importe la classe GLTFLoader permettant de télécharger la scène du modèle 3D
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';                           //importe le module OrbitControls pour créer les commandes permettant à l'utilisateur de controler la caméra


const scene = new THREE.Scene();                                                                        //crée une nouvelle scène
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);      //crée une instance de caméra en perspective



const renderer = new THREE.WebGLRenderer();                                                             // crée un renderer permettant de générer la scène
renderer.setSize(window.innerWidth, window.innerHeight);                                                //configure la taille à l'écran du rendu du renderer
document.body.appendChild(renderer.domElement);                                                         //permet de dire dans quelle "conteneur" on va trouver notre renderer (dans le domElement)
const controls = new OrbitControls(camera,renderer.domElement);                                         //crée les commandes qui pourront être utilisées par l'utilisateur pour se déplacer sur la scène

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);                                             // crée une lumière ambiente pour éclairer la scène
scene.add(ambientLight);                                                                                //ajoute la lumière à la scène

let ground;                                                                                             //définitons de variables qui serviront pour faire le sol de la scène, la voiture, les bâtiments et les places de parking
let car;
let icam;
let maison;
let cottage;
let groundparking1;
let groundparking2;


                 


const icamBoundingBox = new THREE.Box3();                                                               // Créer une boîte englobante pour chaque bâtiment, place de parking
const cottageBoundingBox = new THREE.Box3();
const parking1BoundingBox = new THREE.Box3();
const maisonBoundingBox = new THREE.Box3();
const parking2BoundingBox = new THREE.Box3();

const geometry = new THREE.BoxGeometry(10,3,5);                                                         //crée une boîte transparente sur le parking 1
const material = new THREE.MeshBasicMaterial({  color: 0x00ff00 , transparent: true , opacity : 0});
const parking1 = new THREE.Mesh( geometry, material );
parking1.position.y = -0.28;                                                                            //positionnement du parking 1
parking1.position.z = -20;
scene.add(parking1);                                                                                    //ajout de la boîte transparente à la scène


const parking2 = new THREE.Mesh( geometry, material );                                                  //crée une boîte transparente sur le parking 2
parking2.position.x = -22;                                                                              //positionnement du parking 2
parking2.position.z = 0;
parking2.position.y = 0;
scene.add(parking2);                                                                                    //ajout de la boîte transparente à la scène



const direction = new THREE.Vector3(1, 0, 0);                                                           //Vecteur de direction initial, dirigé vers l'axe x
const clock = new THREE.Clock()                                                                         //ajout d'une montre pour se répérer dans le temps lors des animations sur la scène 
let speed = 0;                                                                                          //variable détenant une valeur de vitesse



const coordinatesDiv = document.getElementById('coordinates');                                          //sélectionne un élément HTML spécifique ayant l'ID 'coordinates' 

//chargement, placement, ajustement de la taille de la voiture sur la scène. Création d'une boîte englobant la voiture
const carBoundingBox = new THREE.Box3();                                                                //Créer une boîte qui peut englober un objet
const loader = new GLTFLoader();                                                                        //crée un loader pour charger les fichiers en format gltf
loader.load('models/voiture.glb', (gltf) => {                                                           //charge le modèle 3D de la voiture réalisée sur Blender
  car = gltf.scene;                                                                                     
  scene.add(car);                                                                                       //ajoute le modèle 3D de la voiture à la scène
  
  car.rotation.set(0, 0, 0);                                                                            //Réinitialise la rotation de la voiture 
  car.scale.set(2,2,2)                                                                                  //augmente la taille de la voiture sur la scène



  const box = new THREE.Box3().setFromObject(car);                                                      // Créer une boîte qui englobe la voiture
  const center = box.getCenter(new THREE.Vector3());                                                    //crée un vecteur 3D 

  controls.target.copy(center);                                                                         //place le vecteur 3D au centre de la voiture
  controls.update();                                                                                    //actualise les commandes de la caméra 
  carBoundingBox.setFromObject(car);                                                                    //Créer une boîte englobant la voiture
});





//chargement, placement, ajustement de la taille de l'ICAM sur la scène
loader.load( 'models/icam.glb', (gltf) => { 
  icam = gltf.scene;
  icam.position.x = 3;
  icam.position.y = 0.5;
  icam.position.z = -50;
  icam.scale.set(5,5,5);
  icam.rotation.set(0, Math.PI, 0);
  scene.add(icam);
  renderer.render( scene, camera );

});



//chargement, placement, ajustement de la taille d'un cottage sur la scène
loader.load( 'models/painterly_cottage.glb', (gltf) => {
 cottage = gltf.scene;
 cottage.position.x = 35;
 cottage.position.y = 1;
cottage.scale.set(10,10,10)
 scene.add(cottage);
 renderer.render( scene, camera );
});



//chargement, placement, ajustement de la taille de la maison en colombage sur la scène
loader.load( 'models/maison_colombage.glb',  (gltf) => {
  maison = gltf.scene;
  maison.position.x = -50;
  maison.position.y = -0.5;
  maison.position.z = 0;
  maison.scale.set(6, 6, 6);
  maison.rotation.set(0, Math.PI/2, 0);
  scene.add(maison);
  renderer.render( scene, camera );
});








const textureLoader = new THREE.TextureLoader();                                                                //crée un chargeur de textures pour afficher les textures des modèles 3D
const groundTexture = textureLoader.load('models/jeu-enfant.jpg');                                              //charge la texture du sol

// Créer un plan en 2D (sol) avec la texture
const groundGeometry = new THREE.PlaneGeometry(100, 100);                                                       // Ajuste la taille du sol
const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture, side: THREE.DoubleSide });             // Appliquer la texture au sol
ground = new THREE.Mesh(groundGeometry, groundMaterial);                                                        //crée le sol
ground.rotation.x = -Math.PI / 2;                                                                               // Rotation pour placer le sol à l'horizontale
ground.position.y = -0.29;
scene.add(ground);






//chargement, placement de la place de parking 1 et de ses textures sur la scène
const parkingTexture = textureLoader.load('models/parking.jpg');
const parkingGeometry = new THREE.PlaneGeometry(10, 10);
const parkingMaterial = new THREE.MeshBasicMaterial({ map: parkingTexture, side: THREE.DoubleSide });
groundparking1 = new THREE.Mesh(parkingGeometry, parkingMaterial);
groundparking1.rotation.x = -Math.PI / 2;                                                                       // Rotation pour placer la place à l'horizontale
groundparking1.position.y = -0.28;
groundparking1.position.z = -20;
scene.add(groundparking1);



//chargement, placement de la place de parking 2 et de ses textures sur la scène
groundparking2 = new THREE.Mesh(parkingGeometry, parkingMaterial);
groundparking2.rotation.x = -Math.PI / 2;                                                                       // Rotation pour placer la place à l'horizontale
groundparking2.position.x = -20;
groundparking2.position.y =-0;
groundparking2.position.z = 0;
scene.add(groundparking2);






// Configuration déplacements

// Variables pour stocker les états des touches
const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  a: false,
  q: false
};

// Écoute des événements clavier. La fonction onKeyDown va se déclencher si une touche de clavier est préssée. Sinon ce sera la fonction onKeyUp
document.addEventListener('keydown', onKeyDown);  
document.addEventListener('keyup', onKeyUp);    

// Fonction appelée lorsqu'une touche est enfoncée. Elle indique qu'une touche précise est appuyée
function onKeyDown (event) {
  handleKeyEvent(event.key, true);
};

// Fonction appelée lorsqu'une touche est relâchée. Elle indique qu'une touche précise n'est pas appuyée
function onKeyUp(event) {
  handleKeyEvent(event.key, false);
};







// Fonction pour gérer l'état des touches
function handleKeyEvent(keyLetter, isPressed) {
  switch (keyLetter) {
      case 'ArrowUp':
          keys.forward = isPressed;
          break;
      case 'ArrowDown':
          keys.backward = isPressed;
          break;
      case 'ArrowLeft':
          keys.left = isPressed;
          break;
      case 'ArrowRight':
          keys.right = isPressed;
          break;
      case 'Enter':
         keys.enter = isPressed;
          break;
  }
};


//crée l'animation
function animate() {
  requestAnimationFrame(animate);                                                 //rapelle la fonction animate à chaque rafraîchissement d'écran
  renderer.render(scene, camera);                                                 // ordonne au renderer de rendre la scene ainsi que le PDV de la caméra 

  

//une fois la voiture chargée : 
  if (car) {                                                              

    speed=0;
    

    if (keys.forward) {                                                           //si la flèche avant est préssée, fait avancer la voiture avec une vitesse de 10 en avant
      direction.set(0, 0, -1);
      speed = 10;
    }
    if (keys.backward) {                                                          //si la flèche arrière est préssée, fait avancer la voiture avec une vitesse de 10 en arrière 
      direction.set(0, 0, 1);
      speed = 10;
    }
    if (keys.left) {                                                              //si la flèche gauche est préssée, fait avancer la voiture avec une vitesse de 10 vers la gauche
      direction.set(-1, 0, 0);
      speed = 10;
    }
    if (keys.right) {                                                             //si la flèche droite est préssée, fait avancer la voiture avec une vitesse de 10 vers la droite
      direction.set(1, 0, 0);
      speed = 10;
    }

    if (keys.forward && keys.right) {                                             //si la flèche droite et avant sont préssées, fait avancer la voiture avec une vitesse de 10 en tournant vers la droite
      direction.set(1, 0, -1);
      speed = 10;
    }

    if (keys.forward && keys.left) {                                              //si la flèche gauche et avant sont préssées, fait avancer la voiture avec une vitesse de 10 en tournant vers la gauche
      direction.set(-1, 0, -1);
      speed = 10;
    }

    if (keys.backward && keys.right) {                                            //si la flèche droite et arrière sont préssées, fait reculer la voiture avec une vitesse de 10 en tournant vers la droite
      direction.set(1, 0, 1);
      speed = 10;
    }

    if (keys.backward && keys.left) {                                             //si la flèche gauche et arrière sont préssées, fait reculer la voiture avec une vitesse de 10 en tournant vers la gauche
      direction.set(-1, 0, 1);
      speed = 10;
    }

  };


//actualise la position de la caméra pour suivre la voiture et la faire regarder vers le mouvement commander  
  moveCar();
  controls.target.copy(car.position);
  controls.update();                                                              // Met à jour les contrôles lors de l'animation
  car.lookAt(car.position.clone().add(direction));
  car.rotation.y += Math.PI;
  camera.position.y = car.position.y + 10;
  camera.position.x = car.position.x ;
  camera.position.z = car.position.z + 15 ;
  if (car) {
    
    carBoundingBox.setFromObject(car);                                            // Mettre à jour la boîte englobante de la voiture à chaque frame


    
    checkCollision();                                                             // Vérifie si la voiture effectue une collision
  }

//crée une barre d'info pour connaître la position de la voiture à n'importe quel moment
  const carPosition = car.position;
  coordinatesDiv.textContent = `Position de la voiture : x: ${carPosition.x.toFixed(1)}, y: ${carPosition.y.toFixed(1)}, z: ${carPosition.z.toFixed(1)}`;


};




//permet d'actualiser le positonnement de la voiture lors de l'animation
const moveCar = () => {
  const delta = clock.getDelta();                                                 // indique le delta de temps entre les frames
  const displacement = new THREE.Vector3();
  displacement.copy(direction).multiplyScalar(speed * delta);
  car.position.add(displacement);
};





function checkCollision() {
  // Met à jour les boîtes englobantes des batîments et place de parking
  icamBoundingBox.setFromObject(icam);
  cottageBoundingBox.setFromObject(cottage);
  parking1BoundingBox.setFromObject(parking1);
  parking2BoundingBox.setFromObject(parking2);

  // Vérifie la collision de la voiture avec le batîment de l'ICAM. Si la collision a lieu, la position de la caméra change
  if (carBoundingBox.intersectsBox(icamBoundingBox)) {
    console.log('Collision détectée!');
    camera.position.x=50;
  }
  
  // Vérifie la collision de la voiture avec le cottage. Si la collision a lieu, la position de la caméra change
  if (carBoundingBox.intersectsBox(cottageBoundingBox)) {
    console.log('Collision détectée!');
    camera.position.x=30;
    camera.position.y=12;
  }

  
  // Vérifie la collision de la voiture avec la place de parking 1. Si la collision a lieu, la position de la caméra change
  if (carBoundingBox.intersectsBox(parking1BoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.z = 15;
    camera.position.y = 14;
    camera.position.x = -21;

//si la touche entrée est préssée, renvoie vers une page html
if (keys.enter){
  //window.open('page.html', 'Spam', 'width=500,height=300,left=100,top=100,toolbar=no,scrollbars=yes');  POUR OUVRIR LA PAGE WEB
  console.log('Page chargée');
}

  }
  // Vérifie la collision de la voiture avec la place de parking 2. Si la collision a lieu, la position de la caméra change
  if (carBoundingBox.intersectsBox(parking2BoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.z = 0;
    camera.position.y = 15;
    camera.position.x = 0;

//si la touche entrée est préssée, renvoie vers une page html    
if (keys.enter){
  //window.open('page.html', 'Spam', 'width=500,height=300,left=100,top=100,toolbar=no,scrollbars=yes');  POUR OUVRIR LA PAGE WEB
  console.log('Page chargée');
}
  }
}
animate();
