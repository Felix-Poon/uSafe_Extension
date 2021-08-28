import React from "react";
import ReactDOM from "react-dom";

import type { GuideEntry } from "./types";
import SafetyGuideFlag from "./flag";

export function createPopup(entry: GuideEntry) {
  const root = document.createElement("div");
  document.body.appendChild(root);

  ReactDOM.render(
    <SafetyGuideFlag href={entry.guideUrl} name={entry.title} />,
    root
  );
}
