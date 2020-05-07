import {
    renderer,
    scene,
    camera
} from './lib/scene.js';

import {
    controller1
} from './lib/controllers/controllers.js';

import {
    gamepad
} from './lib/controllers/gamepad.js';

import {
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    TextureLoader,
    AdditiveBlending,
    CanvasTexture
} from 'three';

// Red target on the floor
const targetTexture = new TextureLoader().load('./images/target.png');
const target = new Mesh(
    new PlaneGeometry(0.5, 0.5, 1, 1),
    new MeshBasicMaterial({
        map: targetTexture,
        blending: AdditiveBlending,
        color: 0x660000,
        transparent: true
    })
);
target.position.z = -5;
target.position.y = 0.01;
target.rotation.x = -Math.PI/2;
scene.add(target);

// Debugging 

const canvas = document.createElement('canvas');
const canvasTexture = new CanvasTexture(canvas);
canvas.width = 1024;
canvas.height = 256;
const ctx = canvas.getContext('2d');
function writeText(text) {
    if (typeof text !== 'string') text = JSON.stringify(text,null,2);
    ctx.font = "120px fantasy";
    ctx.fillStyle = 'darkblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    text.split('\n').forEach((str, i) => ctx.fillText(str, 0, (i+1)*120));
    canvasTexture.needsUpdate = true;
}

const geometry = new PlaneGeometry( 0.3 * canvas.width/1024, 0.3 * canvas.height/1024 );
const material = new MeshBasicMaterial( {map: canvasTexture, blending: AdditiveBlending} );
const consolePlane = new Mesh( geometry, material );
consolePlane.renderOrder = 1;
consolePlane.position.set(0, 0.5 * 0.3 * canvas.height/1024, -0.1);
consolePlane.rotation.set(-Math.PI/4,0,0);
controller1.add( consolePlane );
writeText('hi');

gamepad.addEventListener('gamepadInteraction', function (event) {
    writeText(`${event.detail.type} ${event.detail.value}`);
});

window.renderer = renderer;
window.camera = camera;