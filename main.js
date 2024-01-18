import * as THREE from 'three';                                                                         //permet d'importer la bibliothèque three.js en entier
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';                                        // importe la classe GLTFLoader permettant de télécharger la scène du modèle 3D
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';                           //importe le module OrbitControls pour créer les commandes permettant à l'utilisateur de controler la caméra

const scene = new THREE.Scene();                                                                        //crée une nouvelle scène
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);      //crée une instance de caméra en perspective



const renderer = new THREE.WebGLRenderer();                                                             // crée un renderer permettant de générer la scène
renderer.setSize(window.innerWidth, window.innerHeight);                                                //configure la taille à l'écran du rendu du renderer
document.body.appendChild(renderer.domElement);                                                         //permet de dire dans quelle "conteneur" on va trouver notre renderer (dans le domElement)
const controls = new OrbitControls(camera,renderer.domElement);                                         //crée les commandes qui pourront être utilisées par l'utilisateur pour se déplacer sur la scène

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( -20, 10, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);                                             // crée une lumière ambiente pour éclairer la scène
scene.add(ambientLight);                                                                                //ajoute la lumière à la scène

// Créer une lumière ponctuelle


light.shadow.mapSize.width = 1024; // default
light.shadow.mapSize.height = 1024; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default


const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -22, 0, 0 );
spotLight.map = new THREE.TextureLoader().load( '/parking.jpg' );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );
//définitons de variables qui serviront pour faire le sol de la scène, la voiture, les bâtiments et les places de parking
let car;
let paysage;
let icam;
let maison;
let pise;
let groundparking1;
let groundparking2;
let groundparking3;
let boostpossible;
let building1;
let building2;
let pov;

const icamBoundingBox = new THREE.Box3();                                                               // Créer une boîte englobante pour chaque bâtiment, place de parking
const parking1BoundingBox = new THREE.Box3();
const maisonBoundingBox = new THREE.Box3();
const parking2BoundingBox = new THREE.Box3();
const parking3BoundingBox = new THREE.Box3();
const piseBoundingBox = new THREE.Box3();
const building1BoundingBox = new THREE.Box3();
const building2BoundingBox = new THREE.Box3();
const povBoundingBox = new THREE.Box3();

const geometry = new THREE.BoxGeometry(10,3,5);                                                         //crée une boîte transparente sur le parking 1
const material = new THREE.MeshBasicMaterial({  color: 0x00ff00 , transparent: true , opacity : 0});


const parking1 = new THREE.Mesh( geometry, material );
parking1.position.set(169,-0.28,268);
scene.add(parking1);                                                                                    //ajout de la boîte transparente à la scène

const lake1 = new THREE.Mesh( geometry, material ); 
lake1.position.set(22,0,120);
lake1.scale.set(13,10,9);
scene.add(lake1);


const parking2 = new THREE.Mesh( geometry, material );                                                  //crée une boîte transparente sur le parking 2
parking2.position.set(-231,0,291);
scene.add(parking2);                                                                                    //ajout de la boîte transparente à la scène

const parking3 = new THREE.Mesh(geometry, material);
parking3.position.set(91,0,146);
scene.add(parking3);


pov = new THREE.Mesh(geometry, material);
pov.position.set(0,0,165);
scene.add(pov);

const parkingPOV = new THREE.Mesh( geometry, material ); 
parkingPOV.position.set(180,0,330);
scene.add(parkingPOV);



//Placement du fond pour délimiter la zone accessible
const fond = new THREE.Mesh( geometry, material );
fond.position.set(0,1,100);
fond.scale.set(660,50,10);
scene.add(fond);

icam = new THREE.Mesh( geometry, material );
icam.position.set(165,0,206);
icam.scale.set(13,10,15);
scene.add(icam);

maison = new THREE.Mesh( geometry, material );
maison.position.set(240,0,358);
maison.scale.set(5,5,5);
scene.add(maison);

pise = new THREE.Mesh( geometry, material );
pise.position.set(263,0,124);
pise.scale.set(6.5,6.5,7.5);
scene.add(pise);

building1 = new THREE.Mesh( geometry, material );
building1.position.set(-148,6.5,293);
building1.scale.set(8,6.5,6);
scene.add(building1);

building2 = new THREE.Mesh( geometry, material );
building2.position.set(-349,6.5,277);
building2.scale.set(14,6.5,20.5);
scene.add(building2);

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
  car.scale.set(3.5,3.5,3.5)                                                                                //augmente la taille de la voiture sur la scène
  car.position.set(294,0,373);


  const box = new THREE.Box3().setFromObject(car);                                                      // Créer une boîte qui englobe la voiture
  const center = box.getCenter(new THREE.Vector3());                                                    //crée un vecteur 3D 

  controls.target.copy(center);                                                                         //place le vecteur 3D au centre de la voiture
  controls.update();                                                                                    //actualise les commandes de la caméra 
  carBoundingBox.setFromObject(car);                                                                    //Créer une boîte englobant la voiture
});



loader.load('models/paysage_avec_objets_et_ciel.glb',  (gltf) => {
  paysage = gltf.scene;
  paysage.position.set(0,-0.5,60);
  paysage.scale.set(330,330,330);
  paysage.rotation.set(0, -Math.PI/2, 0);
  scene.add(paysage);

  renderer.render( scene, camera );
});



const textureLoader = new THREE.TextureLoader();                                                                //crée un chargeur de textures pour afficher les textures des modèles 3D                                            //charge la texture du sol

//chargement, placement de la place de parking 1 et de ses textures sur la scène
const parkingTexture = textureLoader.load('models/parking.jpg');
const parkingGeometry = new THREE.PlaneGeometry(10, 10);
const parkingMaterial = new THREE.MeshBasicMaterial({ map: parkingTexture, side: THREE.DoubleSide });
groundparking1 = new THREE.Mesh(parkingGeometry, parkingMaterial);
groundparking1.rotation.x = -Math.PI / 2;                                                                       // Rotation pour placer la place à l'horizontale
groundparking1.position.set(169,-0.28,268);
groundparking1.scale.set(1.5,1.5,1.5);

scene.add(groundparking1);

const photoTexture = textureLoader.load('models/photo.jpg');
const photoGeometry = new THREE.PlaneGeometry(10, 10);
const photoMaterial = new THREE.MeshBasicMaterial({ map: photoTexture, side: THREE.DoubleSide });
const groundphoto = new THREE.Mesh(photoGeometry, photoMaterial);
groundphoto.rotation.x = -Math.PI / 2;   
groundphoto.position.set(180,0,330);
groundphoto.scale.set(1.5,1.5,1.5);
scene.add(groundphoto);


//chargement, placement de la place de parking 2 et de ses textures sur la scène
groundparking2 = new THREE.Mesh(parkingGeometry, parkingMaterial);
groundparking2.rotation.x = -Math.PI / 2;                                                                       // Rotation pour placer la place à l'horizontale
groundparking2.position.set(-231,0,291);
groundparking2.scale.set(1.5,1.5,1.5);
scene.add(groundparking2);

groundparking3 = new THREE.Mesh(parkingGeometry, parkingMaterial);
groundparking3.rotation.x = -Math.PI / 2;                                                                       // Rotation pour placer la place à l'horizontale
groundparking3.position.set(91,0,146);
groundparking3.scale.set(1.5,1.5,1.5);
scene.add(groundparking3);






// Configuration déplacements

// Variables pour stocker les états des touches
const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  shift: false,
  enter: false,
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
      case 'Shift' :
        keys.shift = isPressed;
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
    boostpossible = true;  

    if (keys.forward) {                                                           //si la flèche avant est préssée, fait avancer la voiture avec une vitesse de 10 en avant
      direction.set(0, 0, -1);
      speed = 20;
      checkCollisionBuild();
      Boost();
    }
    if (keys.backward) {                                                          //si la flèche arrière est préssée, fait avancer la voiture avec une vitesse de 10 en arrière 
      direction.set(0, 0, 1);
      speed = 20;
      checkCollisionBuild();
      Boost();
    }
    if (keys.left) {                                                              //si la flèche gauche est préssée, fait avancer la voiture avec une vitesse de 10 vers la gauche
      direction.set(-1, 0, 0);
      speed = 20;
      checkCollisionBuild();
      Boost();
    }
    if (keys.right) {                                                             //si la flèche droite est préssée, fait avancer la voiture avec une vitesse de 10 vers la droite
      direction.set(1, 0, 0);
      speed = 20;
      checkCollisionBuild();
      Boost();
    }

    if (keys.forward && keys.right) {                                             //si la flèche droite et avant sont préssées, fait avancer la voiture avec une vitesse de 10 en tournant vers la droite
      direction.set(1, 0, -1);
      speed = 20;
      checkCollisionBuild();
      Boost();
    }

    if (keys.forward && keys.left) {                                              //si la flèche gauche et avant sont préssées, fait avancer la voiture avec une vitesse de 10 en tournant vers la gauche
      direction.set(-1, 0, -1);
      speed = 20;
      checkCollisionBuild();
      Boost();
    }

    if (keys.backward && keys.right) {                                            //si la flèche droite et arrière sont préssées, fait reculer la voiture avec une vitesse de 10 en tournant vers la droite
      direction.set(1, 0, 1);
      speed = 20;
      checkCollisionBuild();
      Boost();
    }

    if (keys.backward && keys.left) {                                             //si la flèche gauche et arrière sont préssées, fait reculer la voiture avec une vitesse de 10 en tournant vers la gauche
      direction.set(-1, 0, 1);
      speed = 20;
      checkCollisionBuild();
      Boost();
    }

  };

  const carPosition = car.position;
  coordinatesDiv.textContent = `Deplacez vous avec les flèches directionelles | Cliquez sur entrer sur une place de parking | Shift pour avoir un boost de vitesse | Position de la voiture : x: ${carPosition.x.toFixed(1)}, y: ${carPosition.y.toFixed(1)}, z: ${carPosition.z.toFixed(1)}`;

//actualise la position de la caméra pour suivre la voiture et la faire regarder vers le mouvement commander  
  moveCar();
    controls.target.copy(car.position);
    controls.update();                                                              // Met à jour les contrôles lors de l'animation
    car.lookAt(car.position.clone().add(direction));
    car.rotation.y += Math.PI;
    camera.position.y = car.position.y + 15;
    camera.position.x = car.position.x ;
    camera.position.z = car.position.z + 27 ;
    if (car) {
      
      carBoundingBox.setFromObject(car);                                            // Mettre à jour la boîte englobante de la voiture à chaque frame


      
      checkCollisionParking();                                                             // Vérifie si la voiture effectue une collision
  }

//crée une barre d'info pour connaître la position de la voiture à n'importe quel moment


};




//permet d'actualiser le positonnement de la voiture lors de l'animation
const moveCar = () => {
  const delta = clock.getDelta();                                                 // indique le delta de temps entre les frames
  const displacement = new THREE.Vector3();
  displacement.copy(direction).multiplyScalar(speed * delta);
  car.position.add(displacement);
};

function Boost(){
  if(boostpossible){
    if (keys.shift){
        {speed = 35}
    }
}
}



function checkCollisionParking() {
  // Met à jour les boîtes englobantes des batîments et place de parking
  parking1BoundingBox.setFromObject(parking1);
  parking2BoundingBox.setFromObject(parking2);
  parking3BoundingBox.setFromObject(parking3);
  povBoundingBox.setFromObject(parkingPOV);

  
  // Vérifie la collision de la voiture avec la place de parking 1. Si la collision a lieu, la position de la caméra change
  if (carBoundingBox.intersectsBox(parking1BoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.set(160,70,350);
    camera.lookAt(icam.position);


    //si la touche entrée est préssée, renvoie vers une page html
    if (keys.enter){
      window.open('/pagesweb/lycee.html', '_blank');  //POUR OUVRIR LA PAGE WEB
      console.log('Page chargée');
      speed = 0;
      keys.enter = false;
    }

  }
  // Vérifie la collision de la voiture avec la place de parking 2. Si la collision a lieu, la position de la caméra change
  if (carBoundingBox.intersectsBox(parking2BoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.set(-170,42,340);
    camera.lookAt(building2.position);


    //si la touche entrée est préssée, renvoie vers une page html    
    if (keys.enter){
      //window.open('page.html', 'Spam', 'width=500,height=300,left=100,top=100,toolbar=no,scrollbars=yes');  POUR OUVRIR LA PAGE WEB
      window.open('/pagesweb/parcours.html', '_blank');  //POUR OUVRIR LA PAGE WEB
      console.log('Page chargée');
      speed = 0;
      keys.enter = false;
    }
  }

  if (carBoundingBox.intersectsBox(parking3BoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.set(30,65,170);
    camera.lookAt(pise.position);

    //si la touche entrée est préssée, renvoie vers une page html    
    if (keys.enter){
      window.open('/pagesweb/echange.html', '_blank');  //POUR OUVRIR LA PAGE WEB
      console.log('Page chargée');
      speed = 0;
      keys.enter = false;
    }
  }


  if (carBoundingBox.intersectsBox(povBoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.set(-50,150,460);
    camera.lookAt(pov.position);



  }


}

function checkCollisionBuild() {
  // Met à jour les boîtes englobantes des batîments et place de parking
  icamBoundingBox.setFromObject(icam);
  maisonBoundingBox.setFromObject(maison);
  piseBoundingBox.setFromObject(pise);
  building1BoundingBox.setFromObject(building1);
  building2BoundingBox.setFromObject(building2);
  // Vérifie la collision de la voiture avec le batîment de l'ICAM. Si la collision a lieu, la voiture ne peut pas traverser
  if (carBoundingBox.intersectsBox(icamBoundingBox) || carBoundingBox.intersectsBox(maisonBoundingBox) || carBoundingBox.intersectsBox(piseBoundingBox) || carBoundingBox.intersectsBox(building1BoundingBox) || carBoundingBox.intersectsBox(building2BoundingBox)){
    console.log('Collision détectée!');
    speed =0;
    boostpossible = false;
  }
}
animate();
