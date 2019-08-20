import "./index.scss";
import * as view from "./view";
import model from "./model";
import * as utils from "../utils";
import * as eventHandler from "./eventhandler";

let label = (appEl, lifeCycle) => {
  view.insertEls(appEl);
  eventHandler.registEventHandler();
};

export { label };
