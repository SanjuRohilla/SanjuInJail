import * as THREE from "three" ;
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import getStarfield from "./getStarField.js";
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);


const view = 75;
const aspect = w/h;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(view , aspect , near , far);
camera.position.z = 2;

const controls = new OrbitControls(camera , renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const loader = new THREE.TextureLoader()
const scene = new THREE.Scene();
const geo = new THREE.IcosahedronGeometry(1.0 , 2);
const mat = new THREE.MeshStandardMaterial({
    // map: loader.load("./Screenshot 2024-05-28 170111.png"),
    // color: 0x00ff00,
    wireframe: true,
    transparent: true,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);
const hemiLight = new THREE.HemisphereLight(0x009ff , 0xaa5500 )
scene.add(hemiLight);

const cubeGeo = new THREE.BoxGeometry(1,1)
const cubeMat = new THREE.MeshStandardMaterial({
     map: loader.load("./Screenshot 2024-05-28 170111.png"),
    flatShading: true,

})
const cubeMesh = new THREE.Mesh(cubeGeo,cubeMat);
cubeMesh.border
scene.add(cubeMesh);

const stars = new getStarfield({numStars: 2000});
 scene.add(stars);
function animate(t = 0) {
    requestAnimationFrame(animate);
       mesh.rotation.y = t * 0.001;
       mesh.rotation.x = t * 0.001;
       stars.rotation.y += 0.0002;
    renderer.render(scene , camera);
    controls.update();
}
animate();

function handleWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', handleWindowResize, false);





















