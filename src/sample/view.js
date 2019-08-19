import model from "./model"

const view = {
  appEl: document.querySelector("#app"),
  sourceImgEl: document.createElement("img"),
  maskImgEl: document.querySelector("#maskImg"),

  imgCanvasEl: (function(){
    var canvas = document.querySelector("#imgCanvas")
    model.imgCtx = canvas.getContext("2d")
    return canvas
  }()),
  labelCanvasEl: (function(){
    var canvas = document.querySelector("#labelCanvas")
    model.labelCtx = canvas.getContext("2d")
    return canvas
  }()),
  cacheCanvasEl: (function(){
    var canvas = document.createElement("canvas")
    model.cacheCtx = canvas.getContext("2d")
    return canvas
  }()),
  magnifierCanvasEl: (function(){
    var canvas = document.querySelector("#magnifierCanvas")
    model.magnifierCtx = canvas.getContext("2d")
    return canvas
  }()),

  canvasWrapEl: document.querySelector("#canvasWrap"),
  labelImagesWrapEl: document.querySelector("#labelImagesWrap"),
  fileWrapEl: document.querySelector("#fileWrap"),
}

export default view