// Import stylesheets
import Konva from 'konva';
import './style.css';

// Write TypeScript code!
const appDiv: HTMLDivElement = document.querySelector('#id');
let stage: Konva.Stage = new Konva.Stage({
  container: appDiv,
  width: 500,
  height: 500,
  draggable: true,
});
const scaleBy = 1.2;
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
const layer: Konva.Layer = new Konva.Layer();
var rect = new Konva.Rect({
  x: 100,
  y: 50,
  width: 200,
  height: 100,
  fill: 'red',
});
const originImg = new Image();
originImg.src = 'http://shanhe.kim/api/wz/bing.php?rand=true';
originImg.onload = () => {
  // 绘制图片
  const img = new Konva.Image({
    x: 30,
    y: 30,
    image: originImg,
  });
  layer.add(img);
};
layer.add(rect);
stage.add(layer);
