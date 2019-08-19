import "./index.scss";
import * as view from "./view";
import model from "./model";
import * as utils from "../utils";
import eventHandler from "./eventhandler";

let label = appEl => {

  let els = view.els;

  els.sourceImgEl = document.createElement("img");

  els.maskImgEl = document.createElement("img");
  els.maskImgEl.setAttribute("id", "maskImg")
  appEl.appendChild(els.maskImgEl)

  {
    els.canvasMain = document.createElement("div");
    els.canvasMain.setAttribute("id", "canvasMain");
    appEl.appendChild(els.canvasMain);

    els.canvasWrapEl = document.createElement("div");
    els.canvasWrapEl.setAttribute("id", "canvasWrap");
    els.canvasMain.appendChild(els.canvasWrapEl);

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
    els.labelPanelEl = document.createElement("div")
    els.labelPanelEl.setAttribute("id", "labelPanel");
    appEl.appendChild(els.labelPanelEl);

    els.labelImagesWrapEl = document.createElement("div");
    els.labelImagesWrapEl.setAttribute("id", "labelImagesWrap")
    els.labelPanelEl.appendChild(els.labelImagesWrapEl);
  }

  {
    els.cacheCanvasEl = document.createElement("canvas");
    model.cacheCtx = els.cacheCanvasEl.getContext("2d");
  }

  eventHandler.registEventHandler();
}

label.model = model;
label.utils = utils;
label.view = view;

export { label };
