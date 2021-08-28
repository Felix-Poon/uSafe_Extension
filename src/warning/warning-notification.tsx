import React from "react";
import ReactDOM from "react-dom";

import SafetyGuideFlag from "./warning-flag";

export function createWarning(type:string) {
  const root = document.createElement("div");
  document.body.appendChild(root);

  ReactDOM.render(
    <SafetyGuideFlag type={type} />,
    root
  );
}
