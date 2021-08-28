import React from "react";
import ReactDOM from "react-dom";
//import MyComponent from "./component";
import FlagPopup from "./flag";

export function createPopup(link: string) {
  const root = document.createElement('div')

  //const flag = FlagDefaultExample;
  /* div.id = "guide-popup"
  const a = document.createElement('a');
  a.setAttribute('href', '/'+link);
  a.innerText = "E-Safety Guide Available"
  div.appendChild(a); */

  ReactDOM.render(<FlagPopup />, root);



  return root;
}