import React from "react";
import ReactDOM from "react-dom";
import { SeparalopeApp } from "./SeparalopeApp";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-M7628ZS",
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(<SeparalopeApp />, document.getElementById("root"));
