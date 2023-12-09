import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement); // pr déplacer la cam

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // La deuxième valeur (0.5) est l'intensité
scene.add(ambientLight);

let ground;
let car;
let icam;
let maison;
let cottage;
let groundparking1;
let groundparking2;

// Créer une boîte englobante pour la voiture
const carBoundingBox = new THREE.Box3();

// Créer une boîte englobante pour l'objet
const icamBoundingBox = new THREE.Box3();
const cottageBoundingBox = new THREE.Box3();
const parking1BoundingBox = new THREE.Box3();
const maisonBoundingBox = new THREE.Box3();
const parking2BoundingBox = new THREE.Box3();

const geometry = new THREE.BoxGeometry(10,3,5);
const material = new THREE.MeshBasicMaterial({  color: 0x00ff00 , transparent: true , opacity : 0});
const parking1 = new THREE.Mesh( geometry, material );
parking1.position.y = -0.28;
parking1.position.z = -20;
scene.add(parking1);
const parking2 = new THREE.Mesh( geometry, material );
parking2.position.x = -22;
parking2.position.z = 0;
parking2.position.y = 0;
scene.add(parking2);



const direction = new THREE.Vector3(1, 0, 0); // Vecteur de direction initial (vers la droite)
const clock = new THREE.Clock()
let speed = 0;



const coordinatesDiv = document.getElementById('coordinates');



const loader = new GLTFLoader();
loader.load('models/voiture.glb', (gltf) => {
  car = gltf.scene;
  scene.add(car);
  // Réinitialiser la rotation à zéro
  car.rotation.set(0, 0, 0);
  car.scale.set(2,2,2)

  // Tourner le modèle de 180 degrés autour de l'axe Y



  const box = new THREE.Box3().setFromObject(car);
    const center = box.getCenter(new THREE.Vector3());

    controls.target.copy(center);
    controls.update();
    carBoundingBox.setFromObject(car);
});

loader.load( 'models/icam.glb', (gltf) => { //initie le téléchargement du modèle 3D
  icam = gltf.scene;
  icam.position.x = 3;
  icam.position.y = 0.5;
  icam.position.z = -50;
  icam.scale.set(5,5,5);
  icam.rotation.set(0, Math.PI, 0);
  scene.add(icam);
  renderer.render( scene, camera );

});

loader.load( 'models/painterly_cottage.glb', (gltf) => {
 cottage = gltf.scene;
 cottage.position.x = 35;
 cottage.position.y = 1;
cottage.scale.set(10,10,10)
 scene.add(cottage);
 renderer.render( scene, camera );
});

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








const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('models/jeu-enfant.jpg');  // Remplacez par le chemin de votre image

// Créer un plan en 2D (sol) avec la texture
const groundGeometry = new THREE.PlaneGeometry(100, 100);  // Ajustez la taille selon vos besoins
const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture, side: THREE.DoubleSide });  // Appliquer la texture au matériau
ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotation pour placer le sol à l'horizontale
ground.position.y = -0.29;
scene.add(ground);






const parkingTexture = textureLoader.load('models/parking.jpg');
const parkingGeometry = new THREE.PlaneGeometry(10, 10);
const parkingMaterial = new THREE.MeshBasicMaterial({ map: parkingTexture, side: THREE.DoubleSide });
groundparking1 = new THREE.Mesh(parkingGeometry, parkingMaterial);
groundparking1.rotation.x = -Math.PI / 2; // Rotation pour placer le sol à l'horizontale
groundparking1.position.y = -0.28;
groundparking1.position.z = -20;
scene.add(groundparking1);

groundparking2 = new THREE.Mesh(parkingGeometry, parkingMaterial);
groundparking2.rotation.x = -Math.PI / 2; // Rotation pour placer le sol à l'horizontale
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
document.addEventListener('keydown', onKeyDown);  // syntaxe : document.addEventListener(type d'event à écouter ex: 'keyUp', listener ie fonction à appeler [, variables optionnelles à la fonction à appeller]);
document.addEventListener('keyup', onKeyUp);    

// Fonction appelée lorsqu'une touche est enfoncée
function onKeyDown (event) {
  handleKeyEvent(event.key, true);
};

// Fonction appelée lorsqu'une touche est relâchée
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



function animate() {
  requestAnimationFrame(animate); //rapelle la fonction animate à chaque rafraîchissement d'écran
  renderer.render(scene, camera); // ordonne au renderer de rendre la scene ainsi que le PDV de la caméra 

  


  if (car) {

    speed=0;
    
    
    if (keys.forward) {
      direction.set(0, 0, -1);
      speed = 10;
    }
    if (keys.backward) {
      direction.set(0, 0, 1);
      speed = 10;
    }
    if (keys.left) {
      direction.set(-1, 0, 0);
      speed = 10;
    }
    if (keys.right) {
      direction.set(1, 0, 0);
      speed = 10;
    }

    if (keys.forward && keys.right) {
      direction.set(1, 0, -1);
      speed = 10;
    }

    if (keys.forward && keys.left) {
      direction.set(-1, 0, -1);
      speed = 10;
    }

    if (keys.backward && keys.right) {
      direction.set(1, 0, 1);
      speed = 10;
    }

    if (keys.backward && keys.left) {
      direction.set(-1, 0, 1);
      speed = 10;
    }

  };
  moveCar();
  controls.target.copy(car.position);
  controls.update();   // Mettez à jour les contrôles lors de l'animation
  car.lookAt(car.position.clone().add(direction));
  car.rotation.y += Math.PI;
  camera.position.y = car.position.y + 10;
  camera.position.x = car.position.x ;
  camera.position.z = car.position.z + 15 ;
  if (car) {
    // Mettre à jour la boîte englobante de la voiture à chaque frame
    carBoundingBox.setFromObject(car);

    // ... (autres mises à jour d'animation) osef c'est gpt

    // Vérifier la collision
    checkCollision();
  }


  const carPosition = car.position;
  coordinatesDiv.textContent = `Position de la voiture : x: ${carPosition.x.toFixed(1)}, y: ${carPosition.y.toFixed(1)}, z: ${carPosition.z.toFixed(1)}`;


};





const moveCar = () => {
  const delta = clock.getDelta(); // Delta de temps entre les frames
  const displacement = new THREE.Vector3();
  displacement.copy(direction).multiplyScalar(speed * delta);
  car.position.add(displacement);


};





function checkCollision() {
  // Mettre à jour la boîte englobante de l'objet
  icamBoundingBox.setFromObject(icam);
  cottageBoundingBox.setFromObject(cottage);
  parking1BoundingBox.setFromObject(parking1);
  parking2BoundingBox.setFromObject(parking2);

  // Vérifier la collision
  if (carBoundingBox.intersectsBox(icamBoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.x=50;
  }
  
  if (carBoundingBox.intersectsBox(cottageBoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.x=30;
    camera.position.y=12;
  }

  

  if (carBoundingBox.intersectsBox(parking1BoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.z = 15;
    camera.position.y = 14;
    camera.position.x = -21;

    
if (keys.enter){
  //window.open('page.html', 'Spam', 'width=500,height=300,left=100,top=100,toolbar=no,scrollbars=yes');  POUR OUVRIR LA PAGE WEB
  console.log('Page chargée');
}

  }

  if (carBoundingBox.intersectsBox(parking2BoundingBox)) {
    // Collision détectée, prenez des mesures ici (par exemple, arrêtez la voiture)
    console.log('Collision détectée!');
    camera.position.z = 0;
    camera.position.y = 15;
    camera.position.x = 0;

    
if (keys.enter){
  //window.open('page.html', 'Spam', 'width=500,height=300,left=100,top=100,toolbar=no,scrollbars=yes');  POUR OUVRIR LA PAGE WEB
  console.log('Page chargée');
}
  }
}
animate();








// Finir système place de parking
// utiliser la touche "enter" sur une place de parking pour ouvrir une place de parking --> pr que ca soit que quand on leve la touche
// placer évents + objet map
// tuto utilisation du portfolio 3D

//+ Regarder pour faire des lettres en 3D



//RAPPORT
//expliquer outil vite (NOTE PART OUTILS ET LOG.) xxxxxxx
//placer modeles map xxxxxxxx
//ajouter pgn github XXXXXXX
//finir 2/3 trucs moche code XXXXXX
//readme (TUTO POUR PROF INSTALLATION) xxxxxx
//video pr présenter proj A FAIRE


    //Code pour faire grandir et réctrécir la place de parking (JE FAIS CA SEMAINE PRO SHORT POUR DIMANCHE)
    //parkingGeometry.geometry.dispose();
    //parkingGeometry = new THREE.PlaneGeometry(50,50);
    //const parkingMaterial = new THREE.MeshBasicMaterial({ map: parkingTexture, side: THREE.DoubleSide });
    //groundparking1 = new THREE.Mesh(parkingGeometry, parkingMaterial);
    //scene.add(groundparking1);
