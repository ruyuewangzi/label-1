(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["goma"] = factory();
	else
		root["goma"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sample/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/sample/eventhandler.js":
/*!************************************!*\
  !*** ./src/sample/eventhandler.js ***!
  \************************************/
/*! exports provided: registEventHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"registEventHandler\", function() { return registEventHandler; });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ \"./src/sample/model.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ \"./src/sample/view.js\");\n\n\n\nlet hooks = {};\n\nlet registEventHandler = (handler) => {\n  hooks = handler;\n\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].appEl.addEventListener(\"dragover\", appEl_onDragOver);\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].appEl.addEventListener(\"dragleave\", appEl_onDragLeave);\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].appEl.addEventListener(\"drop\", appEl_onDrop);\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].canvasWrapEl.addEventListener(\"mousedown\", canvasWrapEl__onMouseDown);\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].canvasWrapEl.addEventListener(\"mousemove\", canvasWrapEl__onMouseMove);\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].canvasWrapEl.addEventListener(\"mouseup\", canvasWrapEl__onMouseUp);\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].canvasWrapEl.addEventListener(\"contextmenu\", canvasWrapEl__onContextMenu);\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].labelImagesWrapEl.addEventListener(\"click\", labelImagesWrapEl__onClick);\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].statusEl.addEventListener(\"click\", statusEl__onClick);\n  window.addEventListener(\"keydown\", window__onKeyDown);\n};\n\nlet statusEl__onClick = function(e){\n  let target = e.target;\n  while(this != target){\n    let feat = target.dataset && target.dataset.feat\n    if(feat){\n      switch(feat){\n        case \"getLabel\":\n          if(typeof hooks.getLabel === \"function\"){\n            hooks.getLabel(_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].activeShape);\n          }\n        default:\n        break;\n      }\n    }\n    target = target.parentNode;\n  }\n}\n\nlet appEl_onDrop = e => {\n  e.preventDefault();\n  let file = e.dataTransfer.files[0]\n  if(!file || file.type.indexOf(\"image\") === -1) return;\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].appEl.classList.add(\"GOMA_LABEL\");\n  let reader = new FileReader();\n  reader.onloadend = e => {\n    _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.imageData = reader.result;\n    _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].statusEl.style = \"\";\n    _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].statusEl.innerText = \"\";\n    _view__WEBPACK_IMPORTED_MODULE_1__[\"initView\"]();\n  }\n  reader.readAsDataURL(file);\n}\n\nlet appEl_onDragLeave = e => {\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].statusEl.innerText = \"拖拽一张图片到这里\";\n}\n\nlet appEl_onDragOver = e => {\n  e.preventDefault();\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].statusEl.innerText = \"可以松手了\";\n}\n\nlet canvasWrapEl__onMouseDown = e => {\n  e.preventDefault();\n  let point = { x: e.offsetX, y: e.offsetY };\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isMouseDown = true;\n  if(e.button == 0){\n    if(!_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isDrawing){\n      _view__WEBPACK_IMPORTED_MODULE_1__[\"startDraw\"](point);\n    }else{\n      _view__WEBPACK_IMPORTED_MODULE_1__[\"addPoint\"](point);\n    }\n  }\n};\n\nlet canvasWrapEl__onMouseMove = e => {\n  e.preventDefault();\n  let point = { x: e.offsetX, y: e.offsetY };\n  if(_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isDrawing){\n    var labelPoints = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel.points;\n    labelPoints[labelPoints.length-1] = [point.x, point.y];\n    _view__WEBPACK_IMPORTED_MODULE_1__[\"renderLabelCanvas\"]();\n  }\n};\n  \nlet canvasWrapEl__onMouseUp = e => {\n  e.preventDefault();\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isMouseDown = true\n};\n \nlet canvasWrapEl__onContextMenu = e => {\n  e.preventDefault();\n  if(e.button == 2) _view__WEBPACK_IMPORTED_MODULE_1__[\"stopDraw\"]();\n};\n\n// labelImagesWrapEl\nlet labelImagesWrapEl__onClick = e => {\n  let target = e.target;\n  let feats = {\n    deleteLabel: function(e, target){\n      let labelImageEl = target.parentNode;\n      let labelTimestamp = labelImageEl.dataset.labelTimestamp;\n      _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes.forEach(function(label, index){\n        if(label.timestamp == labelTimestamp){\n          _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes.splice(index, 1);\n          labelImageEl.parentNode.removeChild(labelImageEl);\n          _view__WEBPACK_IMPORTED_MODULE_1__[\"renderLabelCanvas\"]();\n        }\n      })\n      _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].statusEl.innerText = \"\";\n      return \"stop\";\n    },\n    selectLabel: function(e, target){\n      _view__WEBPACK_IMPORTED_MODULE_1__[\"unSeelctLabel\"]();\n      let labelTimestamp = target.dataset.labelTimestamp;\n      target.classList.add(\"active\");\n      _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes.forEach(function(label, index){\n        if(label.timestamp == labelTimestamp){\n          _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].activeShape = label;\n          _view__WEBPACK_IMPORTED_MODULE_1__[\"renderLabelCanvas\"]();\n        }\n      })\n      let active = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].activeShape\n      _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].statusEl.innerHTML = `<span>[${active.name||\"未命名标记\"}]  宽=${active.width}像素  高=${active.height}像素  距左=${active.left}像素  距顶=${active.top}像素  </span><a href=\"${active.imageData}\" class=\"download\" download=\"${active.name||\"未命名标记\"}.png\">下载图片</a> <a data-feat=\"getLabel\" href=\"javascript:;\">获取标注数据</a>`;\n    },\n    showInput: function(e, target){\n      _view__WEBPACK_IMPORTED_MODULE_1__[\"els\"].statusEl.innerText = \"\";\n      let input = window.prompt(\"输入标注内容：\", target.innerText);\n      if(!input) return;\n      input = input.replace(/^\\s+|\\s$/g,\"\");\n      input = input.replace(/</g, \"&lt;\");\n      let labelImageEl = target.parentNode;\n      let labelTimestamp = labelImageEl.dataset.labelTimestamp;\n      _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes.forEach(function(label, index){\n        if(label.timestamp == labelTimestamp){\n          label.name = input;\n          target.innerText = input;\n        }\n      })\n      return \"stop\";\n    }\n  }\n  while(target !== undefined){\n    if(!target) return;\n    let feat = target.dataset && target.dataset.feat;\n    let go = feat && feats.hasOwnProperty(feat) && feats[feat](e, target);\n    if(go === \"stop\") return;\n    target = target.parentNode;\n  }\n};\n\nlet window__onKeyDown = e => {\n  var currKey = e.keyCode || e.which || e.charCode\n  // key -> q\n  if(currKey == 81){\n    e.preventDefault();\n    _view__WEBPACK_IMPORTED_MODULE_1__[\"stopDraw\"]();\n  }\n  // key -> ctrl + z\n  if(e.ctrlKey || e.metaKey && currKey == 90){\n    e.preventDefault();\n    _view__WEBPACK_IMPORTED_MODULE_1__[\"unDoDraw\"]();\n  }\n};\n\n//# sourceURL=webpack://goma/./src/sample/eventhandler.js?");

/***/ }),

/***/ "./src/sample/index.js":
/*!*****************************!*\
  !*** ./src/sample/index.js ***!
  \*****************************/
/*! exports provided: label */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"label\", function() { return label; });\n/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ \"./src/sample/index.scss\");\n/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ \"./src/sample/view.js\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model */ \"./src/sample/model.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n/* harmony import */ var _eventhandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eventhandler */ \"./src/sample/eventhandler.js\");\n\n\n\n\n\n\nlet label = (appEl, hooks) => {\n  _view__WEBPACK_IMPORTED_MODULE_1__[\"insertEls\"](appEl);\n  _eventhandler__WEBPACK_IMPORTED_MODULE_4__[\"registEventHandler\"](hooks || {});\n  return Object.assign({}, _utils__WEBPACK_IMPORTED_MODULE_3__);\n};\n\n\n\n\n//# sourceURL=webpack://goma/./src/sample/index.js?");

/***/ }),

/***/ "./src/sample/index.scss":
/*!*******************************!*\
  !*** ./src/sample/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://goma/./src/sample/index.scss?");

/***/ }),

/***/ "./src/sample/model.js":
/*!*****************************!*\
  !*** ./src/sample/model.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  activeShape: null,\n\n  labelInfo: {\n    imagePath: null,\n    baseName: null,\n    imageData: null,\n    shapes: [],\n    imageWidth: null,\n    imageHeight: null,\n  },\n  currentLabel: null,\n  isDrawing: false,\n  isMouseDown: false,\n});\n\n//# sourceURL=webpack://goma/./src/sample/model.js?");

/***/ }),

/***/ "./src/sample/view.js":
/*!****************************!*\
  !*** ./src/sample/view.js ***!
  \****************************/
/*! exports provided: initView, els, insertEls, addPoint, stopDraw, renderLabelCanvas, unSeelctLabel, startDraw, unDoDraw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initView\", function() { return initView; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"els\", function() { return els; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"insertEls\", function() { return insertEls; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addPoint\", function() { return addPoint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stopDraw\", function() { return stopDraw; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderLabelCanvas\", function() { return renderLabelCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unSeelctLabel\", function() { return unSeelctLabel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startDraw\", function() { return startDraw; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unDoDraw\", function() { return unDoDraw; });\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ \"./src/sample/model.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n/* harmony import */ var _eventhandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventhandler */ \"./src/sample/eventhandler.js\");\n\n\n\n\nlet loadImg = (src, cb) => {\n  let img = new Image();\n  img.src = src;\n  img.onload = () => {\n    cb && cb(img);\n  }\n};\n\nlet initData = cb => {\n  els.labelImagesWrapEl.innerHTML = \"\";\n  loadSourceImg(sourceImg => {\n    _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes = [];\n    cb && cb(sourceImg);\n  })\n};\n\nlet initView = () => {\n  initData(sourceImg => {\n    resetAllCanvasSize();\n    clearAllCanvas();\n    renderLabelCanvas();\n    renderImgCanvas(sourceImg);\n    renderAllLabelExplore();\n    els.canvasWrapEl.classList.add(\"show\");\n  })\n}\n\nlet clearAllCanvas = () => {\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].imgCtx.clearRect(0, 0, els.imgCanvasEl.width, els.imgCanvasEl.height)\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelCtx.clearRect(0, 0, els.labelCanvasEl.height, els.labelCanvasEl.height)\n};\n\nlet resetAllCanvasSize = canvasEl => {\n  let width = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.imageWidth;\n  let height = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.imageHeight;\n\n  let imgCanvasEl = els.imgCanvasEl;\n  let labelCanvasEl = els.labelCanvasEl;\n  let canvasWrapEl = els.canvasWrapEl;\n\n  imgCanvasEl.width = labelCanvasEl.width = width;\n  imgCanvasEl.height = labelCanvasEl.height = height;\n\n  imgCanvasEl.style.width = canvasWrapEl.style.width = labelCanvasEl.style.width = width + \"px\";\n  imgCanvasEl.style.height = canvasWrapEl.style.height = labelCanvasEl.style.height = height + \"px\";\n};\n\nlet renderCurrentLabelExplore = label => {\n  if(!label) return\n\n  var targetImgWrapEl = els.labelImagesWrapEl.querySelector(\"#label_\"+label.timestamp)\n  if(!targetImgWrapEl){\n    targetImgWrapEl = document.createElement(\"div\")\n    targetImgWrapEl.setAttribute(\"data-feat\",\"selectLabel\")\n    targetImgWrapEl.setAttribute(\"data-label-timestamp\",label.timestamp)\n    targetImgWrapEl.classList.add(\"labelImage\")\n    targetImgWrapEl.setAttribute(\"id\", \"label_\" + label.timestamp)\n    targetImgWrapEl.innerHTML = '<div class=\"label-img-wrap\"></div><div data-feat=\"showInput\" class=\"label-name\"><span>'+(label.name || '未命名标记')+'</span></div><div data-feat=\"deleteLabel\" class=\"delete-label\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 20 20\"><path fill=\"#000000\" d=\"M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z\"></path><path fill=\"#000000\" d=\"M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z\"></path><path fill=\"#000000\" d=\"M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z\"></path><path fill=\"#000000\" d=\"M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z\"></path></svg></div>'\n    els.labelImagesWrapEl.appendChild(targetImgWrapEl)\n  }\n\n  if(!label.imageData) return\n\n  loadImg(label.imageData, function(imageEl){\n    var canvas = els.cacheCanvasEl,\n        ctx = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cacheCtx,\n        points = label.points\n\n    ctx.save()\n    canvas.width = label.width\n    canvas.height = label.height\n    ctx.clearRect(0, 0, canvas.width, canvas.height)\n\n    ctx.beginPath()\n    for(var i=0; i<points.length; i++){\n      var point = points[i],\n          x = point[0]-label.left,\n          y = point[1]-label.top\n\n      if(i == 0){\n        ctx.moveTo(x, y)\n        continue\n      }\n      ctx.lineTo(x, y)\n    }\n    ctx.closePath()\n    ctx.clip()\n    ctx.drawImage(imageEl, 0, 0)\n    ctx.restore()\n\n    var dataURL = canvas.toDataURL(),\n        imageEl = targetImgWrapEl.querySelector(\".label-img-wrap\").querySelector(\"img\")\n\n    if(!imageEl){\n      imageEl = targetImgWrapEl.querySelector(\".label-img-wrap\").innerHTML = '<img src=\"'+ dataURL +'\"/>'\n    }else{\n      targetImgWrapEl.querySelector(\"img\").src = dataURL\n    }\n\n    label.imageData = dataURL\n  })\n};\n\nlet renderAllLabelExplore = () => {\n  var html = \"\"\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes.forEach(function(label, index){\n    html += '<div data-feat=\"selectLabel\" data-label-timestamp=\"'+label.timestamp+'\" class=\"labelImage\" id=\"label_'+label.timestamp+'\"><div class=\"label-img-wrap\"><img src=\"'+label.imageData+'\"/></div><div class=\"label-name\" data-feat=\"showInput\"><span>'+(label.name || '未命名标记')+'</span></div><div data-feat=\"deleteLabel\" class=\"delete-label\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 20 20\"><path fill=\"#000000\" d=\"M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z\"></path><path fill=\"#000000\" d=\"M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z\"></path><path fill=\"#000000\" d=\"M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z\"></path><path fill=\"#000000\" d=\"M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z\"></path></svg></div></div>'\n  })\n  els.labelImagesWrapEl.innerHTML = html\n};\n\nlet renderImgCanvas = sourceImg => {\n  var ctx = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].imgCtx;\n  ctx.save();\n  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n  ctx.drawImage(sourceImg, 0, 0);\n  ctx.restore();\n};\n\nlet loadSourceImg = cb => {\n  loadImg(_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.imageData, img => {\n    setTimeout(()=>{\n      _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.imageWidth = img.width;\n      _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.imageHeight = img.height;\n      cb && cb(img);\n    }, 300)\n  })\n};\n\nlet calcCurrentLabeldimension = () => {\n  if(!_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel) return;\n  let currentLabel = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel;\n  let currentLabelPoints = currentLabel.points;\n  if(currentLabelPoints.length <= 3) return;\n  let xP = [], yP = [];\n  currentLabelPoints.map(function(point, index){\n    xP.push(point[0])\n    yP.push(point[1])\n  });\n  let left = currentLabel.left = Math.min.apply(null, xP);\n  let top = currentLabel.top = Math.min.apply(null, yP);\n  let width = els.cacheCanvasEl.width = currentLabel.width = Math.max.apply(null, xP) - left;\n  let height = els.cacheCanvasEl.height = currentLabel.height = Math.max.apply(null, yP) - top;\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cacheCtx.clearRect(0, 0, width, height);\n  let imageData = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].imgCtx.getImageData(left, top, width, height);\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cacheCtx.putImageData(imageData, 0, 0);\n  currentLabel.imageData = els.cacheCanvasEl.toDataURL();\n};\n\nlet els = {};\n\nlet insertEls = (appEl) => {\n  els.appEl = appEl;\n  els.appEl.style = `position:fixed;top:0;left:0;width:100%;height:100%;`;\n\n  {\n    els.statusEl = document.createElement(\"div\");\n    els.statusEl.setAttribute(\"id\", \"status\");\n    els.appEl.appendChild(els.statusEl);\n    els.statusEl.style = `position:fixed;top:5%;text-align:center;left:0;width:100%;`;\n    els.statusEl.innerText = \"拖拽一张图片到这里\";\n  }\n\n  {\n    els.canvasMainEl = document.createElement(\"div\");\n    els.canvasMainEl.setAttribute(\"id\", \"canvasMain\");\n    els.appEl.appendChild(els.canvasMainEl);\n\n    els.canvasWrapEl = document.createElement(\"div\");\n    els.canvasWrapEl.setAttribute(\"id\", \"canvasWrap\");\n    els.canvasMainEl.appendChild(els.canvasWrapEl);\n\n    els.imgCanvasEl = document.createElement(\"canvas\");\n    els.imgCanvasEl.setAttribute(\"id\", \"imgCanvas\");\n    els.imgCanvasEl.style.zIndex = 1;\n    _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].imgCtx = els.imgCanvasEl.getContext(\"2d\");\n    els.canvasWrapEl.appendChild(els.imgCanvasEl);\n\n    els.labelCanvasEl = document.createElement(\"canvas\");\n    els.labelCanvasEl.setAttribute(\"id\", \"labelCanvas\");\n    els.labelCanvasEl.style.zIndex = 2;\n    _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelCtx = els.labelCanvasEl.getContext(\"2d\");\n    els.canvasWrapEl.appendChild(els.labelCanvasEl);\n  }\n\n  {\n    els.labelPanelEl = document.createElement(\"div\")\n    els.labelPanelEl.setAttribute(\"id\", \"labelPanel\");\n    els.appEl.appendChild(els.labelPanelEl);\n\n    els.labelImagesWrapEl = document.createElement(\"div\");\n    els.labelImagesWrapEl.setAttribute(\"id\", \"labelImagesWrap\")\n    els.labelPanelEl.appendChild(els.labelImagesWrapEl);\n  }\n\n  {\n    els.cacheCanvasEl = document.createElement(\"canvas\");\n    _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cacheCtx = els.cacheCanvasEl.getContext(\"2d\");\n  }\n};\n\n\nlet addPoint = point => {\n  var currentLabelPoints = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel.points\n  if(currentLabelPoints.length == 2 && currentLabelPoints[0][0] == point.x && currentLabelPoints[0][1] == point.y) return;\n  currentLabelPoints[currentLabelPoints.length - 1] = [point.x, point.y];\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel.points.push([point.x, point.y]);\n  if(currentLabelPoints.length > 3){\n    calcCurrentLabeldimension();\n    renderLabelCanvas();\n    renderCurrentLabelExplore(_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel);\n  }\n};\n\nlet stopDraw = () => {\n  if(!_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isDrawing) return;\n  let currentLabel = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel;\n  let currentLabelPoints = currentLabel.points;\n  if(currentLabelPoints.length <= 3){\n    _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes.splice(_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes.indexOf(currentLabel), 1);\n    let labelImageEl = els.labelImagesWrapEl.querySelector(\"#label_\" + currentLabel.timestamp);\n    if(labelImageEl) labelImageEl.parentNode.removeChild(labelImageEl);\n    renderLabelCanvas();\n  }else{\n    currentLabelPoints.splice(currentLabelPoints.length-1, 1);\n    renderLabelCanvas();\n    // uploadData();\n  }\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel = null;\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isDrawing = false;\n};\n\nlet renderLabelCanvas = () => {\n  let ctx = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelCtx;\n  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n  ctx.save();\n  ctx.lineWidth = 1;\n  ctx.lineJoin = \"round\";\n  ctx.fillStyle = \"hsla(60, 100%, 50%, .1)\";\n  ctx.strokeStyle = \"hsla(60, 100%, 50%, 1)\";\n  let shapes = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes;\n  for(var i=0; i<shapes.length; i++){\n    let label = shapes[i];\n    ctx.save();\n    if(_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].activeShape && _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].activeShape === label){\n      ctx.lineWidth = 2;\n      ctx.strokeStyle = \"hsla(0, 100%, 60%, 1)\";\n      ctx.fillStyle = \"hsla(0, 100%, 50%, .2)\";\n    }\n    let points = label.points;\n    ctx.beginPath();\n    for(var k=0; k<points.length; k++){\n      var point = points[k];\n      if(k == 0){\n        ctx.moveTo(point[0], point[1]);\n      }else{\n        ctx.lineTo(point[0], point[1]);\n      }\n    }\n    ctx.closePath();\n    ctx.fill();\n    ctx.stroke();\n    ctx.restore();\n  }\n  ctx.restore();\n};\n\nlet unSeelctLabel = () => {\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].activeShape = null;\n  let activeLabelImageEl = els.labelImagesWrapEl.querySelector(\".labelImage.active\");\n  if(activeLabelImageEl) activeLabelImageEl.classList.remove(\"active\");\n};\n\nlet startDraw = point => {\n  unSeelctLabel();\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isDrawing = true;\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel = {\n    left: point.x,\n    top: point.y,\n    width: 0,\n    height: 0,\n    timestamp: new Date().valueOf(),\n    points: [\n      [point.x, point.y],\n      [point.x, point.y]\n    ],\n    imageData: null,\n  }\n  _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].labelInfo.shapes.push(_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel);\n  renderLabelCanvas();\n};\n\nlet unDoDraw = () => {\n  if(!_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isDrawing) return\n\n  var labelPoints = _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].currentLabel.points\n\n  if(labelPoints.length <= 2) return\n\n  labelPoints.splice(labelPoints.length-2, 1)\n\n  renderLabelCanvas()\n};\n\n\n//# sourceURL=webpack://goma/./src/sample/view.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: ajax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ajax\", function() { return ajax; });\nlet ajax = (url, data, cb) => {\n  let client = new XMLHttpRequest();\n  client.responseType = \"json\";\n  client.onreadystatechange = () => {\n    if(client.status == 200 && client.readyState == 4) cb && cb(client);\n  }\n  data ? client.open(\"POST\", url, true) : client.open(\"GET\", url, true);\n  client.send(data);\n};\n\n//# sourceURL=webpack://goma/./src/utils.js?");

/***/ })

/******/ });
});