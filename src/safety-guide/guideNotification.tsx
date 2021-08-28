import React from "react";
import ReactDOM from "react-dom";
//import MyComponent from "./component";
import FlagPopup from "./flag";

export function createPopup(link: string/* , name: string */) {
  const root = document.createElement('div')

  ReactDOM.render(<FlagPopup />, root);



  return root;
}