import "./index.scss";
import * as view from "./view";
import model from "./model";
import * as utils from "./utils";
import * as eventHandler from "./eventhandler";

let label = (appEl, opts) => {
  return Object.assign(() => {
    view.insertEls(appEl);
    // 注册事件
    eventHandler.registEventHandler(opts && opts.hooks || {});
  }, utils);
};

export {
  label
};