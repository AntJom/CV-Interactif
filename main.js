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
let model;
let bat1;
let cottage;
let groundparking1;

// Créer une boîte englobante pour la voiture
const carBoundingBox = new THREE.Box3();

// Créer une boîte englobante pour l'objet
const bat1BoundingBox = new THREE.Box3();

const cottageBoundingBox = new THREE.Box3();
const parking1BoundingBox = new THREE.Box3();

const geometry = new THREE.BoxGeometry(10,3,5);
const material = new THREE.MeshBasicMaterial({  color: 0x00ff00 , transparent: true , opacity : 0});
const parking1 = new THREE.Mesh( geometry, material );
scene.add(parking1);


const direction = new THREE.Vector3(1, 0, 0); // Vecteur de direction initial (vers la droite)
const clock = new THREE.Clock()
let speed = 0;



const coordinatesDiv = document.getElementById('coordinates');



const loader = new GLTFLoader();
loader.load('models/voiture.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);
  // Réinitialiser la rotation à zéro
  model.rotation.set(0, 0, 0);
  model.scale.set(2,2,2)

  // Tourner le modèle de 180 degrés autour de l'axe Y



  const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());

    controls.target.copy(center);
    controls.update();
    carBoundingBox.setFromObject(model);
});

loader.load( 'models/immeuble.glb', (gltf) => { //initie le téléchargement du modèle 3D
  bat1 = gltf.scene;
  bat1.position.x = 30;
  bat1.position.y = 7;
  bat1.scale.set(75,75,75)
  scene.add(bat1);
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






const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('models/jeu-enfant.jpg');  // Remplacez par le chemin de votre image

// Créer un plan en 2D (sol) avec la texture
const groundGeometry = new THREE.PlaneGeometry(100, 100);  // Ajustez la taille selon vos besoins
const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture, side: THREE.DoubleSide });  // Appliquer la texture au matériau
ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotation pour placer le sol à l'horizontale
ground.position.y = -0.29;
scene.add(ground);

const parking1Texture = textureLoader.load('models/parking.jpg');
const parking1Geometry = new THREE.PlaneGeometry(10, 10);
const parking1Material = new THREE.MeshBasicMaterial({ map: parking1Texture, side: THREE.DoubleSide });
groundparking1 = new THREE.Mesh(parking1Geometry, parking1Material);
groundparking1.rotation.x = -Math.PI / 2; // Rotation pour placer le sol à l'horizontale
groundparking1.position.y = -0.28;
scene.add(groundparking1);
// Ajouter le cube au monde


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
      case 'a':
          keys.a = isPressed;
          break;
      case 'q':
         keys.q = isPressed;
          break;
  }
};



function animate() {
  requestAnimationFrame(animate); //rapelle la fonction animate à chaque rafraîchissement d'écran
  renderer.render(scene, camera); // ordonne au renderer de rendre la scene ainsi que le PDV de la caméra 
  


  if (model) {

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

    // if (keys.a) {
    //    speed += 0.1;
    // }

    // if (keys.q) {
    //     speed -= 0.1;
    // }
  };
  moveCar();
  controls.target.copy(model.position);
  controls.update();   // Mettez à jour les contrôles lors de l'animation
  model.lookAt(model.position.clone().add(direction));
  model.rotation.y += Math.PI;
  camera.position.y = model.position.y + 10;
  camera.position.x = model.position.x ;
  camera.position.z = model.position.z + 15 ;
  if (model) {
    // Mettre à jour la boîte englobante de la voiture à chaque frame
    carBoundingBox.setFromObject(model);

    // ... (autres mises à jour d'animation) osef c'est gpt

    // Vérifier la collision
    checkCollision();
  }

  const carPosition = camera.position;
  coordinatesDiv.textContent = `Position de la voiture : x: ${carPosition.x.toFixed(1)}, y: ${carPosition.y.toFixed(1)}, z: ${carPosition.z.toFixed(1)}`;


};

const moveCar = () => {
  const delta = clock.getDelta(); // Delta de temps entre les frames
  const displacement = new THREE.Vector3();
  displacement.copy(direction).multiplyScalar(speed * delta);
  model.position.add(displacement);

};

function checkCollision() {
  // Mettre à jour la boîte englobante de l'objet
  bat1BoundingBox.setFromObject(bat1);
  cottageBoundingBox.setFromObject(cottage);
  parking1BoundingBox.setFromObject(parking1);

  // Vérifier la collision
  if (carBoundingBox.intersectsBox(bat1BoundingBox)) {
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
    camera.position.z=-27.9;
    camera.position.y=8.5;
    camera.position.x=-38.4;
    parking1Geometry.geometry.dispose();
    parking1Geometry = new THREE.PlaneGeometry(50,50);
    const parking1Material = new THREE.MeshBasicMaterial({ map: parking1Texture, side: THREE.DoubleSide });
    groundparking1 = new THREE.Mesh(parking1Geometry, parking1Material);
    scene.add(groundparking1);
  }
  

}

animate();


