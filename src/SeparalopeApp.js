import React from "react";
import { Provider } from "react-redux";
import "animate.css";

import "./sass/styles.scss";
import { store } from "./store/store";
import { SeparalopeRouter } from "./routers/SeparalopeRouter";

export const SeparalopeApp = () => {
  return (
    <div>
      <Provider store={store}>
        <SeparalopeRouter />
      </Provider>
    </div>
  );
};
