import model from "./model";
import * as view from "./view";

let HOOKS = {};

export let registEventHandler = (customHooks) => {
  HOOKS = customHooks;

  view.els.appEl.addEventListener("dragover", appEl_onDragOver);
  view.els.appEl.addEventListener("dragleave", appEl_onDragLeave);
  view.els.appEl.addEventListener("drop", appEl_onDrop);
  view.els.canvasWrapEl.addEventListener("mousedown", canvasWrapEl__onMouseDown);
  view.els.canvasWrapEl.addEventListener("mousemove", canvasWrapEl__onMouseMove);
  view.els.canvasWrapEl.addEventListener("mouseup", canvasWrapEl__onMouseUp);
  view.els.canvasWrapEl.addEventListener("contextmenu", canvasWrapEl__onContextMenu);
  view.els.labelImagesWrapEl.addEventListener("click", labelImagesWrapEl__onClick);
  view.els.statusEl.addEventListener("click", statusEl__onClick);
  window.addEventListener("keydown", window__onKeyDown);
};

let statusEl__onClick = function (e) {
  let target = e.target;
  while (this != target) {
    let feat = target.dataset && target.dataset.feat;
    if (feat) {
      switch (feat) {
        case "getLabel":
          console.log(model.activeShape);
          if (typeof HOOKS.getLabel === "function") {
            HOOKS.getLabel(model.activeShape);
          }
        default:
          break;
      }
    }
    target = target.parentNode;
  }
};

let appEl_onDrop = e => {
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  if (!file || file.type.indexOf("image") === -1) { return; }
  let reader = new FileReader();
  reader.onloadend = e => {
    model.labelInfo.imageData = reader.result;
    view.els.statusEl.style = '';
    view.els.statusEl.innerText = '开始在线标注/裁切多边形图像吧！';
    view.initView();
  };
  reader.readAsDataURL(file);
};

let appEl_onDragLeave = e => {
  view.els.statusEl.innerText = "从文件夹选 1 张图片拖拽到下方区域👇👇👇支持JPG/JPEG/PNG/GIF格式";
};

let appEl_onDragOver = e => {
  e.preventDefault();
  view.els.statusEl.innerText = "可以松手啦👍👍👍";
};

let canvasWrapEl__onMouseDown = e => {
  e.preventDefault();
  let point = {
    x: e.offsetX,
    y: e.offsetY
  };
  model.isMouseDown = true;
  if (e.button == 0) {
    if (!model.isDrawing) {
      view.startDraw(point);
    } else {
      view.addPoint(point);
    }
  }
};

let canvasWrapEl__onMouseMove = e => {
  e.preventDefault();
  let point = {
    x: e.offsetX,
    y: e.offsetY
  };
  if (model.isDrawing) {
    var labelPoints = model.currentLabel.points;
    labelPoints[labelPoints.length - 1] = [point.x, point.y];
    view.renderLabelCanvas();
  }
};

let canvasWrapEl__onMouseUp = e => {
  e.preventDefault();
  model.isMouseDown = true;
};

let canvasWrapEl__onContextMenu = e => {
  e.preventDefault();
  if (e.button == 2) { view.stopDraw(); }
};

// labelImagesWrapEl
let labelImagesWrapEl__onClick = e => {
  let target = e.target;
  let feats = {
    deleteLabel: function (e, target) {
      let labelImageEl = target.parentNode;
      let labelTimestamp = labelImageEl.dataset.labelTimestamp;
      model.labelInfo.shapes.forEach(function (label, index) {
        if (label.timestamp == labelTimestamp) {
          model.labelInfo.shapes.splice(index, 1);
          labelImageEl.parentNode.removeChild(labelImageEl);
          view.renderLabelCanvas();
        }
      });
      view.els.statusEl.innerText = "";
      return "stop";
    },
    selectLabel: function (e, target) {
      view.unSeelctLabel();
      let labelTimestamp = target.dataset.labelTimestamp;
      target.classList.add("active");
      model.labelInfo.shapes.forEach(function (label, index) {
        if (label.timestamp == labelTimestamp) {
          model.activeShape = label;
          view.renderLabelCanvas();
        }
      });
      let active = model.activeShape;
      view.els.statusEl.innerHTML = `<span>[${active.name || "未命名标记"}]  宽度：${active.width}px  高度：${active.height}px  距左：${active.left}px  距顶：${active.top}px  </span><a href="${active.imageData}" class="download" download="${active.name || "未命名标记"}.png">下载图片</a> <a data-feat="getLabel" href="javascript:;">获取标注数据</a>`;
    },
    showInput: function (e, target) {
      view.els.statusEl.innerText = "";
      let input = window.prompt("输入标注内容：", target.innerText);
      if (!input) { return; }
      input = input.replace(/^\s+|\s$/g, "");
      input = input.replace(/</g, "&lt;");
      let labelImageEl = target.parentNode;
      let labelTimestamp = labelImageEl.dataset.labelTimestamp;
      model.labelInfo.shapes.forEach(function (label, index) {
        if (label.timestamp == labelTimestamp) {
          label.name = input;
          target.innerText = input;
        }
      });
      return "stop";
    }
  };
  while (target !== this) {
    if (!target) { return; }
    let feat = target.dataset && target.dataset.feat;
    let go = feat && feats.hasOwnProperty(feat) && feats[feat](e, target);
    if (go === "stop") { return; }
    target = target.parentNode;
  }
};

let window__onKeyDown = e => {
  var currKey = e.keyCode || e.which || e.charCode;
  // key -> q
  if (currKey == 81) {
    e.preventDefault();
    view.stopDraw();
  }
  // key -> ctrl + z
  if (e.ctrlKey || e.metaKey && currKey == 90) {
    e.preventDefault();
    view.unDoDraw();
  }
};