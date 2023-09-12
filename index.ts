// Import stylesheets
import Konva from 'konva';
import THREE from 'three';
import './style.css';

// Write TypeScript code!
const appDiv: HTMLDivElement = document.querySelector('#id');
const { clientWidth, clientHeight } = appDiv;
let stage: Konva.Stage = new Konva.Stage({
  container: appDiv,
  width: clientWidth,
  height: clientHeight,
  draggable: true,
});
const scaleBy = 1.1;
//stage的滚动事件
stage.addEventListener('wheel', (e) => {
  e.preventDefault();
  const oldScale = stage.scaleX();
  const pointer = stage.getPointerPosition() as Konva.Vector2d;
  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };
  const direction = e.wheelDelta > 0 ? 1 : -1;
  const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
  stage.scale({ x: newScale, y: newScale });
  const newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };
  stage.position(newPos);
});
const layerbg: Konva.Layer = new Konva.Layer();
const layerMark: Konva.Layer = new Konva.Layer();
//添加圆形
var rect = new Konva.Circle({
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  fill: 'red',
  draggable: true,
});
//添加点击事件
rect.on('click', () => {
  console.log(1);
});
//注册到layer
layerMark.add(rect);
//绘制图片
const originImg = new Image();
originImg.src = 'http://shanhe.kim/api/wz/bing.php?rand=true';
originImg.onload = () => {
  // 绘制图片
  const img = new Konva.Image({
    x: 0,
    y: 0,
    image: originImg,
  });
  const w = img.width();
  const h = img.height();
  const sw = stage.width();
  const sh = stage.height();
  const wr = sw / w;
  const hr = sh / h;
  const s = Math.min(wr, hr);
  img.scale({ x: s, y: s });
  img.position({
    x: sw / 2 - (w * s) / 2,
    y: sh / 2 - (h * s) / 2,
  });
  layerbg.add(img);
};

stage.add(layerbg);
stage.add(layerMark);
/**
 *threejs
 */
//获取dom
const threejs: HTMLDivElement = document.querySelector('#webgl');
//搭建场景
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  threejs.clientWidth / threejs.clientHeight,
  0.1,
  1000
);
//建立渲染器|
const renderer = new THREE.WebGLRenderer({
  canvas: threejs,
});
//创建方块
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
//回调请求下一帧
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  renderer.setSize(threejs.clientWidth, threejs.clientHeight);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}
animate();
//渲染器渲染大小
window.addEventListener('resize', () => {
  renderer.setSize(threejs.clientWidth, threejs.clientHeight);
});
