import "./index.scss";
import * as view from "./view";
import * as utils from "./utils";
import * as eventHandler from "./eventhandler";

let label = (appEl, opts) => {
  return Object.assign(() => {
    view.insertEls(appEl);
    eventHandler.registEventHandler(opts && opts.hooks || {});
  }, utils);
};
label(document.getElementById('app'))();