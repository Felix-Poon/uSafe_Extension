
import { createPopup } from './safety-guide/guideNotification';

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change colorr to " + msg.color);
  } 
  else if (msg.guideLink) {
    console.log("Receive link = " + msg.guideLink);
    console.log(msg.guideLink)
    sendResponse("Link received " + msg.guideLink);

    const div = createPopup(msg.guideLink);
    //const first = document.body.firstChild;
    //console.log(first, div)
    //document.body.insertBefore(div, first)

    document.appendChild(div);

    /* console.log(document.body)
    document.body. */
    //document.body.in
  } 
  else {
    sendResponse("No guide.");
  }
});

console.log('hi')