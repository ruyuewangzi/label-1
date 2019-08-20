import "./index.scss";
import * as view from "./view";
import model from "./model";
import * as utils from "../utils";
import * as eventHandler from "./eventhandler";

let label = (appEl, hooks) => {
  view.insertEls(appEl);
  eventHandler.registEventHandler(hooks || {});
  return Object.assign({}, utils);
};

export { label };
