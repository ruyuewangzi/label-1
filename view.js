import model from "./model";
import eventHandler from "./eventhandler";;

let loadImg = (src, cb) => {
  let img = new Image();
  img.src = src;
  img.onload = () => {
    cb && cb(img);
  };
};

let initData = cb => {
  els.labelImagesWrapEl.innerHTML = "";
  loadSourceImg(sourceImg => {
    model.labelInfo.shapes = [];
    cb && cb(sourceImg);
  });
};

export let initView = () => {
  initData(sourceImg => {
    resetAllCanvasSize();
    clearAllCanvas();
    renderLabelCanvas();
    renderImgCanvas(sourceImg);
    renderAllLabelExplore();
    els.canvasWrapEl.classList.add("show");
    els.tipsEl.innerHTML = '';
  });
};

let clearAllCanvas = () => {
  model.imgCtx.clearRect(0, 0, els.imgCanvasEl.width, els.imgCanvasEl.height);
  model.labelCtx.clearRect(0, 0, els.labelCanvasEl.height, els.labelCanvasEl.height);
};

let resetAllCanvasSize = canvasEl => {
  let width = model.labelInfo.imageWidth;
  let height = model.labelInfo.imageHeight;

  let imgCanvasEl = els.imgCanvasEl;
  let labelCanvasEl = els.labelCanvasEl;
  let canvasWrapEl = els.canvasWrapEl;

  imgCanvasEl.width = labelCanvasEl.width = width;
  imgCanvasEl.height = labelCanvasEl.height = height;

  imgCanvasEl.style.width = canvasWrapEl.style.width = labelCanvasEl.style.width = width + "px";
  imgCanvasEl.style.height = canvasWrapEl.style.height = labelCanvasEl.style.height = height + "px";
};

let renderCurrentLabelExplore = label => {
  if(!label) {return;}

  var targetImgWrapEl = els.labelImagesWrapEl.querySelector("#label_"+label.timestamp);
  if(!targetImgWrapEl){
    targetImgWrapEl = document.createElement("div");
    targetImgWrapEl.setAttribute("data-feat","selectLabel");
    targetImgWrapEl.setAttribute("data-label-timestamp",label.timestamp);
    targetImgWrapEl.classList.add("labelImage");
    targetImgWrapEl.setAttribute("id", "label_" + label.timestamp);
    targetImgWrapEl.innerHTML = '<div class="label-img-wrap"></div><div data-feat="showInput" class="label-name"><span>'+(label.name || '未命名标记')+'</span></div><div data-feat="deleteLabel" class="delete-label"><svg width="14" height="14" viewBox="0 0 20 20"><path fill="#000000" d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z"></path><path fill="#000000" d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path><path fill="#000000" d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path><path fill="#000000" d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path></svg></div>';
    els.labelImagesWrapEl.appendChild(targetImgWrapEl);
  }

  if(!label.imageData) {return;}

  loadImg(label.imageData, function(imageEl){
    var canvas = els.cacheCanvasEl,
        ctx = model.cacheCtx,
        points = label.points;

    ctx.save();
    canvas.width = label.width;
    canvas.height = label.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    for(var i=0; i<points.length; i++){
      var point = points[i],
          x = point[0]-label.left,
          y = point[1]-label.top;

      if(i == 0){
        ctx.moveTo(x, y);
        continue;
      }
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(imageEl, 0, 0);
    ctx.restore();

    var dataURL = canvas.toDataURL(),
        imageEl = targetImgWrapEl.querySelector(".label-img-wrap").querySelector("img");

    if(!imageEl){
      imageEl = targetImgWrapEl.querySelector(".label-img-wrap").innerHTML = '<img src="'+ dataURL +'"/>';
    }else{
      targetImgWrapEl.querySelector("img").src = dataURL;
    }

    label.imageData = dataURL;
  });
};

let renderAllLabelExplore = () => {
  var html = "";
  model.labelInfo.shapes.forEach(function(label, index){
    html += '<div data-feat="selectLabel" data-label-timestamp="'+label.timestamp+'" class="labelImage" id="label_'+label.timestamp+'"><div class="label-img-wrap"><img src="'+label.imageData+'"/></div><div class="label-name" data-feat="showInput"><span>'+(label.name || '未命名标记')+'</span></div><div data-feat="deleteLabel" class="delete-label"><svg width="14" height="14" viewBox="0 0 20 20"><path fill="#000000" d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z"></path><path fill="#000000" d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path><path fill="#000000" d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path><path fill="#000000" d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path></svg></div></div>';
  });
  els.labelImagesWrapEl.innerHTML = html;
};

let renderImgCanvas = sourceImg => {
  var ctx = model.imgCtx;
  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(sourceImg, 0, 0);
  ctx.restore();
};

let loadSourceImg = cb => {
  loadImg(model.labelInfo.imageData, img => {
    setTimeout(()=>{
      model.labelInfo.imageWidth = img.width;
      model.labelInfo.imageHeight = img.height;
      cb && cb(img);
    }, 300);
  });
};

let calcCurrentLabeldimension = () => {
  if(!model.currentLabel) {return;}
  let currentLabel = model.currentLabel;
  let currentLabelPoints = currentLabel.points;
  if(currentLabelPoints.length <= 3) {return;}
  let xP = [], yP = [];
  currentLabelPoints.map(function(point, index){
    xP.push(point[0]);
    yP.push(point[1]);
  });
  let left = currentLabel.left = Math.min.apply(null, xP);
  let top = currentLabel.top = Math.min.apply(null, yP);
  let width = els.cacheCanvasEl.width = currentLabel.width = Math.max.apply(null, xP) - left;
  let height = els.cacheCanvasEl.height = currentLabel.height = Math.max.apply(null, yP) - top;
  model.cacheCtx.clearRect(0, 0, width, height);
  let imageData = model.imgCtx.getImageData(left, top, width, height);
  model.cacheCtx.putImageData(imageData, 0, 0);
  currentLabel.imageData = els.cacheCanvasEl.toDataURL();
};

export let els = {};

export let insertEls = (appEl) => {
  els.appEl = appEl;
  {
    els.statusEl = document.createElement("div");
    els.statusEl.setAttribute("id", "status");
    els.appEl.appendChild(els.statusEl);
    els.statusEl.innerText = "从文件夹选 1 张图片拖拽到下方区域👇👇👇支持JPG/JPEG/PNG/GIF格式";
  }

  {
    els.canvasMainEl = document.createElement("div");
    els.canvasMainEl.setAttribute("id", "canvasMain");
    els.appEl.appendChild(els.canvasMainEl);

    els.canvasWrapEl = document.createElement("div");
    els.canvasWrapEl.setAttribute("id", "canvasWrap");
    els.canvasMainEl.appendChild(els.canvasWrapEl);

    els.imgCanvasEl = document.createElement("canvas");
    els.imgCanvasEl.setAttribute("id", "imgCanvas");
    els.imgCanvasEl.style.zIndex = 1;
    model.imgCtx = els.imgCanvasEl.getContext("2d");
    els.canvasWrapEl.appendChild(els.imgCanvasEl);

    els.labelCanvasEl = document.createElement("canvas");
    els.labelCanvasEl.setAttribute("id", "labelCanvas");
    els.labelCanvasEl.style.zIndex = 2;
    model.labelCtx = els.labelCanvasEl.getContext("2d");
    els.canvasWrapEl.appendChild(els.labelCanvasEl);
  }

  {
    els.labelPanelEl = document.createElement("div");
    els.labelPanelEl.setAttribute("id", "labelPanel");
    els.appEl.appendChild(els.labelPanelEl);

    els.labelImagesWrapEl = document.createElement("div");
    els.labelImagesWrapEl.setAttribute("id", "labelImagesWrap");
    els.labelPanelEl.appendChild(els.labelImagesWrapEl);
  }

  {
    els.cacheCanvasEl = document.createElement("canvas");
    model.cacheCtx = els.cacheCanvasEl.getContext("2d");
  }

  // 步骤提示
  {
    els.tipsEl = document.createElement('div');
    els.tipsEl.setAttribute('id', 'tips');
    els.tipsEl.innerHTML = `
      <div data-state="show" class="cco-popup">
        <div onclick="this.parentNode.dataset.state=''" class="close-popup-button"></div>
        <div class="cco-popup-window">
          <div style="margin-bottom:20px;" class="text-fff">
            <div style="margin:10px 0;" class="fs-18 lh-1">操作提示</div>
            <div style="margin:5px 0;" class="fs-14 lh-1">1. 开始绘制：鼠标左键能绘制多边形控制点。</div>
            <div style="margin:5px 0;" class="fs-14 lh-1">2. 完成绘制：鼠标右键能结束绘制当前多边形，Q键也可。</div>
            <div style="margin:5px 0;" class="fs-14 lh-1">4. 👈左侧：等待标注的图像及主要标注区域。</div>
            <div style="margin:5px 0;" class="fs-14 lh-1">5. 👉右侧：已标注和裁切的区域，可选中/更名/删除。</div>
          </div>
          <img src="./demo.gif" style="max-width: 100%;" class="d-block">
        </div>
      </div>`
    els.appEl.appendChild(els.tipsEl);
  }
};


export let addPoint = point => {
  var currentLabelPoints = model.currentLabel.points;
  if(currentLabelPoints.length == 2 && currentLabelPoints[0][0] == point.x && currentLabelPoints[0][1] == point.y) {return;}
  currentLabelPoints[currentLabelPoints.length - 1] = [point.x, point.y];
  model.currentLabel.points.push([point.x, point.y]);
  if(currentLabelPoints.length > 3){
    calcCurrentLabeldimension();
    renderLabelCanvas();
    renderCurrentLabelExplore(model.currentLabel);
  }
};

export let stopDraw = () => {
  if(!model.isDrawing) {return;}
  let currentLabel = model.currentLabel;
  let currentLabelPoints = currentLabel.points;
  if(currentLabelPoints.length <= 3){
    model.labelInfo.shapes.splice(model.labelInfo.shapes.indexOf(currentLabel), 1);
    let labelImageEl = els.labelImagesWrapEl.querySelector("#label_" + currentLabel.timestamp);
    if(labelImageEl) {labelImageEl.parentNode.removeChild(labelImageEl);}
    renderLabelCanvas();
  }else{
    currentLabelPoints.splice(currentLabelPoints.length-1, 1);
    renderLabelCanvas();
    // uploadData();
  }
  model.currentLabel = null;
  model.isDrawing = false;
};

export let renderLabelCanvas = () => {
  let ctx = model.labelCtx;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.save();
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.fillStyle = "hsla(60, 100%, 50%, .1)";
  ctx.strokeStyle = "hsla(60, 100%, 50%, 1)";
  let shapes = model.labelInfo.shapes;
  for(var i=0; i<shapes.length; i++){
    let label = shapes[i];
    ctx.save();
    if(model.activeShape && model.activeShape === label){
      ctx.lineWidth = 2;
      ctx.strokeStyle = "hsla(0, 100%, 60%, 1)";
      ctx.fillStyle = "hsla(0, 100%, 50%, .2)";
    }
    let points = label.points;
    ctx.beginPath();
    for(var k=0; k<points.length; k++){
      var point = points[k];
      if(k == 0){
        ctx.moveTo(point[0], point[1]);
      }else{
        ctx.lineTo(point[0], point[1]);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
};

export let unSeelctLabel = () => {
  model.activeShape = null;
  let activeLabelImageEl = els.labelImagesWrapEl.querySelector(".labelImage.active");
  if(activeLabelImageEl) {activeLabelImageEl.classList.remove("active");}
};

export let startDraw = point => {
  unSeelctLabel();
  model.isDrawing = true;
  model.currentLabel = {
    left: point.x,
    top: point.y,
    width: 0,
    height: 0,
    timestamp: new Date().valueOf(),
    points: [
      [point.x, point.y],
      [point.x, point.y]
    ],
    imageData: null,
  };
  model.labelInfo.shapes.push(model.currentLabel);
  renderLabelCanvas();
};

export let unDoDraw = () => {
  if(!model.isDrawing) {return;}

  var labelPoints = model.currentLabel.points;

  if(labelPoints.length <= 2) {return;}

  labelPoints.splice(labelPoints.length-2, 1);

  renderLabelCanvas();
};
